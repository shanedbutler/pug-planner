USE [PugPlanner]

SET IDENTITY_INSERT [Position] ON
INSERT INTO [Position] (Id, [Name], FullName) VALUES (1, 'GK', 'Goalkeeper')
INSERT INTO [Position] (Id, [Name], FullName) VALUES (2, 'CB', 'Center-Back')
INSERT INTO [Position] (Id, [Name], FullName) VALUES (3, 'LB', 'Left-Back')
INSERT INTO [Position] (Id, [Name], FullName) VALUES (4, 'RB', 'Right-Back')
INSERT INTO [Position] (Id, [Name], FullName) VALUES (5, 'MF', 'Midfielder')
INSERT INTO [Position] (Id, [Name], FullName) VALUES (6, 'LMF', 'Left Midfielder')
INSERT INTO [Position] (Id, [Name], FullName) VALUES (7, 'RMF', 'Right Midfielder')
INSERT INTO [Position] (Id, [Name], FullName) VALUES (8, 'FW', 'Forward')
SET IDENTITY_INSERT [Position] OFF

SET IDENTITY_INSERT [Pronoun] ON
INSERT INTO Pronoun (Id, [Name]) VALUES (1, 'He/Him')
INSERT INTO Pronoun (Id, [Name]) VALUES (2, 'She/Her')
INSERT INTO Pronoun (Id, [Name]) VALUES (3, 'They/Them')
INSERT INTO Pronoun (Id, [Name]) VALUES (4, 'He/They')
INSERT INTO Pronoun (Id, [Name]) VALUES (5, 'She/They')
SET IDENTITY_INSERT [Pronoun] OFF

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile] (Id, FirebaseUserId, FirstName, LastName, Email, Phone, Club, CreateDateTime, PrimaryPositionId, SecondaryPositionId, [Admin], PronounId, EmergencyName, EmergencyPhone, [Active]) 
VALUES (1, 'ufV2PP7zp5YIL1FEzuYgk2KgYRk2', 'Foo', 'Barington', 'foo@bar.com', '555-305-2034', 'LA Galaxy', '2023-02-18', 1, 2, 1, 3, 'Baz', '555-235-5234', 1);
INSERT INTO [UserProfile] (Id, FirebaseUserId, FirstName, LastName, Email, Phone, Club, CreateDateTime, PrimaryPositionId, SecondaryPositionId, [Admin], PronounId, EmergencyName, EmergencyPhone, [Active]) 
VALUES (2, 'WnewqveTXBbCk2JJAxgrePK1rR63', 'Baz', 'Billings', 'bar@baz.com', '555-302-5942', 'Real Madrid', '2023-02-18', 3, 4, 0, 2, 'Foo', '555-230-5912', 1);
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Game] ON
INSERT INTO Game (Id, Title, [Location], [Address], [Description], GameDate, SignupDate, MaxPlayers, Recurring, PrimaryHostId, SecondaryHostId)
VALUES (1, 'Solano Canyon Turf Night', 'Griffith Park Soccer Field', '3343 Riverside Dr, Los Angeles, CA 90027', 'All skill levens and genders welcome.', '2022-12-30 11:30', '2022-12-5 21:00', 11, 1, 1, 2);
INSERT INTO Game (Id, Title, [Location], [Address], [Description], GameDate, SignupDate, MaxPlayers, Recurring, PrimaryHostId, SecondaryHostId)
VALUES (2, 'Weekend Morning Turf ', 'McAlister Field', '3000 S Hoover St, Los Angeles, CA 90089', 'Good morning! All skill levens and genders welcome.', '2023-1-08 18:00', '2023-1-15 9:00', 6, 0, 1, 2);
SET IDENTITY_INSERT [Game] OFF
