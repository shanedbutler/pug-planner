USE [PugPlanner]

SET IDENTITY_INSERT [Position] ON
INSERT INTO Position (Id, [Name], ShortName) VALUES (1, 'GK', 'Goalkeeper')
INSERT INTO Position (Id, [Name], ShortName) VALUES (2, 'CB', 'Center-Back')
INSERT INTO Position (Id, [Name], ShortName) VALUES (3, 'LB', 'Left-Back')
INSERT INTO Position (Id, [Name], ShortName) VALUES (4, 'RB', 'Right-Back')
INSERT INTO Position (Id, [Name], ShortName) VALUES (5, 'MF', 'Midfielder')
INSERT INTO Position (Id, [Name], ShortName) VALUES (6, 'LMF', 'Left Midfielder')
INSERT INTO Position (Id, [Name], ShortName) VALUES (7, 'RMF', 'Right Midfielder')
INSERT INTO Position (Id, [Name], ShortName) VALUES (8, 'FW', 'Forward')
SET IDENTITY_INSERT [Position] OFF

SET IDENTITY_INSERT [Pronoun] ON
INSERT INTO Position (Id, [Name]) VALUES (1, 'He/Him')
INSERT INTO Position (Id, [Name]) VALUES (2, 'She/Her')
INSERT INTO Position (Id, [Name]) VALUES (3, 'They/Them')
INSERT INTO Position (Id, [Name]) VALUES (4, 'He/They')
INSERT INTO Position (Id, [Name]) VALUES (5, 'She/They')
SET IDENTITY_INSERT [Position] OFF

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, Phone, Club, CreateDateTime, PrimaryPositionId, SecondaryPositionId, [Admin], PronounId, EmergencyName, EmergencyPhone) 
VALUES (1, 'Foo', 'Barington', 'foo@bar.com', '555-305-2034', 'LA Galaxy', '2022-12-03', 1, 2, 1, 3, 'Baz', '555-235-5234');
INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, Phone, Club, CreateDateTime, PrimaryPositionId, SecondaryPositionId, [Admin], PronounId, EmergencyName, EmergencyPhone) 
VALUES (2, 'Reina', 'Sandwith', 'rsandwith0@google.com.brx', '555-302-5942', 'Real Madrid', '2022-12-04', 3, 4, 0, 2, 'Jena', '555-230-5912');
INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, Phone, Club, CreateDateTime, PrimaryPositionId, SecondaryPositionId, [Admin], PronounId, EmergencyName, EmergencyPhone) 
VALUES (3, 'Red', 'Do', 'rdo1@timesonline.co.ukx', '555-403-4134', 'Barcelona', '2022-12-04', 5, 6, 0, 4, 'George', '555-392-5912');
INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, Phone, Club, CreateDateTime, PrimaryPositionId, SecondaryPositionId, [Admin], PronounId, EmergencyName, EmergencyPhone) 
VALUES (4, 'Ricardo', 'Swope', 'rswope@hudsonnews.com', '555-301-5325', 'Liverpool FC', '2022-12-04', 7, 8, 0, 1, 'Feltman', '555-302-1321');
INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, Phone, Club, CreateDateTime, PrimaryPositionId, SecondaryPositionId, [Admin], PronounId, EmergencyName, EmergencyPhone) 
VALUES (5, 'Arnold', 'Fuller', 'afull@hotbot.net', '555-240-5012', 'Los Angeles FC', '2022-12-04', 1, 2, 0, 1, 'Carlotte', '555-305-3211');
INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, Phone, Club, CreateDateTime, PrimaryPositionId, SecondaryPositionId, [Admin], PronounId, EmergencyName, EmergencyPhone) 
VALUES (6, 'Armando', 'Zelle', 'zman@westco.net', '555-302-4096', 'Celtic', '2022-12-04', 5, 2, 0, 1, 'Angel', '555-311-4032');
INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, Phone, Club, CreateDateTime, PrimaryPositionId, SecondaryPositionId, [Admin], PronounId, EmergencyName, EmergencyPhone) 
VALUES (7, 'Jim', 'Singleton', 'jsins@nice.com', '555-503-0953', 'West Ham', '2022-12-05', 6, 7, 0, 1, 'Jess', '555-203-1953');
INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, Phone, Club, CreateDateTime, PrimaryPositionId, SecondaryPositionId, [Admin], PronounId, EmergencyName, EmergencyPhone) 
VALUES (8, 'Jessie', 'White', 'jwhite@nice.com', '555-291-3352', 'Boca Juniors', '2022-12-05', 4, 5, 0, 5, 'Stephen', '555-392-4012');
INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, Phone, Club, CreateDateTime, PrimaryPositionId, SecondaryPositionId, [Admin], PronounId, EmergencyName, EmergencyPhone) 
VALUES (9, 'Milton', 'Bradakin', 'mkinz@manowar.net', '555-204-2495', 'CF Monterrey', '2022-12-05', 2, 4, 0, 1, 'Melinda', '555-300-5943');
INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, Phone, Club, CreateDateTime, PrimaryPositionId, SecondaryPositionId, [Admin], PronounId, EmergencyName, EmergencyPhone) 
VALUES (10, 'Joe', 'Flips', 'flipin@cinomon.com', '555-301-6032', 'Napoli', '2022-12-05', 8, 6, 0, 1, 'Laura', '555-201-6604');
INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, Phone, Club, CreateDateTime, PrimaryPositionId, SecondaryPositionId, [Admin], PronounId, EmergencyName, EmergencyPhone) 
VALUES (11, 'Melissa', 'Zipps', 'mzip@hotmail.com', '555-305-2043', 'Arsenal', '2022-12-05', 2, 8, 0, 2, 'Marky', '555-302-5921');
INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, Phone, Club, CreateDateTime, PrimaryPositionId, SecondaryPositionId, [Admin], PronounId, EmergencyName, EmergencyPhone) 
VALUES (12, 'Laura', 'Karp', 'lthekarp@hotmail.com', '555-390-7000', 'DC United', '2022-12-05', 8, 4, 0, 2, 'Linda', '555-251-6043');
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Game] ON
INSERT INTO Game (Id, Title, [Location], [Address], [Description], GameDate, SignupDate, MaxPlayers, Recurring, PrimaryHostId, SecondaryHostId)
VALUES (1, 'Solano Canyon Turf Night', 'Griffith Park Soccer Field', '3343 Riverside Dr, Los Angeles, CA 90027', '2022-12-30 11:30', '2022-12-5 21:00', 11, 1, 1, 2);
INSERT INTO Game (Id, Title, [Location], [Address], [Description], GameDate, SignupDate, MaxPlayers, PrimaryHostId, SecondaryHostId)
VALUES (2, 'Weekend Morning Turf ', 'McAlister Field', '3000 S Hoover St, Los Angeles, CA 90089', '2023-1-08 18:00', '2023-1-15 9:00', 6, 0, 1, 3);
SET IDENTITY_INSERT [Game] OFF
