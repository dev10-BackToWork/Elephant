DROP DATABASE IF EXISTS elephantDB;
CREATE DATABASE elephantDB;
USE elephantDB;

CREATE TABLE roles (
	roleId int primary key,
	roleName varchar(10) not null
);

CREATE TABLE location (
	locationId int primary key auto_increment,
    cityName varchar(25) not null,
    timeIncrement int not null,
    maxOccupancy int not null
);

CREATE TABLE timeSlot (
	timeSlotId int primary key auto_increment,
    startTime time not null,
    locationId int,
    CONSTRAINT fk_timeSlot_location
		FOREIGN KEY (locationId)
        REFERENCES location(locationId)
);

CREATE TABLE users (
	userId int primary key auto_increment,
    firstName varchar(25) not null,
    lastName varchar(25) not null,
    email varchar(50) not null,
    passwords varchar(15) not null,
    locationId int,
    roleId int,
    CONSTRAINT fk_users_location
		FOREIGN KEY (locationId)
        REFERENCES location(locationId),
	CONSTRAINT fk_users_roles
		FOREIGN KEY (roleId)
        REFERENCES roles(roleId)
);
        
CREATE TABLE arrival (
	arrivalId int primary key auto_increment,
    arrivalDate date not null,
    timeSlotId int,
    userId int,
    CONSTRAINT fk_arrival_timeSlot
		FOREIGN KEY (timeSlotId)
        REFERENCES timeSlot(timeSlotId),
	CONSTRAINT fk_arrival_user
		FOREIGN KEY (userId)
        REFERENCES users(userId)
);
	
CREATE TABLE departure (
	departureId int primary key auto_increment,
    departureDate date not null,
    timeSlotId int,
    userId int,
    CONSTRAINT fk_departure_timeSlot
		FOREIGN KEY (timeSlotId)
        REFERENCES timeSlot(timeSlotId),
	CONSTRAINT fk_departure_user
		FOREIGN KEY (userId)
        REFERENCES users(userId)
);

CREATE TABLE attendance (
	attendanceId int primary key auto_increment,
    isAttending boolean default false,
    attendanceDate date not null,
    userId int,
    CONSTRAINT fk_attendance_users
		FOREIGN KEY (userId)
        REFERENCES users(userId)
);

INSERT INTO location (cityName, timeIncrement, maxOccupancy)
VALUES ("Minneapolis", 5, 20);

INSERT INTO roles (roleId, roleName)
VALUES (1, "ROLE_ADMIN"),
(2, "ROLE_USER"); 