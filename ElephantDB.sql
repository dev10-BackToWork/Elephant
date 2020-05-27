DROP DATABASE IF EXISTS elephantDB;
CREATE DATABASE elephantDB;
USE elephantDB;

CREATE TABLE `role` (
	roleId int primary key,
	roleName varchar(10) not null
);

CREATE TABLE location (
	locationId int primary key auto_increment,
    cityName varchar(50) not null,
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
	("Minneapolis", 15, 20, "07:00:00", "19:00:00"),
	("Austin", 15, 15, "07:00:00", "19:00:00"),
    ("Dallas", 15, 20, "07:00:00", "19:00:00"),
    ("Des Moines", 15, 20, "07:00:00", "19:00:00"),
    ("Georgia", 15, 20, "07:00:00", "19:00:00"),
    ("Kansas", 15, 20, "07:00:00", "19:00:00"),
    ("Michigan", 15, 20, "07:00:00", "19:00:00"),
    ("Milwaukee", 15, 20, "07:00:00", "19:00:00"),
    ("New York", 15, 20, "07:00:00", "19:00:00"),
    ("North Carolina", 15, 20, "07:00:00", "19:00:00"),
    ("Ohio", 15, 20, "07:00:00", "19:00:00"),
    ("Atlanta Delivery Center", 15, 20, "07:00:00", "19:00:00"),
    ("Charlotte Delivery Center", 15, 20, "07:00:00", "19:00:00"),
    ("Kansas City Delivery Center", 15, 20, "07:00:00", "19:00:00"),
    ("Orlando Delivery Center", 15, 20, "07:00:00", "19:00:00"),
    ("Plano Delivery Center", 15, 20, "07:00:00", "19:00:00"),
    ("Troy Delivery Center", 15, 20, "07:00:00", "19:00:00");
--     ("Toronto", 15, 20, "07:00:00", "19:00:00");

INSERT INTO `role` (roleId, roleName)
VALUES (1, "ROLE_ADMIN"),
(2, "ROLE_USER");

INSERT INTO `user` (firstName, lastName, email, defaultPW, passwords, locationId, roleId) VALUES 
	("default", "user", "user@user.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 1, 1),
    ("Colleen","McIntyre","CMcIntyre@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",2,1),
	("Carol","Valencia","CValencia@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",2,2),
	("Nicole","Forsthoefel","NForsthoefel@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",2,2),
	("Stephen","Biles","SBiles@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",2,2),
	("Frank","DeGise","FDeGise@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Morgan","Chalut","MChalut@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Wayne","Sueltz","WSueltz@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,1),
	("Angie","Hillin","AHillin@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Greg","Ayers","GAyers@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Jaimi","Nielsen","JNielsen@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Kevin","Zoch","KZoch@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Paul","Waine","PWaine@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Victoria","Arndt","VArndt@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Brian","Zegers","BZegers@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Lisa","Dahm","LDahm@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Michael","Brinson","MBrinson@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("John","Triggs","JTriggs@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Guy","Arnone","GArnone@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,1),
	("Angie","Farmer","AFarmer@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Angie","Gonzales","AGonzales@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("April","Young","AYoung@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Jason","Belcher","JBelcher@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Ron","Clampitt","RClampitt@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Sandy","Medley","SMedley@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Sheila","Sayler","SSayler@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Remster","Bingham","RBingham@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,1),
	("Jacqueline","Bertolini","JBertolini@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Nick","Pranis","NPranis@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Joseph","Jens","JJens@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,1),
	("Aaron","Lemkau","ALemkau@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Johnathon","Klink","JKlink@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Julie","Spahr","JSpahr@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Lauren","Pavka","LPavka@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Meghan","Zehm","MZehm@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Sara","Brahm","SBrahm@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Sara","McCarthy","SMcCarthy@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Tim","Koelbl","TKoelbl@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Tristan","Schulz","TSchulz@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Nichoel","Ellis","NEllis@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Tracy","Beckmann ","TBeckmann @genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,1),
	("Beth","Burris","BBurris@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Lori","Jenniges","LJenniges@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Tara","Gilbert Wyborny","twyborny@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,1),
	("Beth","Raymond","BRaymond@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,1),
	("Danielle","Sol","DSol@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Erin","Larson","ELarson@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Kayla","Coller","KColler@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Angie","Brekke","ABrekke@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,1),
	("Angie","Mareski","AMareski@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Asia","Uluocak","AUluocak@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Beth","Fogarty","BFogarty@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Carlie","Louisiana","CLouisiana@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Chris","Roe","CRoe@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Erik","Peterson","EPeterson@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Jacob","Svare","JSvare@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Jeff","Edwards","JEdwards@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Jennifer","Turnquist","JTurnquist@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("John","Evenstad","JEvenstad@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("John","Trygstad","JTrygstad@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Jonah","VanGorden","JVanGorden@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Julie","Kent","JKent@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Katy","Kimble","KKimble@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Kelly","Calendine","KCalendine@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Laura","Miller","LMiller@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Maria","Ryan","MRyan@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Mary","Goad-Olson","MGoad-Olson@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Melissa","Ostlund","MOstlund@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Michelle","Greiner","MGreiner@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Natasha","Arntsen","NArntsen@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Neal","Rikal","NRikal@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Rachel","Stephens","RStephens@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Robert","Harris","RHarris@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Stephanie","Navas","SNavas@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Travis","Robinson","TRobinson@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Tyler","Koenen","TKoenen@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Tyler","Scheller","TScheller@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Varda","Nauen","VNauen@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Harley","Lippman","HLippman@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,1),
	("Glenn","Klein","GKlein@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,1),
	("Ami","Sarnowski","ASarnowski@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,1),
	("Mark","Parisi","MParisi@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Gabby","Angel","GAngel@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Walt","Wojcik","WWojcik@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Jeremy","Abrams","JAbrams@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Lyndsey","Restivo","LRestivo@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Andrew","Chertoff","AChertoff@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Darren","Rosemond","DRosemond@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Eileen","Rodriguez","ERodriguez@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Ian","McCormick","IMcCormick@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Jeff","Dorilas","JDorilas@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Siddiq","Kayoon","SKayoon@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Tariqul","Islam","TIslam@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Tremayne","Wilson","TWilson@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Vinny","Rualo","VRualo@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,1),
	("Ejazz","Shamid","EShamid@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Eric","Ku","EKu@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Michael","Glaberman","MGlaberman@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Abdul","Mohammed","AMohammed@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Amanda","Hyde","AHyde@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Andrew","Goedel","AGoedel@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Chelsea","Perez","CPerez@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Chris","Klein","CKlein@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Colleen","Murphy","CMurphy@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Cynthia","Antonacci","CAntonacci@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("David","Brown","DBrown@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Ed","Aron","EAron@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Gina","Lipman","GLipman@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Helen","Blake","HBlake@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Jennifer","Gilmore","JGilmore@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Jeremy","Inman","JInman@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Kayla","Edens","KEdens@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Ken","Aldridge","KAldridge@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Lauren","Borowka","LBorowka@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Lyne","Lustosa","LLustosa@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Mike","Larcamp","MLarcamp@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Patrick","Kimmel ","PKimmel @genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Rakesh","Sinha","RSinha@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Rick","Rice","RRice@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Sachin","Khanijow","SKhanijow@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Samantha","Tyson","STyson@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Shanna","Goodman ","SGoodman @genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Stefane","Golub","SGolub@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Steve","Dorlen","SDorlen@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Valerie","Quinata","VQuinata@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Beverly","Grace","BGrace@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Dawn","Sakai","DSakai@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Eric","Roberge","ERoberge@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,1),
	("Amanda","Cooley","ACooley@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Andrea","Alcorn","AAlcorn@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Angela","Landers","ALanders@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Anita","Janes","AJanes@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("A.Y.","Shah","AShah@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Bryce","Barker","BBarker@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Deanna","Pesco","DPesco@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Debra","Batista","DBatista@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Divya","Amrith","DAmrith@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Ed","Arnold","EArnold@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Ed","Conway","EConway@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Eric","Fass","EFass@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Heather","Lindland","HLindland@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("James","Wilton","JWilton@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Jim","Scialabba","JScialabba@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Kayla","Condit","KCondit@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Lane","Heth","LHeth@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Laura","DiGiovanni","LDiGiovanni@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Mark","Simone","MSimone@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Michelle","Lanzieri","MLanzieri@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Myesha","Westfield","MWestfield@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Rachel","Hill","RHill@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Renee","Feeney","RFeeney@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Shweta","Srinivasan","SSrinivasan@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Sridevi","Ganesan","SGanesan@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Stephen","Wistrcill","SWistrcill@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Susana","Lopez","SLopez@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Nate","Gram","NGram@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",11,1),
	("Debbie","James","DJames@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",11,2),
	("Jeff","DiPaolo","JDiPaolo@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",11,2),
	("Jennifer","Vitale","JVitale@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",11,2),
	("Katlin","Potochnik","KPotochnik@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",11,2),
	("Matthew","Fleshman","MFleshman@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",11,2),
	("Rod","Mullins","RMullins@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",11,2),
-- 	("Caron","Katz","Ckatz@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",12,1),
-- 	("Shindy","Pagba","SPagba@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",,2),
-- 	("Christina","Steer","CSteer@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",,2),
-- 	("Frank","Miceli","FMiceli@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",,2),
-- 	("Janelle","Lynch","JLynch@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",,2),
-- 	("Susan","Avery","SAvery@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",,2),
-- 	("Terry","Huegel","THuegel@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",,2),
-- 	("Jason","Sullivan","JSullivan@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",,2),
-- 	("Soaham","Joshi","SJoshi@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",,2),
-- 	("Mitch","Fass ","MFass@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",,1),
-- 	("Avi","Alashaian","AAlashaian@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",,2),
-- 	("Dave","Fradin","DFradin@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",,2),
-- 	("Gilbert","Nettleton","GNettleton@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",,2),
    ("Keely", "Brennan", "keely@keely.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 1, 2),
    ("Ethan", "Bettenga", "ethan@ethan.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 1, 2),
    ("Nate", "Wood", "nate@nate.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 1, 2),
    ("Matthew", "Gerszewski", "matthew@matthew.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 1, 2),
    ("Brianna", "Schladweiler", "brianna@brianna.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 1, 2),
    ("Hypo", "Thetical", "hypo@hypo.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 2, 2);

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
    DECLARE locId Int;
    
    SET locId = 1;
    SET x = 0;
    SET y = (SELECT beginningTime FROM location WHERE locationId = locId);
    SET increment = (SELECT timeIncrement FROM location WHERE locationId = locId);
    SET beginningTimeHours = (SELECT HOUR(beginningTime) FROM location WHERE locationId = locId);
    SET beginningTimeMinutes = (SELECT MINUTE(beginningTime) FROM location WHERE locationId = locId);
    SET endTimeHours = (SELECT HOUR(endTime) FROM location WHERE locationId = locId);
    SET endTimeMinutes = (SELECT MINUTE(endTime) FROM location WHERE locationId = locId);
    Set intervalMinutes = (endTimeHours * 60 + endTimeMinutes) - (beginningTimeHours * 60 + beginningTimeMinutes);
	SET loopNumber = intervalMinutes / increment;
    
    loop_label: LOOP
		IF x > loopNumber THEN
			LEAVE loop_label;
		END IF;
        
        INSERT INTO timeslot (timeSlotDate, startTime, locationId) VALUES (CURDATE(), y + INTERVAL increment * x MINUTE, locId);
        
        SET x = x + 1;
	END LOOP;
END$$

DELIMITER $$
CREATE PROCEDURE genAustinTimeSlots()
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
    DECLARE locId Int;
    
    SET locId = 2;
    SET x = 0;
    SET y = (SELECT beginningTime FROM location WHERE locationId = locId);
    SET increment = (SELECT timeIncrement FROM location WHERE locationId = locId);
    SET beginningTimeHours = (SELECT HOUR(beginningTime) FROM location WHERE locationId = locId);
    SET beginningTimeMinutes = (SELECT MINUTE(beginningTime) FROM location WHERE locationId = locId);
    SET endTimeHours = (SELECT HOUR(endTime) FROM location WHERE locationId = locId);
    SET endTimeMinutes = (SELECT MINUTE(endTime) FROM location WHERE locationId = locId);
    Set intervalMinutes = (endTimeHours * 60 + endTimeMinutes) - (beginningTimeHours * 60 + beginningTimeMinutes);
	SET loopNumber = intervalMinutes / increment;
    
    loop_label: LOOP
		IF x > loopNumber THEN
			LEAVE loop_label;
		END IF;
        
        INSERT INTO timeslot (timeSlotDate, startTime, locationId) VALUES (CURDATE(), y + INTERVAL increment * x MINUTE, locId);
        
        SET x = x + 1;
	END LOOP;
END$$

DELIMITER $$
CREATE PROCEDURE genDallasTimeSlots()
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
    DECLARE locId Int;
    
    SET locId = 3;
    SET x = 0;
    SET y = (SELECT beginningTime FROM location WHERE locationId = locId);
    SET increment = (SELECT timeIncrement FROM location WHERE locationId = locId);
    SET beginningTimeHours = (SELECT HOUR(beginningTime) FROM location WHERE locationId = locId);
    SET beginningTimeMinutes = (SELECT MINUTE(beginningTime) FROM location WHERE locationId = locId);
    SET endTimeHours = (SELECT HOUR(endTime) FROM location WHERE locationId = locId);
    SET endTimeMinutes = (SELECT MINUTE(endTime) FROM location WHERE locationId = locId);
    Set intervalMinutes = (endTimeHours * 60 + endTimeMinutes) - (beginningTimeHours * 60 + beginningTimeMinutes);
	SET loopNumber = intervalMinutes / increment;
    
    loop_label: LOOP
		IF x > loopNumber THEN
			LEAVE loop_label;
		END IF;
        
        INSERT INTO timeslot (timeSlotDate, startTime, locationId) VALUES (CURDATE(), y + INTERVAL increment * x MINUTE, locId);
        
        SET x = x + 1;
	END LOOP;
END$$

DELIMITER $$
CREATE PROCEDURE genDesMoinesTimeSlots()
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
    DECLARE locId Int;
    
    SET locId = 4;
    SET x = 0;
    SET y = (SELECT beginningTime FROM location WHERE locationId = locId);
    SET increment = (SELECT timeIncrement FROM location WHERE locationId = locId);
    SET beginningTimeHours = (SELECT HOUR(beginningTime) FROM location WHERE locationId = locId);
    SET beginningTimeMinutes = (SELECT MINUTE(beginningTime) FROM location WHERE locationId = locId);
    SET endTimeHours = (SELECT HOUR(endTime) FROM location WHERE locationId = locId);
    SET endTimeMinutes = (SELECT MINUTE(endTime) FROM location WHERE locationId = locId);
    Set intervalMinutes = (endTimeHours * 60 + endTimeMinutes) - (beginningTimeHours * 60 + beginningTimeMinutes);
	SET loopNumber = intervalMinutes / increment;
    
    loop_label: LOOP
		IF x > loopNumber THEN
			LEAVE loop_label;
		END IF;
        
        INSERT INTO timeslot (timeSlotDate, startTime, locationId) VALUES (CURDATE(), y + INTERVAL increment * x MINUTE, locId);
        
        SET x = x + 1;
	END LOOP;
END$$

DELIMITER $$
CREATE PROCEDURE removeOldData()
BEGIN
	DELETE FROM arrival
    WHERE arrivalDate < CURDATE() - INTERVAL 90 DAY;
    
    DELETE FROM departure
    WHERE departureDate < CURDATE() - INTERVAL 90 DAY;
    
    DELETE FROM timeslot
    WHERE timeSlotDate < CURDATE() - INTERVAL 90 DAY;
    
    DELETE FROM attendance
    WHERE attendanceDate < CURDATE() - INTERVAL 90 DAY;
END$$

-- CREATE EVENT elephantdb.generateTimeSlots
-- 	ON SCHEDULE EVERY '1' day
-- 	STARTS '2020-05-13 03:00:00'
-- DO
-- BEGIN
	CALL genMinneapolisTimeSlots();
    CALL genAustinTimeSlots();
    CALL genDallasTimeSlots();
    CALL genDesMoinesTimeSlots();
-- END

INSERT INTO timeslot (timeSlotDate, startTime, isTaken, locationId) VALUES
	("2020-1-2", "07:00:00", 0, 1),
    ("2020-1-2", "07:15:00", 0, 1),
    ("2020-1-2", "18:00:00", 0, 1),
    ("2020-1-2", "18:15:00", 0, 1);

INSERT INTO arrival (arrivalDate, timeSlotId, userId) VALUES
	("2020-1-2", 197, 30),
    ("2020-1-2", 198, 30),
    ("2020-5-26", 3, 40);
    
INSERT INTO departure (departureDate, timeSlotId, userId) VALUES
	("2020-1-2", 199, 30),
    ("2020-1-2", 200, 30),
    ("2020-5-26", 5, 40);

SET SQL_SAFE_UPDATES = 0;
	CALL removeOldData();
SET SQL_SAFE_UPDATES = 1;