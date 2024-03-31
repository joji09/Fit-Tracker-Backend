const db = require("../db");

class WorkoutQueries {
    static async SaveWorkout(exerciseId, workoutName, bodyPart) {
        try {
            // const { exerciseId, workoutName, bodyPart } = workoutInfo;

            // Check if workout with the given ExerciseId already exists
        const existingWorkout = await db.query(
            `SELECT WorkoutId FROM Workouts WHERE ExerciseId = $1`,
            [exerciseId]
        );
        
        let result;

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
            console.log(`newWorkout: ${newWorkout}`);
            console.log(newWorkout.rows[0].workoutId);
            return newWorkout.rows[0].workoutId;
        }

        } catch (error) {
            console.error("Error saving workout", error);
            throw new Error("Unable to save workout to Workouts");
        }
    }
}

module.exports = WorkoutQueries;