DROP DATABASE IF EXISTS `mileage_mate`;

CREATE DATABASE IF NOT EXISTS mileage_mate
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;
USE mileage_mate;

CREATE TABLE Users(
	userID INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(30) NOT NULL,
    isMechanic BOOLEAN NOT NULL,
    PRIMARY KEY (userID)
);

CREATE TABLE Cars (
    carID INT NOT NULL AUTO_INCREMENT,
    ownerID INT NOT NULL,
    mechanicID INT,
    VINNumber CHAR(17) UNIQUE,
    licensePlate VARCHAR(10),
    year INT,
    make VARCHAR(15),
    model VARCHAR(15),
    trim VARCHAR(15),
    imagePath VARCHAR(255),
    PRIMARY KEY (carID),
    FOREIGN KEY (ownerID) REFERENCES Users(userID),
    FOREIGN KEY (mechanicID) REFERENCES Users(userID)
);

CREATE TABLE Mileage (
	mileageID INT NOT NULL AUTO_INCREMENT,
    carID INT NOT NULL,
    odometerReading INT NOT NULL,
    readingDate DATE NOT NULL,
    PRIMARY KEY (carID),
    FOREIGN KEY (carID) REFERENCES cars(carID)
);

CREATE TABLE ReoccurringServices (
	serviceID INT NOT NULL AUTO_INCREMENT,
    serviceName VARCHAR(25),
    carID INT,
    dueMileage INT,
    dueTimeValue INT,
	dueTimeUnit ENUM('DAY', 'WEEK', 'MONTH', 'YEAR')
);

CREATE TABLE ServiceDone (
	carServiceID INT NOT NULL AUTO_INCREMENT,
    carID INT,
    ServiceID INT,
    MileageID INT,
    ProductsUsed VARCHAR(1000),
    Description VARCHAR(1000)
);