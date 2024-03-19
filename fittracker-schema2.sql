CREATE TABLE Users (
  UserId SERIAL PRIMARY KEY,
  Username TEXT UNIQUE NOT NULL,
  Password TEXT NOT NULL,
  First_Name TEXT NOT NULL,
  Last_Name TEXT NOT NULL,
  Email TEXT UNIQUE NOT NULL
);

CREATE TABLE Cached_Workouts (
  WorkoutId SERIAL PRIMARY KEY,
  ExerciseId INT,
  Workout_Name TEXT NOT NULL,
  BodyPart TEXT NOT NULL,
  GifUrl TEXT,
  Muscle_Target TEXT,
  Instructions TEXT[],
  Difficulty TEXT,
  Duration INTERVAL
);

CREATE TABLE UserWorkoutMapping (
  MappingId SERIAL PRIMARY KEY,
  UserId INT REFERENCES Users(UserId),
  Cached_WorkoutId INT REFERENCES Cached_Workouts(WorkoutId),
  Sets INT,
  Reps INT,
  Weight INT
);

CREATE TABLE UserPlaylist (
  PlaylistId SERIAL PRIMARY KEY,
  UserId INT REFERENCES Users(UserId),
  PlaylistName TEXT,
  DayOfWeek TEXT
);

CREATE TABLE UserPlaylistMapping (
  UserPlaylistId INT REFERENCES UserPlaylist(PlaylistId),
  MappingId INT REFERENCES UserWorkoutMapping(MappingId),
  PRIMARY KEY (UserPlaylistId, MappingId)
);