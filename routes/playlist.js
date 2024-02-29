const express = require("express");
const router = express.Router();
const Playlist = require("../models/playlist");

// Add exercise to user's playlist
router.post("/playlist/add", async (req, res, next) => {
    const { userId, workoutId, playlistName, sets, reps, weight} = req.body;
    try {
        const mappingId = await Playlist.addExerciseToPlaylist(userId, workoutId, playlistName, sets, reps, weight);
        res.json({ mappingId });
    } catch (error) {
        next(error);
    }
});

// Get user's playlist
router.get("/playlist", async (req, res, next) => {
    const { userId } = req.query;
    try {
        const userPlaylist = await Playlist.getUserPlaylist(userId);
        res.json({ userPlaylist });
    } catch (error){
        next(error);
    }
});

// Remove exercise from user's playlist
router.delete("/playlist/remove/:mappingId", async (req, res, next) => {
    const { mappingId } = req.params;
    try {
        await Playlist.removeExerciseFromPlaylist(mappingId);
        res.json({ message: "Exercise remove from playlist" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;