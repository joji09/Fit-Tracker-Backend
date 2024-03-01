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
CREATE TABLE Cached_Workouts (
    WorkoutId INT PRIMARY KEY,
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
    Cached_WorkoutId INT REFERENCES Cached_WorkoutsWorkouts(WorkoutId),
    PlaylistName TEXT,
    DayOfWeek TEXT,
    Sets INT,
    Reps INT,
    Weight INT
);