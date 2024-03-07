const db = require("../db");

class WorkoutQueries {
    static async SaveWorkout(workout) {
        try {
            const { exerciseId, name, bodyPart, gifUrl, muscleTarget, difficulty} = workout;
            const result = await db.query(
                `INSERT INTO Cached_Workouts (ExerciseId, Workout_Name, BodyPart, GifUrl, Muscle_Target, Difficulty)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING WorkoutId`,
                [exerciseId, name, bodyPart, gifUrl, muscleTarget, difficulty]
            );
            return result.rows[0].WorkoutId;
        } catch (error) {
            console.error("Error saving workout to database", error.message);
            throw new Error("Unable to save workout");
        }
    }
}