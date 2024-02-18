-- Create Users table
CREATE TABLE Users (
    UserId SERIAL PRIMARY KEY,
    Username TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL,
    First_Name TEXT NOT NULL,
    Last_Name TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE
);

-- Create Workouts table
CREATE TABLE Workouts (
    WorkoutId SERIAL PRIMARY KEY,
    Workout_Name TEXT NOT NULL,
    BodyPart TEXT NOT NULL,
    GifUrl TEXT NOT NULL,
    Muscle_Target TEXT NOT NULL,
    Instructions TEXT[] NOT NULL,
    Difficulty TEXT,
    Duration INTERVAL
);

-- Create UserWorkoutMapping table for playlists
CREATE TABLE UserWorkoutMapping (
    MappingId SERIAL PRIMARY KEY,
    UserId INT REFERENCES Users(UserId),
    WorkoutId INT REFERENCES Workouts(WorkoutId),
    PlaylistName TEXT,
    Sets INT,
    Reps INT,
    Weight INT
);