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
    userID INT NOT NULL,
    VINNumber CHAR(17) UNIQUE,
    licensePlate VARCHAR(10),
    PRIMARY KEY (carID),
    FOREIGN KEY (userID) REFERENCES Users(userID)
);