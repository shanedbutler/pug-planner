-- ALTER DATABASE [PugPlanner] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
-- DROP DATABASE [PugPlanner];

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