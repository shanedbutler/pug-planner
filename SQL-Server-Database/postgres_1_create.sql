CREATE TABLE IF NOT EXISTS
  positions (
    id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    full_name TEXT NOT NULL
  );

CREATE TABLE IF NOT EXISTS
  pronouns (
    id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
  );

CREATE TABLE IF NOT EXISTS
  profiles (
    id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    full_name TEXT GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    club TEXT,
    "admin" BOOLEAN NOT NULL,
    create_date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    primary_position_id INTEGER REFERENCES public.positions ON DELETE CASCADE NOT NULL,
    secondary_position_id INTEGER REFERENCES public.positions ON DELETE CASCADE NOT NULL,
    pronoun_id INTEGER REFERENCES public.pronouns ON DELETE CASCADE,
    emergency_name TEXT NOT NULL,
    emergency_phone TEXT NOT NULL,
    active BOOLEAN NOT NULL
  );

CREATE TABLE IF NOT EXISTS
  games (
    id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    game_date TIMESTAMP WITH TIME ZONE NOT NULL,
    signup_date TIMESTAMP WITH TIME ZONE NOT NULL,
    max_players INTEGER NOT NULL,
    recurring BOOLEAN NOT NULL,
    primary_host_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
    secondary_host_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL
  );

CREATE TABLE IF NOT EXISTS
  game_roster (
    id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    game_id INTEGER REFERENCES public.games ON DELETE CASCADE NOT NULL,
    user_profile_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL
  );