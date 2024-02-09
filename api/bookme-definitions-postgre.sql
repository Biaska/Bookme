-- Disable Foreign Key Checks
SET CONSTRAINTS ALL DEFERRED;

-- Drop all existing tables
DROP TABLE IF EXISTS Businesses;
DROP TABLE IF EXISTS Services;
DROP TABLE IF EXISTS Schedules;
DROP TABLE IF EXISTS Services;
DROP TABLE IF EXISTS Sessions;
DROP TABLE IF EXISTS Bookings;

-- Create Businesses Table: Represents information about businesses using the application.
CREATE TABLE Businesses (
    id VARCHAR(30) NOT NULL PRIMARY KEY,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    street_address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    postal_code VARCHAR(10),
    timezone VARCHAR(50) DEFAULT 'UTC',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Services Table: Represents services offered by businesses.
CREATE TABLE Services (
    id SERIAL PRIMARY KEY,
    businessId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    duration INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (businessId) REFERENCES Businesses(id) ON DELETE CASCADE,
    INDEX idx_services_name (name),
    INDEX idx_services_price (price)
);

-- Create Schedules Table: Represents schedules for services.
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
    FOREIGN KEY (serviceId) REFERENCES Services(id) ON DELETE CASCADE,
    INDEX idx_schedules_startDate (startDate)
);

-- Create Sessions Table: Represents individual sessions based on schedules.
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
    FOREIGN KEY (serviceId) REFERENCES Services(id) ON DELETE CASCADE,
    INDEX idx_sessions_date (date)
);

-- Create Bookings Table: Represents customer bookings for sessions.
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
    FOREIGN KEY (sessionId) REFERENCES Sessions(id),
    INDEX idx_bookings_booking_time (booking_time)
);

-- Insert Sample Data into Businesses Table
INSERT INTO Businesses (name, email, phone_number, street_address, city, state, postal_code, country, website, timezone)
VALUES
    ('Cosmic Creations', 'info@cosmiccreations.com', '123-456-7890', '42 Galaxy Lane', 'Stellaria', 'Nebula', 'CC123', 'Cosmos', 'www.cosmiccreations.com', 'UTC'),
    ('Astral Aromas', 'contact@astralaromas.com', '987-654-3210', '8 Celestial Road', 'Starville', 'Orion', 'AA987', 'Universe', 'www.astralaromas.com', 'GMT'),
    ('Nebula Nourish', 'hello@nebulanourish.com', '555-123-4567', '15 Galactic Street', 'Nebula City', 'Andromeda', 'NN555', 'Cosmic Cluster', 'www.nebulanourish.com', 'UTC'),
    -- Add more records for Businesses table...

-- Insert Sample Data into Services Table
INSERT INTO Services (businessId, name, description, price, duration)
VALUES
    (1, 'Celestial Spa Package', 'Indulge in a spa experience beyond the stars', 150.00, 120),
    (1, 'Astro Facial Glow', 'Revitalize your skin with cosmic energy', 75.00, 60),
    (2, 'Galactic Aromatherapy', 'Elevate your senses with celestial scents', 40.00, 45),
    -- Add more records for Services table...

-- Insert Sample Data into Schedules Table
INSERT INTO Schedules (serviceId, monday, tuesday, wednesday, thursday, friday, saturday, sunday, startDate, endDate, start_time, end_time, timezone)
VALUES
    (1, 1, 1, 1, 1, 1, 0, 0, '2024-03-01', '2024-03-31', '10:00:00', '18:00:00', 'UTC'),
    (2, 1, 0, 1, 0, 1, 1, 0, '2024-03-01', '2024-03-31', '09:00:00', '17:00:00', 'GMT'),
    (3, 1, 1, 1, 1, 1, 0, 0, '2024-03-01', '2024-03-31', '11:00:00', '19:00:00', 'UTC'),
    -- Add more records for Schedules table...

-- Insert Sample Data into Sessions Table
INSERT INTO Sessions (scheduleId, serviceId, date, availability_status, booked_count, timezone)
VALUES
    (1, 1, '2024-03-05', true, 2, 'UTC'),
    (2, 2, '2024-03-10', true, 1, 'GMT'),
    (3, 3, '2024-03-15', true, 0, 'UTC'),
    -- Add more records for Sessions table...

-- Insert Sample Data into Bookings Table
INSERT INTO Bookings (sessionId, customer_name, customer_email, booking_status, booking_time, timezone)
VALUES
    (1, 'Stella Starlight', 'stella.starlight@example.com', 'Confirmed', '2024-03-05 11:30:00', 'UTC'),
    (2, 'Orion Nebula', 'orion.nebula@example.com', 'Pending', '2024-03-10 14:15:00', 'GMT'),
    (3, 'Andromeda Galaxy', 'andromeda.galaxy@example.com', 'Confirmed', '2024-03-15 10:45:00', 'UTC'),
    -- Add more records for Bookings table...


-- Enable Foreign Key Checks
SET CONSTRAINTS ALL IMMEDIATE;
