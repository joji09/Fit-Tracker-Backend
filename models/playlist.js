const db = require("../db");

class Playlist {

    static async createPlaylist(userId, playlistName, days){
        // Creates a playlist and assigns it days of the week.
        

        // console.log(`model function: ${userId}`);
        // console.log(`model function: ${playlistName}`);
        // console.log(`model function: ${days}`);
        try {
            const result = await db.query(
                `INSERT INTO Playlists (UserId, PlaylistName, DayOfWeek)
                VALUES ($1, $2, $3) RETURNING PlaylistId`,
                [userId, playlistName, days.join(',')]
            );
            return result.rows[0].playlistId;
        } catch (error) {
            console.error("Error creating playlist", error.message);
            throw new Error("Unable to create error");
        }
    }


    static async addExerciseToPlaylist(userId, playlistName, workoutId, playlistId, sets = 0, reps = 0, weight = 0){
        // Add an exercise to a playlist
        try {
            // fetch playlistId

            const playlist = await db.query(
                `SELECT PlaylistId FROM Playlists WHERE UserId = $1 AND PlaylistName = $2`,
                [userId, playlistName]
            );
            
            if(playlist.rows.length === 0){
                throw new Error(`Playlists ${playlistName} does not exist`);
            }

            // const playlistId = playlist.rows[0].playlistid;

            console.log(`playlistId: ${playlistId}`);
            console.log(`workoutId: ${workoutId}`);
            console.log(`playlistName: ${playlistName}`);

            const result = await db.query(
                `INSERT INTO PlaylistWorkouts (PlaylistId, WorkoutId, Sets, Reps, Weight)
                VALUES ($1, $2, $3, $4, $5) RETURNING PlaylistWorkoutId`,
                [playlistId, workoutId, sets, reps, weight]
            );
            return result.rows[0].PlaylistWorkoutId;
        } catch (error) {
            console.error("Error adding workout to playlist", error);
            throw new Error("Unable to add exercise to playlist");
        }
    }

    static async getUserPlaylist(userId){
        // Fetches user's playlist

        try {
            const result = await db.query(
                `SELECT PlaylistId, PlaylistName, DayOfWeek FROM Playlists WHERE UserId = $1`, [userId]
            );
            return result.rows;
        } catch (error) {
            throw new Error("Unable to fetch user playlist");
        }
    }

    static async getPlaylistDetails(playlistId) {
        try {
            console.log(`GetPlaylistDetails of: ${playlistId}`);
            const result = await db.query(
                `SELECT PlaylistId, PlaylistName, DayOfWeek FROM Playlists WHERE PlaylistId = $1 `, [playlistId]
            );
            if (result.rows.length === 0) {
                throw new Error("Playlist not found");
            }
            console.log("Result Row:", JSON.stringify(result.rows[0]));
            return result.rows[0];
        } catch (error) {
            console.error("Error fetching playlist details on the backend", error);
            throw error;
        }
    }

    static async getPlaylistWorkouts(playlistId){
        try {
            console.log(`Getting getPlaylistWorkouts: ${playlistId}`);
            const result = await db.query(
                `SELECT pw.PlaylistWorkoutId, w.Workout_Name, w.BodyPart, pw.Sets, pw.Reps, pw.Weight FROM PlaylistWorkouts pw JOIN Workouts w ON pw.WorkoutId = w.WorkoutId
                WHERE pw.PlaylistId = $1`, [playlistId]
            );
            console.log("Result rows:", JSON.stringify(result.rows));
            return result.rows;
        } catch (error) {
            console.error("Error fetching playlist workouts from the database", error);
            throw error;
        }
    }

    static async removeExerciseFromPlaylist(playlistId) {
        // Removes exercises from the user's playlist

        try {
            await db.query(
                `DELETE FROM PlaylistWorkouts  WHERE PlaylistWorkoutId = $1`, [playlistId]
            );
        } catch (error) {
            throw new Error("Unable to remove exercise from playlist");
        }
    }

    static async removePlaylist(playlistId){
        // Removes a playlist and all its exercises
        try {
            await db.query(
                `DELETE FROM Playlists  WHERE UserId = $1 AND PlaylistName = $2`, [playlistId]
            );
        } catch (error) {
            throw new Error("Unable to remove playlist");
        }
    }
}

module.exports = Playlist;