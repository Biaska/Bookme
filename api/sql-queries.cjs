const queries = {
    foreignChecks: {
        off: "SET CONSTRAINTS ALL DEFERRED;",
        on: "SET CONSTRAINTS ALL IMMEDIATE;"
    },
    drop: `DROP TABLE IF EXISTS Businesses cascade;
        DROP TABLE IF EXISTS Services cascade;
        DROP TABLE IF EXISTS Schedules cascade;
        DROP TABLE IF EXISTS Services cascade;
        DROP TABLE IF EXISTS Sessions cascade;
        DROP TABLE IF EXISTS Bookings cascade;`,
    createDatabase: `
        CREATE TABLE Businesses (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            phone_number VARCHAR(15),
            street_address VARCHAR(255),
            city VARCHAR(255),
            state VARCHAR(255),
            postal_code VARCHAR(10),
            country VARCHAR(255),
            website VARCHAR(255),
            timezone VARCHAR(50) DEFAULT 'UTC',
            latitude DOUBLE PRECISION,
            longitude DOUBLE PRECISION,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE Services (
            id SERIAL PRIMARY KEY,
            businessId INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            type VARCHAR(30) NOT NULL,
            price DECIMAL(10, 2),
            duration INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (businessId) REFERENCES Businesses(id) ON DELETE CASCADE
        );
        CREATE TABLE Schedules (
            id SERIAL PRIMARY KEY,
            serviceId INT NOT NULL,
            monday BOOLEAN,
            tuesday BOOLEAN,
            wednesday BOOLEAN,
            thursday BOOLEAN,
            friday BOOLEAN,
            saturday BOOLEAN,
            sunday BOOLEAN,
            startDate DATE,
            endDate DATE,
            start_time TIME,
            end_time TIME,
            timezone VARCHAR(50) DEFAULT 'UTC',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CHECK (monday IN (false, true) AND tuesday IN (false, true) AND wednesday IN (false, true) AND thursday IN (false, true) AND friday IN (false, true) AND saturday IN (false, true) AND sunday IN (false, true)),
            FOREIGN KEY (serviceId) REFERENCES Services(id) ON DELETE CASCADE
        );
        CREATE TABLE Sessions (
            id SERIAL PRIMARY KEY,
            scheduleId INT NOT NULL,
            serviceId INT NOT NULL,
            date DATE,
            availability_status BOOLEAN,
            booked_count INT DEFAULT 0,
            timezone VARCHAR(50) DEFAULT 'UTC',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (scheduleId) REFERENCES Schedules(id),
            FOREIGN KEY (serviceId) REFERENCES Services(id) ON DELETE CASCADE
        );
        CREATE TABLE Bookings (
            id SERIAL PRIMARY KEY,
            sessionId INT NOT NULL,
            customer_name VARCHAR(255),
            customer_email VARCHAR(255) UNIQUE,
            booking_status VARCHAR(50),
            booking_time TIMESTAMPTZ, -- Using TIMESTAMPTZ for PostgreSQL, which includes timezone information
            timezone VARCHAR(50) DEFAULT 'UTC',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (sessionId) REFERENCES Sessions(id)
        );
        CREATE EXTENSION IF NOT EXISTS cube;
        CREATE EXTENSION IF NOT EXISTS earthdistance;

        -- Index for fast radius queries
        CREATE INDEX IF NOT EXISTS businesses_ll_earth_idx
        ON businesses
        USING gist (ll_to_earth(latitude, longitude));`,
    insertSampleData: `
        INSERT INTO Businesses (name, email, phone_number, street_address, city, state, postal_code, country, website, timezone, latitude, longitude)
        VALUES
            ('Cosmic Creations', 'info@cosmiccreations.com', '123-456-7890', '42 Galaxy Lane', 'Chicago', 'Illinois', '60007', 'United States', 'www.cosmiccreations.com', 'UTC', '42.0114', '-88.0021'),
            ('Astral Aromas', 'contact@astralaromas.com', '987-654-3210', '8 Celestial Road', 'Seattle', 'Washington', '98039', 'United States', 'www.astralaromas.com', 'GMT', '47.6258', '-122.2422'),
            ('Nebula Nourish', 'hello@nebulanourish.com', '555-123-4567', '15 Galactic Street', 'Sand Francisco', 'California', '94102', 'United States', 'www.nebulanourish.com', 'UTC', '37.7787', '-122.4212');
        INSERT INTO Services (businessId, name, description, price, type, duration)
        VALUES
            (1, 'Celestial Spa Package', 'Indulge in a spa experience beyond the stars', 150.00, 'Experience', 120),
            (1, 'Astro Facial Glow', 'Revitalize your skin with cosmic energy', 75.00, 'Experience', 60),
            (2, 'Galactic Aromatherapy', 'Elevate your senses with celestial scents', 40.00, 'Therapy',45);
        INSERT INTO Schedules (serviceId, monday, tuesday, wednesday, thursday, friday, saturday, sunday, startDate, endDate, start_time, end_time, timezone)
        VALUES
            (1, true, true, true, true, true, false, false, '2024-03-01', '2024-03-31', '10:00:00', '18:00:00', 'UTC'),
            (2, true, false, true, false, true, true, false, '2024-03-01', '2024-03-31', '09:00:00', '17:00:00', 'GMT'),
            (3, true, true, true, true, true, false, false, '2024-03-01', '2024-03-31', '11:00:00', '19:00:00', 'UTC');
        INSERT INTO Sessions (scheduleId, serviceId, date, availability_status, booked_count, timezone)
        VALUES
            (1, 1, '2024-03-05', true, 2, 'UTC'),
            (2, 2, '2024-03-10', true, 1, 'GMT'),
            (3, 3, '2024-03-15', true, 0, 'UTC');
        INSERT INTO Bookings (sessionId, customer_name, customer_email, booking_status, booking_time, timezone)
        VALUES
            (1, 'Stella Starlight', 'stella.starlight@example.com', 'Confirmed', '2024-03-05 11:30:00', 'UTC'),
            (2, 'Orion Nebula', 'orion.nebula@example.com', 'Pending', '2024-03-10 14:15:00', 'GMT'),
            (3, 'Andromeda Galaxy', 'andromeda.galaxy@example.com', 'Confirmed', '2024-03-15 10:45:00', 'UTC');`,
    tests: {
        createBusiness: `INSERT INTO Businesses (id, name, email, phone_number, street_address, city, state, postal_code, country, website, timezone)
        VALUES
            (1, 'Cosmic Creations', 'info@cosmiccreations.com', '123-456-7890', '42 Galaxy Lane', 'Stellaria', 'Nebula', 'CC123', 'Cosmos', 'www.cosmiccreations.com', 'UTC');`,
        deleteBusiness: `DELETE FROM Businesses WHERE id = 1;`
    },
    businesses: {
        select: {
            all: "SELECT * from Businesses;",
            one: "SELECT * FROM Businesses WHERE id = $1"
        },
        insert: {
            one: "INSERT INTO Businesses VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
        }
    },
    services: {
        select: {
            all: "SELECT * FROM Services",
            one: "SELECT * FROM Services WHERE id = $1",
            business:"SELECT * FROM Services WHERE businessID = $1"
        },
        insert: {
            one: "INSERT INTO Services(businessID, name, description, type, price, duration) VALUES($1, $2, $3, $4, $5, $6)"
        }
    }
}

module.exports = queries