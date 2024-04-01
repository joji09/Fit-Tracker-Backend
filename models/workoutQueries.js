const db = require("../db");

class WorkoutQueries {

    // Saves Workout ExerciseId, Exercise's Name and BodyPart from the API to the Workout table.
    static async SaveWorkout(exerciseId, workoutName, bodyPart) {
        try {
            // Check if workout with the given ExerciseId already exists
        const existingWorkout = await db.query(
            `SELECT WorkoutId FROM Workouts WHERE ExerciseId = $1`,
            [exerciseId]
        );
        

        if (existingWorkout.rows.length > 0) {
            console.log(`Workout with ExerciseId ${exerciseId} already exists.`);
            return existingWorkout.rows[0].workoutid;
        } else {
            // Insert the workout information into the Workout table
            const newWorkout = await db.query(
                `INSERT INTO Workouts (ExerciseId, Workout_Name, BodyPart) 
                VALUES ($1, $2, $3)
                RETURNING WorkoutId`,
                [exerciseId, workoutName, bodyPart]
            );
            
            // Returns the ID of the new workout
            console.log(newWorkout.rows[0].workoutid);
            return newWorkout.rows[0].workoutid;
        }

        } catch (error) {
            console.error("Error saving workout", error);
            throw new Error("Unable to save workout to Workouts");
        }
    }

    // Fetches ExerciseId using the WorkoutId from the Workout Table
    static async getExerciseId(workoutId) {
        try {
            const exerciseIdResult = await db.query(
                `SELECT ExerciseId FROM Workouts WHERE WorkoutId = $1`, [workoutId]
            );
            return exerciseIdResult.rows[0].exerciseid;
        } catch (error) {
            console.error("Can't find that workout", error);
            throw new Error ("Unable to find that exerciseId");
        }
    }
}

module.exports = WorkoutQueries;