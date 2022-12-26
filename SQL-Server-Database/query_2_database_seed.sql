USE [PugPlanner]

SET IDENTITY_INSERT [Position] ON
INSERT INTO Position (Id, [Name], ShortName) VALUES (1, 'Goalkeeper', 'GK')
INSERT INTO Position (Id, [Name], ShortName) VALUES (2, 'Center-Back', 'CB')
INSERT INTO Position (Id, [Name], ShortName) VALUES (3, 'Left-Back', 'LB')
INSERT INTO Position (Id, [Name], ShortName) VALUES (4, 'Right-Back', 'RB')
INSERT INTO Position (Id, [Name], ShortName) VALUES (5, 'Midfielder', 'MF')
INSERT INTO Position (Id, [Name], ShortName) VALUES (6, 'Left Midfielder', 'LMF')
INSERT INTO Position (Id, [Name], ShortName) VALUES (7, 'Right Midfielder', 'RMF')
INSERT INTO Position (Id, [Name], ShortName) VALUES (8, 'Forward', 'FW')
SET IDENTITY_INSERT [Position] OFF

SET IDENTITY_INSERT [Pronoun] ON
INSERT INTO Position (Id, [Name]) VALUES (1, 'He/Him')
INSERT INTO Position (Id, [Name]) VALUES (2, 'She/Her')
INSERT INTO Position (Id, [Name]) VALUES (3, 'They/Them')
INSERT INTO Position (Id, [Name]) VALUES (4, 'He/They')
INSERT INTO Position (Id, [Name]) VALUES (5, 'She/They')
SET IDENTITY_INSERT [Position] OFF

-- SET IDENTITY_INSERT [UserProfile] ON
-- INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, CreateDateTime, PrimaryPositionId, SecondaryPositionId, PronounId, [Admin]) 
-- VALUES (1, 'Foo', 'Barington', 'foo@bar.com', '2022-12-03', 1, 2, 1, 3);
-- INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, CreateDateTime, PrimaryPositionId, SecondaryPositionId, PronounId, [Admin]) 
-- VALUES (2, 'Reina', 'Sandwith', 'rsandwith0@google.com.brx', '2022-12-04', 3, 4, 0, 2);
-- INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, CreateDateTime, PrimaryPositionId, SecondaryPositionId, PronounId, [Admin]) 
-- VALUES (3, 'Red', 'Do', 'rdo1@timesonline.co.ukx', '2022-12-04', 5, 6, 0, 4);
-- INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, CreateDateTime, PrimaryPositionId, SecondaryPositionId, PronounId, [Admin]) 
-- VALUES (4, 'Ricardo', 'Swope', 'rswope@hudsonnews.com', '2022-12-04', 7, 8, 0, 1);
-- INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, CreateDateTime, PrimaryPositionId, SecondaryPositionId, PronounId, [Admin]) 
-- VALUES (5, 'Arnold', 'Fuller', 'afull@hotbot.net', '2022-12-04', 1, 2, 0, 1);
-- INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, CreateDateTime, PrimaryPositionId, SecondaryPositionId, PronounId, [Admin]) 
-- VALUES (6, 'Armando', 'Zelle', 'zman@westco.net', '2022-12-04', 5, 2, 0, 1);
-- INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, CreateDateTime, PrimaryPositionId, SecondaryPositionId, PronounId, [Admin]) 
-- VALUES (7, 'Jim', 'Singleton', 'jsins@nice.com', '2022-12-05', 6, 7, 0, 1);
-- INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, CreateDateTime, PrimaryPositionId, SecondaryPositionId, PronounId, [Admin]) 
-- VALUES (8, 'Jessie', 'White', 'jwhite@nice.com', '2022-12-05', 4, 5, 0, 5);
-- INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, CreateDateTime, PrimaryPositionId, SecondaryPositionId, PronounId, [Admin]) 
-- VALUES (9, 'Milton', 'Bradakin', 'mkinz@manowar.net', '2022-12-05', 2, 4, 0, 1);
-- INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, CreateDateTime, PrimaryPositionId, SecondaryPositionId, PronounId, [Admin]) 
-- VALUES (10, 'Joe', 'Flips', 'flipin@cinomon.com', '2022-12-05', 8, 6, 0, 1);
-- INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, CreateDateTime, PrimaryPositionId, SecondaryPositionId, PronounId, [Admin]) 
-- VALUES (11, 'Melissa', 'Zipps', 'mzip@hotmail.com', '2022-12-05', 2, 8, 0, 2);
-- INSERT INTO [UserProfile] (Id, FirstName, LastName, Email, CreateDateTime, PrimaryPositionId, SecondaryPositionId, PronounId, [Admin]) 
-- VALUES (12, 'Laura', 'Karp', 'lthekarp@hotmail.com', '2022-12-05', 8, 4, 0, 2);
-- SET IDENTITY_INSERT [UserProfile] OFF

-- SET IDENTITY_INSERT [Game] ON
-- INSERT INTO Game (Id, Title, [Location], [Address], [Description], GameDate, SignupDate, MaxPlayers, PrimaryHostId, SecondaryHostId)
-- VALUES (1, 'Griffith Park Soccer Field', '3343 Riverside Dr, Los Angeles, CA 90027', '2022-12-30 11:30', '2022-12-5 21:00', 11, 1);
-- INSERT INTO Game (Id, Title, [Location], [Address], [Description], GameDate, SignupDate, MaxPlayers, PrimaryHostId, SecondaryHostId)
-- VALUES (2, 'McAlister Field', '3000 S Hoover St, Los Angeles, CA 90089', '2023-1-08 18:00', '2023-1-15 9:00', 6, 1);
-- SET IDENTITY_INSERT [Game] OFF
