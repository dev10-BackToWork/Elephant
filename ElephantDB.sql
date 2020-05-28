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
	("GA, Norcross", 15, 20, "07:00:00", "19:00:00"),
	("KS, Lenexa", 15, 20, "07:00:00", "19:00:00"),
    ("KS, Lenexa (Kansas Delivery Center)", 15, 20, "07:00:00", "19:00:00"),
    ("MI, Troy", 15, 20, "07:00:00", "19:00:00"),
    ("MN, Saint Paul", 15, 20, "07:00:00", "19:00:00"),
    ("NC, Charlotte", 15, 20, "07:00:00", "19:00:00"),
    ("NC, Charlotte (Charlotte Delivery Center)", 15, 20, "07:00:00", "19:00:00"),
    ("NY, New York", 15, 20, "07:00:00", "19:00:00"),
    ("OH, Akron", 15, 20, "07:00:00", "19:00:00"),
    ("Remote", 15, 20, "07:00:00", "19:00:00"),
    ("TX, Austin", 15, 20, "07:00:00", "19:00:00"),
    ("TX, Dallas", 15, 20, "07:00:00", "19:00:00"),
    ("TX, Dallas (Plano Delivery Center)", 15, 20, "07:00:00", "19:00:00"),
    ("WI, Milwaukee", 15, 20, "07:00:00", "19:00:00");

INSERT INTO `role` (roleId, roleName)
VALUES (1, "ROLE_ADMIN"),
(2, "ROLE_USER");

INSERT INTO `user` (firstName, lastName, email, defaultPW, passwords, locationId, roleId) VALUES 
	("default", "user", "user@user.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 1, 1),
	("Agnes","Atem","agnesatem2@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Padmavathi","Vadrevu","vpadma0881@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Kingsley","Awah","kingsleyawah33@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Asad","Chughtai","asadmqd@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Michael","Edwards","medwards180@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Jeffrey","Freed","jfreed@hotmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Geethabhavani","Gajbinkar","gajbinkar.geeetha@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("John","Gallina Jr","john2gallina@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Randy","Gosier","randyrosiere@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Richard","Harriman","rsharriman@hotmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Gregory","Huckleberry","glhuckleberry@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Mandar","Joshi","joshimandar1@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("William","Kamdem","kamdemwill@yahoo.fr","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Anjali","Khandelwal","anjalik.ba@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Sridhar","Kotha","kothasridhar@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Prasad","Krovvidi","krovvididad@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Antonette","Lund","antonette.lund@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Diane","Maisonet","drmaiso1@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Ravindar","Maruru","ravib2021@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Derrick","Murray","dtmurray0498@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Leslie","Pack","lesliepack@live.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Dhruv","Patel","dhruvmailbox5@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Patricia","Patrick","tcpintx12@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("William","Percoco","wpercoco2@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("James","Perry","braxton@aol.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Mahanandi","Pulkurthi","mahareddyy@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Dawn","Sakai","dawn.sakai@outlook.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Luis","Salcedo","luissalcedo@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Ravali","Savva","savvaravali@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Shivkumar","Sonkar","sksonkar@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Bhavya","Thota","bhavyat08@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Eric","Tyson","tysonericj@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Shawn","Wilson","sdwilson03@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Netsanet","Woldesenbet","netsanet.woldesenbet@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Ben","none","alehqaeng@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Mounika","none","mounika112090@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",7,2),
	("Timothy","Evans","Tevans611@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Michael","Young","michaelyoung@live.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("David","Bach","davidbach@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Harisharan","Baddam","hbaddam@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Michael","lisa","mykebrinson@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Lesley","Caldwell","lrcaldwell1@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Syretta","Clyde","syrettaclyde@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Judith","Cooper","jpc30045@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Glenn","Dacruz","gjdacruz@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Eric","Dunn","eric.dunn36@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Shilpa","Ganapuram","gshilpa1982@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Reginald","Johnson","reginaldfjohnson@hotmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Adrian","Levinson","adrian.levinson@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("James","Loveday","jimloveday@vox-sola.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("George","Stanton","george.stanton308@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Boni","Tan","btanusa@hotmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Daaliyah","Tate","liyahtate@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Sakii","Terrell","itsakii@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Henry","Viel","hjviel@comcast.net","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Roger","Walker","rogerl.walker@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Eric","Wherry","ericwherry@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",1,2),
	("Patrick","Cahill","pmc7428@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("John","Weiss","weisser79@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Tracy","Lake","ta.cl.lake@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Camille","Azar","c.azar@sbcglobal.net","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Michael","Brazda","mbrazda@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Rickey","Budlong","rbudlong08@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Brenda","Carner","bjcarner@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("John","Chevalier","johnrchevalier@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Connie","Clowe","C.J.CLOWE@GMAIL.COM","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Daniel","Conradt","dconra02@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Donna","Craiglow","shutterbug@kc.rr.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Lucian","Deas","navylew@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("David","Doerfler","drdoerfler@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Ahmed","Elghussein","ahmed.elghussein@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Rodney","Ellis","authorbynight@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Pamela","Estep Nash","pammiestep@hotmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Scott","Kirkham","scottkirkhamkc@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Tamra","Rollins","tammyrollins@hotmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Karen","Sage","karenssage@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Candace","Wilson","candace.l.wilson@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Craig","Davis","clouis11@msn.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Paul","Gehrt","pmgtech79@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Douglas","Goyer","douggoy@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Paula","Houck","pjhouck57@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Lynne","Howard Walls","lynnehowardwalls@outlook.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Paula","Johnson","pjohnson2376@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Kristina","Marriott","Kmarriott65@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Linda","McCormick","3mccrmck@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Florence","McGregor","florence.mcgregor@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Charlotte","Meyers","charlottemeyers@ymail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Scott","Miller","scottmillerpmp@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Jennifer","Murphy","jmurphykc@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Gregory","O'Connor","gregsoc50@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Barbara","Ray","bray4843661@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Wayne","Ruley","wruley@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Richard","Ruperto","r.p.ruperto@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Kristina","Salsgiver","kristysalsgiver@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Ralph","Sanjuan","r.sanjuan@att.net","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Barbara","Schauperl","barbschauperl@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Ronald","Smith","ron_d_smith@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Christine","Taylor","chris.taylor@savageshooter.us","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Carolyn","Terry","ckm.terry@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Larry","Dreiling","larry.dreiling@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",3,2),
	("Frank","Degise","fdegise@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Morgan","Chalut","mchalut@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Nicole","Burnham","burnham.nicole@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Kehinde","Adeleke","adelekks@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("James","Buckley","james.m.buckley.1@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Nookaraju","Buddha","buddhaunix@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Elvis","Che","chesh22@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Sambaiah","Dodda","sambadodda@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Victoria","Dorn","vdorn01@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Olakunle","Fasesimi","richiefash1@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Regina","Hemphill","regina.hemp@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Samer","Khader","skhader@sbcglobal.net","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Kyle","Kucera","kylekucera@verizon.net","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Yong","Lan","lany2006@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Lonnie","McCloud","lrmccloud@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Sivasatya","Medapati","sivamedapati8888@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Chiranjibi","Neeroula","neeroula@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Mansoor","Nooruddin","mansoor.nooruddin@outlook.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Girish","Pardikar","girish_pardikar@hotmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Krunal","Patel","krunal099@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Ashish","Patwari","patwari.ashish@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Palaniraj","Pavunraj","ppalanirajh@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Tuan","Pham","tuanp955@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Mounika","Ravipati","mounika.ravipati5@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Shahzad","Riasat","shahzad.riasat@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Shahzad","Siddiqui","shahzad_siddiqui@hotmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Venkata","Vuyyuru","bvuyyuru@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Uzair","Zaheer","uzairz@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Derrick","Alexander","dbmackn@aol.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Joshua","Barksdale","joshuaray.2012@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Srinivas","Bhadriraju","s.bhadriraju@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Pavithra","Bhat","pavibhat2011@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Michael","Campbell","campbellmichaelr@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Victor","Dupuy II","victordupuy@sbcglobal.net","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Douglas","Fleming","dougfleming09@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Glenn","Goodrich","gwgosu@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Robert","Grayson","bobgrayson@sbcglobal.net","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("James","Jenkins","jenkins_jim@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Pavan","Kamineni","pkamineni@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Peggy","Love","peggy_love@ymail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Stephen","Meents","smeents@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Rosemary","Nahas","rlnahas@att.net","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("David","Ogden","dogden2@sbcglobal.net","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Kimberly","Pramanik","kim@dipakpramanik.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("David","Pugh","dvdwpgh@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Robby","Purcell","r-purcell@sbcglobal.net","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Pavan","Puttaparthi","pavanputtaparthi@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Mary","Quandt","mjquandt@att.net","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Afsheen","Qureshi","afsheen.qures@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Amir","Qureshi","amir.qures@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Karen","Rhodes","kayli.rhodes@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Padmavathi","Vijayakumar","Padma.vijay@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Richard","Koerwer","rkoerwer@hotmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Mackenzie","Leopeng","mackenzieleopeng@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Dumisani","Mkhize","LloydMkhize@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Barry","Putnam","bputnam65@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Tony","Ho","tony.life87@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",13,2),
	("Nicholas","Pranis","npranis@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Jacqueline","Bertolini","jbertolini@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Matthew","Hebert","matthewhebert@mac.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Beverly","Atchison","bevatchison@comcast.net","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("James","Daye","jim.daye@sbcglobal.net","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Paul","Handmacher","phandmacher51@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Paul","Huddy","huddy.paul@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Maha","Hussein","mahahussein11@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Diana","John","djohn55@hotmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Gerald","Jones","jerryjones658@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Kimberly","Kimel","kimkimel@hotmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Daniel","Kiplinger","dan.kiplinger@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("William","Kubik","wbkubik@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("James","Malinowski","james.e.malinowski@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Mark","Mulawa","mmulawa9758@wowway.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Srinivasa Rao","Muppa","srinivasmuppa@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("James","Ostad","jostad@bsgellc.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Beth","Reynolds","beth_a_reynolds@hotmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Neal","Robinson","nrobinson50@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Roy","Thompson","dthompson140@verizon.net","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Trenease","Thrasher","trenease.thrasher@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Rose","Tyler","pmigirlrt@hotmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",4,2),
	("Stephen","Biles","sbiles@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",11,2),
	("Colleen","McIntyre","csadowski@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",11,1),
	("Nicole","Forsthoefel","nforsthoefel@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",11,2),
	("Victoria Alexis","Arndt","varndt@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",12,2),
	("Angela","Hillin","ahillin@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",12,2),
	("Paul","Waine","pwaine@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",12,2),
	("Jaimi","Nielsen","Jnielsen@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",12,2),
	("Wayne","Sueltz","wsueltz@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",12,1),
	("Kevin","Zoch","kzoch@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",12,2),
	("Johnathon","Klink","jklink@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",14,2),
	("Timothy","Koelbl","tkoelbl@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",14,2),
	("Julie","Spahr","jspahr@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",14,2),
	("Sara","Brahm","sbrahm@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",14,2),
	("Aaron","Lemkau","alemkau@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",14,2),
	("Tristan","Schulz","tschulz@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",14,2),
	("Joseph","Jens","jjens@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",14,1),
	("Meghan","Zehm","mkalis@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",14,2),
	("Tracy","Beckmann","tbeckmann@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,1),
	("Beth","Burris","bburris@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Nichoel","Ellis","nellis@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Lori","Jenniges","ljenniges@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Kelly","Calendine","kcalendine@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Kathleen","Kimble","kkimble@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Carlie","Louisiana","clouisiana@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("John","Trygstad","jtrygstad@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Natasha","Arntsen","narntsen@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("John","Evenstad","jevenstad@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Mary","Goad-Olson","mgoadolson@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Laura","Miller","lmiller@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Varda","Nauen","vnauen@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Travis","Robinson","trobinson@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Stephen","Wistrcill","swistrcill@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Taylor","Jensen","tjensen@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Julie","Kent","jkent@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Tyler","Koenen","tkoenen@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Erik","Peterson","epeterson@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Christopher","Roe","croe@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Tyler","Scheller","tscheller@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Rachel","Stephens","rstephens@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Jacob","Svare","jsvare@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Jonah","Vangorden","jvangorden@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Beth","Fogarty","bfogarty@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Michelle","Greiner","mgreiner@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Angela","Mareski","amareski@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Melissa","Ostlund","mostlund@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Maria","Ryan","mryan@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Angelia","Smith-Brekke","abrekke@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,1),
	("Erin","Seaberg","elarson@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Danielle","Sol","dsol@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Elizabeth","Raymond","braymond@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,1),
	("Jennifer","Turnquist","jturnquist@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Kayla","Coller","kcoller@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,2),
	("Tara","Wyborny","twyborny@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",5,1),
	("Edward","Conway","econway@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Renee","Feeney","rfeeney@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Divya","Amrith","damrith@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Kayla","Condit","kcondit@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Eric","Fass","ericmfass@gmail.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Sridevi","Ganesan","sganesan@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Angela","Landers","alanders@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("James","Scialabba","jscialabba@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Anal","Shah","ashah@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Shweta","Srinivasan","ssrinivasan@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Amanda","Cooley","acooley@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Heather","Lindland","hlindland@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Eric","Roberge","eroberge@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,1),
	("Myesha","Westfield","mwestfield@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("James","Wilton","jwilton@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Carol","Valencia","cvalencia@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Beverly","Grace","bgrace@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Mark","Parisi","mparisi@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Kayla","Edens","kedens@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Chelsea","Perez","cperez@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",6,2),
	("Guy","Arnone","garnone@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",2,1),
	("Jason","Belcher","jbelcher@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",2,2),
	("Sandy","Medley","smedley@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",2,2),
	("April","Young","ayoung@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",2,2),
	("Angela","Gonzales","agonzales@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",2,2),
	("John","Triggs","jtriggs@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",2,2),
	("Ronald","Clampitt","rclampitt@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",2,2),
	("Andrew","Chertoff","achertoff@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Jeff","Dorilas","jdorilas@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Tariqul","Islam","tislam@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Siddiq","Kayoon","skayoon@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Glenn","Klein","gklein@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,1),
	("Ian","McCormick","imccormick@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Eileen","Rodriguez","erodriguez@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Darren","Rosemond","drosemond@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Tremayne","Wilson","twilson@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Jeremy","Abrams","jabrams@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Gabby","Angel","GAngel@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Michael","Glaberman","mglaberman@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Eric","Ku","eku@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Lyndsey","Restivo","lrestivo@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("John","Rualo","jvrualo@yahoo.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,1),
	("Ejazz","Shamid","eshamid@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Steven","Dorlen","sdorlen@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Stefane","Golub","sgolub@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("John","Larcamp","mlarcamp@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Helen","Leventon","hblake@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Roqueline","Lustosa-Sary","llustosa@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",8,2),
	("Valerie","Quinata","vquinata@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Lauren","Pavka","lpavka@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Katlin","Potochnik","kpotochnik@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Andrew","Goedel","agoedel@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Rodney","Mullins","rmullins@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Nathan","Gram","ngram@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,1),
	("Deborah","James","djames@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Rachel","Hill","ryoho@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Jennifer","Vitale","jvitale@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Matthew","Fleshman","mfleshman@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",9,2),
	("Jeff","Edwards","jdedwards@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Shindy","Pagba","spagba@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Caron","Katz","ckatz@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,1),
	("Charissa","Klein","cklein@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Frank","Miceli","fmiceli@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Anita","Janes","ajanes@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Ecdem","Uluocak","auluocak@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Mark","Simone","msimone@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Harley","Lippman","hlippman@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,1),
	("Rakesh","Sinha","rsinha@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Stephanie","Navas","snavas@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Kenneth","Aldridge","kaldridge@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Richard","Rice","rrice@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Abdul","Mohammed","a.mohammed@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Joan","Kober","jkober@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Charles","Ayers","gayers@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Sheila","Sayler","ssayler@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Soaham","Joshi","sjoshi@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Susan","Avery","savery@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Ami","Sarnowski","asarnowski@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,1),
	("Remster","Bingham","rbingham@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,1),
	("Christina","Steer","csteer@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Reuben","Mendoza","rmendoza@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Terry","Huegel","thuegel@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Janelle","Lynch","jlynch@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Lane","Heth","llambert@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Michelle","Lanzieri","mlanzieri@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("David","Brown","dabrown@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Patrick","Kimmel","pkimmel@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Mitchell","Fass","mfass@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,1),
	("Deanna","Pesco","dpesco@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Debra","Batista","dbatista@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("David","Fradin","dfradin@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Avedis","Alashaian","avi@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Etgar","Aron","earon@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Shanna","Goodman","sgoodman@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Gilbert","Nettleton","gnettleton@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Andrea","Alcorn","aalcorn@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Robert","Harris","rharris@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Jason","Sullivan","jsullivan@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Cynthia","Antonacci","cantonacci@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Susana","Lopez Amoriz","slopez@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Jeffrey","Dipaolo","jdipaolo@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Neal","Rikal","nrikal@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Samantha","Tyson","styson@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Jennifer","Wood-Gilmore","jgilmore@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Edward","Arnold","earnold@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Amanda","Hyde","ahyde@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Sachin","Khanijow","skhanijow@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Gina","Ahern","glipman@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Lauren","Borowka","lschuerlein@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Bryce","Barker","bbarker@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Laura","DiGiovanni","ldigiovanni@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Angie","Farmer","anfarmer@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Jeremy","Inman","jinman@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
	("Colleen","Murphy","cmurphy@genesis10.com","password","$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6",10,2),
    ("Keely", "Brennan", "keely@keely.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 5, 2),
    ("Nate", "Wood", "nate@nate.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 5, 2),
    ("Matthew", "Gerszewski", "matthew@matthew.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 5, 2),
    ("Brianna", "Schladweiler", "brianna@brianna.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 5, 2),
    ("Hypo", "Thetical", "hypo@hypo.com", "password", "$2a$06$b8ZkDIvP/uNS1ePFkJYLVedOmCMkgM1M4rkiX8p30lTA6FElY4Fn6", 5, 2);

DELIMITER $$
CREATE PROCEDURE genLoc1TimeSlots()
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
CREATE PROCEDURE genLoc2TimeSlots()
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
CREATE PROCEDURE genLoc3TimeSlots()
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
CREATE PROCEDURE genLoc4TimeSlots()
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
CREATE PROCEDURE genLoc5TimeSlots()
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
    
    SET locId = 5;
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
CREATE PROCEDURE genLoc6TimeSlots()
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
    
    SET locId = 6;
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
CREATE PROCEDURE genLoc7TimeSlots()
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
    
    SET locId = 7;
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
CREATE PROCEDURE genLoc8TimeSlots()
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
    
    SET locId = 8;
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
CREATE PROCEDURE genLoc9TimeSlots()
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
    
    SET locId = 9;
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
CREATE PROCEDURE genLoc10TimeSlots()
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
    
    SET locId = 10;
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
CREATE PROCEDURE genLoc11TimeSlots()
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
    
    SET locId = 11;
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
CREATE PROCEDURE genLoc12TimeSlots()
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
    
    SET locId = 12;
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
CREATE PROCEDURE genLoc13TimeSlots()
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
    
    SET locId = 13;
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
CREATE PROCEDURE genLoc14TimeSlots()
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
    
    SET locId = 14;
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
	SET SQL_SAFE_UPDATES = 0;

	DELETE FROM arrival
    WHERE arrivalDate < CURDATE() - INTERVAL 90 DAY;
    
    DELETE FROM departure
    WHERE departureDate < CURDATE() - INTERVAL 90 DAY;
    
    DELETE FROM timeslot
    WHERE timeSlotDate < CURDATE() - INTERVAL 90 DAY;
    
    DELETE FROM attendance
    WHERE attendanceDate < CURDATE() - INTERVAL 90 DAY;
    
    SET SQL_SAFE_UPDATES = 1;
END$$

-- CREATE EVENT elephantdb.generateTimeSlots
-- 	ON SCHEDULE EVERY '1' day
-- 	STARTS '2020-05-27 15:26:15'
-- DO
-- BEGIN
	CALL genLoc1TimeSlots();
    CALL genLoc2TimeSlots();
    CALL genLoc3TimeSlots();
    CALL genLoc4TimeSlots();
    CALL genLoc5TimeSlots();
    CALL genLoc6TimeSlots();
    CALL genLoc7TimeSlots();
    CALL genLoc8TimeSlots();
    CALL genLoc9TimeSlots();
    CALL genLoc10TimeSlots();
    CALL genLoc11TimeSlots();
    CALL genLoc12TimeSlots();
    CALL genLoc13TimeSlots();
    CALL genLoc14TimeSlots();
    
    CALL removeOldData();
-- END