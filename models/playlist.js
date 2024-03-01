const db = require("../db");

class Playlist {

    static async createPlaylist(userId, playlistName, workoutId, dayOfWeek, sets, reps, weight){
        // Creates a playlist and assigns it days of the week.
        try {
            const result = await db.query(
                `INSERT INTO UserWorkoutMapping (userId, Cached_WorkoutId, playlistName, dayOfWeek, Sets, Reps, Weight)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING MappingId`, [userId, workoutId, playlistName, dayOfWeek, sets, reps, weight]
            );
            return result.rows[0].mappingId;
        } catch (error) {
            throw new Error("Unable to create error");
        }
    }

    static async addExerciseToPlaylist(userId, workoutId, playlistName, sets, reps, weight){
        // Add an exercise to user's playlist

        try {
            const result = await db.query(
                `INSERT INTO UserWorkoutMapping (UserId, Cached_WorkoutId, PlaylistName, Sets, Reps, Weight) VALUES ($1, $2, $3, $4, $5, %6)
                RETURNING MappingId`,
                [userId, workoutId, playlistName, sets, reps, weight]
            );

            return result.rows[0];
        } catch (error) {
            throw new Error("Unable to add exercise to playlist");
        }
    }

    static async getUserPlaylist(userId){
        // Fetches user's playlist

        try {
            const result = await db.query(
                `SELECT * FROM UserWorkoutMapping WHERE UserId = $1`, [userId]
            );
            return result.rows;
        } catch (error) {
            throw new Error("Unable to fetch user playlist");
        }
    }

    static async removeExerciseFromPlaylist(mappingId) {
        // Removes exercises from the user's playlist

        try {
            await db.query(
                `DELETE FROM UserWorkoutMapping WHERE MappingId = $1`, [mappingId]
            );
        } catch (error) {
            throw new Error("Unable to remove exercise from playlist");
        }
    }

    static async removePlaylist(userId, playlistName){
        // Removes a playlist and all its exercises
        try {
            await db.query(
                `DELETE FROM UserWorkoutMapping WHERE UserId = $1 AND PlaylistName = $2`, [userId, playlistName]
            );
        } catch (error) {
            throw new Error("Unable to remove playlist");
        }
    }
}

module.exports = Playlist;