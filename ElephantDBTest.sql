DROP DATABASE IF EXISTS elephantDBTest;
CREATE DATABASE elephantDBTest;
USE elephantDBTest;

CREATE TABLE `role` (
	roleId int primary key,
	roleName varchar(10) not null
);

CREATE TABLE location (
	locationId int primary key auto_increment,
    cityName varchar(25) not null,
    timeIncrement int not null,
    maxOccupancy int not null,
    beginningTime time not null,
    endTime time not null
);

CREATE TABLE timeSlot (
	timeSlotId int primary key auto_increment,
    timeSlotDate date not null,
    startTime time not null,
    isTaken boolean default false,
    locationId int,
    CONSTRAINT fk_timeSlot_location
		FOREIGN KEY (locationId)
        REFERENCES location(locationId)
);

CREATE TABLE `user` (
	userId int primary key auto_increment,
    firstName varchar(25) not null,
    lastName varchar(25) not null,
    email varchar(50) not null,
    defaultPW varchar(50) not null,
    passwords varchar(125) not null,
    locationId int,
    roleId int,
    CONSTRAINT fk_user_location
		FOREIGN KEY (locationId)
        REFERENCES location(locationId),
	CONSTRAINT fk_user_role
		FOREIGN KEY (roleId)
        REFERENCES role(roleId)
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
        REFERENCES user(userId)
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
        REFERENCES user(userId)
);

CREATE TABLE attendance (
	attendanceId int primary key auto_increment,
    isAttending boolean default false,
    attendanceDate date not null,
    userId int,
    isAuthorized boolean default false,
    CONSTRAINT fk_attendance_user
		FOREIGN KEY (userId)
        REFERENCES user(userId)
);

INSERT INTO location (cityName, timeIncrement, maxOccupancy, beginningTime, endTime) VALUES 
	("Minneapolis", 5, 20, "07:00:00", "19:00:00");

INSERT INTO `role` (roleId, roleName)
VALUES (1, "ROLE_ADMIN"),
(2, "ROLE_USER");

INSERT INTO `user` (userId, firstName, lastName, email, defaultPW, passwords, locationId, roleId) VALUES 
	(1, "default", "admin", "admin@admin.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 1, 1),
    (2, "default", "user", "user@user.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 1, 2);
    
DELIMITER $$
CREATE PROCEDURE genMinneapolisTimeSlots()
BEGIN
	DECLARE x INT;
    DECLARE y TIME;
    DECLARE increment INT;
    DECLARE beginningTimeHours INT;
    DECLARE beginningTimeMinutes INT;
    DECLARE endTimeHours INT;
    DECLARE endTimeMinutes INT;
    DECLARE intervalMinutes INT;
    DECLARE loopNumber INT;
    
    SET x = 0;
    SET y = (SELECT beginningTime FROM location WHERE locationId = 1);
    SET increment = (SELECT timeIncrement FROM location WHERE locationId = 1);
    SET beginningTimeHours = (SELECT HOUR(beginningTime) FROM location WHERE locationId = 1);
    SET beginningTimeMinutes = (SELECT MINUTE(beginningTime) FROM location WHERE locationId = 1);
    SET endTimeHours = (SELECT HOUR(endTime) FROM location WHERE locationId = 1);
    SET endTimeMinutes = (SELECT MINUTE(endTime) FROM location WHERE locationId = 1);
    Set intervalMinutes = (endTimeHours * 60 + endTimeMinutes) - (beginningTimeHours * 60 + beginningTimeMinutes);
	SET loopNumber = intervalMinutes / increment;
    
    loop_label: LOOP
		IF x > loopNumber THEN
			LEAVE loop_label;
		END IF;
        
        INSERT INTO timeslot (timeSlotDate, startTime, locationId) VALUES (CURDATE(), y + INTERVAL increment * x MINUTE, 1);
        
        SET x = x + 1;
	END LOOP;
END$$

CALL genMinneapolisTimeSlots();