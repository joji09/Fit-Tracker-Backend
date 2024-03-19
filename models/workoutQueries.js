const db = require("../db");

class WorkoutQueries {
    static async SaveWorkout(exerciseId, workoutName, bodyPart) {
        try {
            // const { exerciseId, workoutName, bodyPart } = workoutInfo;

            // Check if workout with the given ExerciseId already exists
        const existingWorkout = await db.query(
            `SELECT COUNT(*) FROM Workouts WHERE ExerciseId = $1`,
            [exerciseId]
        );

        if (existingWorkout.rows[0].count > 0) {
            console.log(`Workout with ExerciseId ${exerciseId} already exists.`);
            return;
        }
    
            // Insert the workout information into the Cached_Workouts table
            const result = await db.query(
                `INSERT INTO Workouts (ExerciseId, Workout_Name, BodyPart) 
                VALUES ($1, $2, $3)
                RETURNING WorkoutId`,
                [exerciseId, workoutName, bodyPart]
            );

            console.log(`Workout with ExerciseId ${exerciseId} saved successfully`);
    
            // Return the ID of the newly inserted workout
            return result.rows[0].WorkoutId;
        } catch (error) {
            console.error("Error saving workout", error);
            throw new Error("Unable to save workout to Cached_Workouts");
        }
    }
}

module.exports = WorkoutQueries;