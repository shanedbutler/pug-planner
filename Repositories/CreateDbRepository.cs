namespace PUGPlanner_FS.Repositories
{
    public class CreateDbRepository : BaseRepository
    {
        public CreateDbRepository(IConfiguration configuration) : base(configuration) { }

        /// <summary>
        /// Connect and create application database
        /// </summary>
        public void CreateDb()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        IF db_Id('PugPlanner') IS NULL
                          CREATE DATABASE [PugPlanner]
                        GO

                        USE [PugPlanner]
                        GO

                        -- DROP TABLE IF EXISTS [Game];
                        -- DROP TABLE IF EXISTS [GameRoster];
                        -- DROP TABLE IF EXISTS [UserProfile];
                        -- DROP TABLE IF EXISTS [Position];
                        -- DROP TABLE IF EXISTS [Pronoun];

                        CREATE TABLE [Game] (
                          [Id] int PRIMARY KEY IDENTITY NOT NULL,
                          [Title] nvarchar(50) NOT NULL,
                          [Location] nvarchar(50) NOT NULL,
                          [Address] nvarchar(255) NOT NULL,
                          [Description] nvarchar(1500) NOT NULL,
                          [GameDate] datetime2 NOT NULL,
                          [SignupDate] datetime2 NOT NULL,
                          [MaxPlayers] int NOT NULL,
                          [Recurring] bit NOT NULL,
                          [PrimaryHostId] int NOT NULL,
                          [SecondaryHostId] int
                        )
                        GO

                        CREATE TABLE [GameRoster] (
                          [Id] int PRIMARY KEY IDENTITY NOT NULL,
                          [GameId] int NOT NULL,
                          [UserProfileId] int NOT NULL
                        )
                        GO

                        CREATE TABLE [UserProfile] (
                          [Id] int PRIMARY KEY IDENTITY NOT NULL,
                          [FirebaseUserId] nvarchar(28) NOT NULL,
                          [FirstName] nvarchar(50) NOT NULL,
                          [LastName] nvarchar(50) NOT NULL,
                          [Email] nvarchar(50) NOT NULL,
                          [Phone] nvarchar(20) NOT NULL,
                          [Club] nvarchar(50),
                          [Admin] bit NOT NULL,
                          [CreateDateTime] datetime2 NOT NULL,
                          [PrimaryPositionId] int NOT NULL,
                          [SecondaryPositionId] int NOT NULL,
                          [PronounId] int,
                          [EmergencyName] nvarchar(50) NOT NULL,
                          [EmergencyPhone] nvarchar(20) NOT NULL,
                          [Active] bit NOT NULL
                        )
                        GO

                        CREATE TABLE [Position] (
                            [Id] int PRIMARY KEY IDENTITY NOT NULL,
                            [Name] nvarchar(50) NOT NULL,
                            [FullName] nvarchar(50) NOT NULL
                        )
                        GO

                        CREATE TABLE [Pronoun] (
                            [Id] int PRIMARY KEY IDENTITY NOT NULL,
                            [Name] nvarchar(50) NOT NULL
                        )
                        GO

                        ALTER TABLE [GameRoster] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
                        GO

                        ALTER TABLE [GameRoster] ADD FOREIGN KEY ([GameId]) REFERENCES [Game] ([Id])
                        GO

                        ALTER TABLE [Game] ADD FOREIGN KEY ([PrimaryHostId]) REFERENCES [UserProfile] ([Id])
                        GO

                        ALTER TABLE [Game] ADD FOREIGN KEY ([SecondaryHostId]) REFERENCES [UserProfile] ([Id])
                        GO

                        ALTER TABLE [UserProfile] ADD FOREIGN KEY ([PrimaryPositionId]) REFERENCES [Position] ([Id])
                        GO

                        ALTER TABLE [UserProfile] ADD FOREIGN KEY ([SecondaryPositionId]) REFERENCES [Position] ([Id])
                        GO

                        ALTER TABLE [UserProfile] ADD FOREIGN KEY ([PronounId]) REFERENCES [Pronoun] ([Id])
                        GO

                        ALTER TABLE [UserProfile] ADD CONSTRAINT UQ_FirebaseUserId UNIQUE([FirebaseUserId])
                        GO";

                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
        }

        /// <summary>
        /// Seed application database for soccer use
        /// </summary>
        public void SeedSoccerDb()
        {
            using (var conn = Connection)
            {
                conn.Open();
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
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
                            SET IDENTITY_INSERT [Game] OFF";

                        cmd.ExecuteNonQuery();
                        conn.Close();
                    }
                }
            }
        }
    }
}
