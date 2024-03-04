CREATE TABLE Users (
  UserId SERIAL PRIMARY KEY,
  Username TEXT UNIQUE NOT NULL,
  Password TEXT NOT NULL,
  First_Name TEXT NOT NULL,
  Last_Name TEXT NOT NULL,
  Email TEXT UNIQUE NOT NULL
);

-- Creates Cached_Workouts table
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
  UserId INT,
  Cached_WorkoutId INT,
  Sets INT,
  Reps INT,
  Weight INT,
  FOREIGN KEY (UserId) REFERENCES Users (UserId),
  FOREIGN KEY (Cached_WorkoutId) REFERENCES Cached_Workouts (WorkoutId)
);

CREATE TABLE UserPlaylist (
  -- UserPlaylistId INT PRIMARY KEY,
  UserId INT,
  MappingId SERIAL PRIMARY KEY,
  PlaylistName TEXT,
  DayOfWeek TEXT,
  FOREIGN KEY (UserId) REFERENCES Users (UserId),
  FOREIGN KEY (MappingId) REFERENCES UserWorkoutMapping (MappingId)
);

-- ALTER TABLE UserPlaylist ADD FOREIGN KEY (UserId) REFERENCES Users (UserId);

-- ALTER TABLE UserWorkoutMapping ADD FOREIGN KEY (UserId) REFERENCES Users (UserId);

-- ALTER TABLE UserWorkoutMapping ADD FOREIGN KEY (MappingId) REFERENCES UserPlaylist (MappingId);

-- ALTER TABLE UserWorkoutMapping ADD FOREIGN KEY (Cached_WorkoutId) REFERENCES Cached_Workouts (WorkoutId);