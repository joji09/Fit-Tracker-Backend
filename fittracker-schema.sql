CREATE TABLE Users (
  UserId SERIAL PRIMARY KEY,
  Username TEXT UNIQUE NOT NULL,
  Password TEXT NOT NULL,
  First_Name TEXT NOT NULL,
  Last_Name TEXT NOT NULL,
  Email TEXT UNIQUE NOT NULL
);

CREATE TABLE Workouts (
  WorkoutId SERIAL PRIMARY KEY,
  ExerciseId INT,
  Workout_Name TEXT NOT NULL,
  BodyPart TEXT NOT NULL
);

CREATE TABLE Playlists (
  PlaylistId SERIAL PRIMARY KEY,
  UserId INT REFERENCES Users(UserId),
  PlaylistName TEXT,
  DayOfWeek TEXT
);

CREATE TABLE PlaylistWorkouts (
  PlaylistWorkoutId SERIAL PRIMARY KEY,
  PlaylistId INT REFERENCES Playlists(PlaylistId),
  WorkoutId INT REFERENCES Workouts(WorkoutId),
  Sets INT,
  Reps INT,
  Weight INT
);