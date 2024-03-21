const db = require("../db");

class Playlist {

    static async createPlaylist(UserId, PlaylistName, dayOfWeek){
        // Creates a playlist and assigns it days of the week.
        try {
            const result = await db.query(
                `INSERT INTO Playlists (UserId, PlaylistName, DayOfWeek)
                VALUES ($1, $2, $3) RETURNING PlaylistId`,
                [UserId, PlaylistName, dayOfWeek]
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

            console.log(playlist.rows[0].playlistid);
            const playlistId = playlist.rows[0].playlistid;

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