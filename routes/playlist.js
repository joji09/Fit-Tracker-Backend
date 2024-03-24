const jsonschema = require("jsonschema");

const express = require("express");
const router = express.Router();
const Playlist = require("../models/playlist");
const newPlaylist = require("../schemas/newPlaylist.json");
const workoutQueries = require("../models/workoutQueries");



// Add exercise to user's playlist
router.post("/playlist/add", async (req, res, next) => {
    const { userId, exerciseId, workoutName, bodyPart, playlistId, playlistName } = req.body;
    try {
        console.log(`UserId: ${userId}`);
        console.log(`Exercise: ${exerciseId}`);
        console.log(`Workout Name: ${workoutName}`);
        console.log(`Playlist Name: ${playlistName}`);
        const workoutId = await workoutQueries.SaveWorkout(exerciseId, workoutName, bodyPart);
        console.log(workoutId);
        const mappingId = await Playlist.addExerciseToPlaylist(userId, playlistName, workoutId, playlistId);
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


// Creates a new playlist
router.post("/playlist/create", async (req, res, next) => {
    const { userId, playlistName, days } = req.body;

    try {
        console.log(req.body);
        // console.log(`UserId: ${userId}`);
        // console.log(`playlistName: ${playlistName}`);
        // console.log(`dayOfWeek: ${days}`);
        await Playlist.createPlaylist(userId, playlistName, days);
        res.json({ message: "Playlist created successfully" });
    } catch (error) {
        next(error);
    }
});

// Fetches playlistId
router.get("/playlist/:playlistId", async (req, res, next) => {
    const { playlistId } = req.params;
    try {
        const playlistDetails = await Playlist.getPlaylistDetails(playlistId);
        res.json({ playlistDetails });
    } catch (error) {
        next(error);
    }
});

// Fetches playlist Workouts
router.get("/playlist/workouts/:playlistId", async (req, res, next) => {
    const { playlistId } = req.params;
    try {
        const PlaylistWorkouts = await Playlist.getPlaylistWorkouts(playlistId);
        res.json({ PlaylistWorkouts });
    } catch (error) {
        next(error);
    }
});

// deletes playlist information
router.delete("/playlist/workouts/:playlistId/:playlistWorkoutId", async (req, res, next) => {
    const { playlistId, playlistWorkoutId } = req.params;
    try {
        console.log(`Route PlaylistWorkoutId: ${playlistWorkoutId}`);
        await Playlist.removeWorkoutFromPlaylist(playlistId, playlistWorkoutId);
        res.json({ message: "Playlist removed" });
    } catch (error) {
        next(error);
    }
})

// Remove exercise from user's playlist
router.delete("/playlist/remove/:playlistId", async (req, res, next) => {
    const {playlistId } = req.params;
    try {
        await Playlist.removePlaylist(playlistId);
        res.json({ message: "Playlist deleted successfully "});
    } catch (error) {
        next(error);
    }
})

module.exports = router;