SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;
-- Drop all existing tables
DROP TABLE IF EXISTS Businesses;
DROP TABLE IF EXISTS Services;
DROP TABLE IF EXISTS Schedules;
DROP TABLE IF EXISTS Services;
DROP TABLE IF EXISTS Sessions;
DROP TABLE IF EXISTS Bookings;
-- Create Bussinesses
CREATE TABLE Businesses (
    businessID int(11) AUTO_INCREMENT NOT NULL,
    title varchar(255) NOT NULL,
    ownerName varchar(255) NOT NULL,
    phone varchar(10) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    address varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    state varchar(255) NOT NULL,
    zip varchar(255) NOT NULL,
    PRIMARY KEY (businessID)
);
-- Create Services
CREATE TABLE Services (
    serviceID int(11) AUTO_INCREMENT NOT NULL,
    title varchar(255) NOT NULL,
    description varchar(60000) NOT NULL,
    type varchar(255) NOT NULL,
    businessID int(11) NOT NULL,
    PRIMARY KEY (serviceID),
    FOREIGN KEY (businessID) 
        REFERENCES Businesses(businessID) 
        ON DELETE RESTRICT 
        ON UPDATE CASCADE
);
-- Create Schedules
CREATE TABLE Schedules (
    scheduleID int(11) NOT NULL,
    sessionID int(11) NOT NULL,
    PRIMARY KEY (scheduleID),
    CONSTRAINT FK_sessionID 
        FOREIGN KEY (sessionID) 
        REFERENCES Sessions(sessionID) 
        ON DELETE CASCADE ?????
        ON UPDATE CASCADE,???????
);