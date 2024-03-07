const jsonschema = require("jsonschema");

const express = require("express");
const router = express.Router();
const Playlist = require("../models/playlist");
const newPlaylist = require("../schemas/newPlaylist.json");



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

// Creates a new playlist
router.post("/playlist/create", async (req, res, next) => {
    const { userId, playlistName, dayOfWeek } = req.body;

    // const validation = jsonschema.validate(req.body, newPlaylist);
    // if(!validation.valid){
    //     return res.status(400).json({ error: validation.errors });
    // }

    try {
        await Playlist.createPlaylist(userId, playlistName, dayOfWeek);
        res.json({ message: "Playlist created successfully" });
    } catch (error) {
        next(error);
    }
});

router.delete("/playlist/remove/:userId/:playlistName", async (req, res, next) => {
    const { userId, playlistName } = req.params;
    try {
        await Playlist.removePlaylist(userId, playlistName);
        res.json({ message: "Playlist removed" });
    } catch (error) {
        next(error);
    }
})

module.exports = router;