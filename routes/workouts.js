const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const Workout = require("../models/workouts");
const WorkoutDb = require("../models/workoutQueries");
const { ensureLoggedIn } = require("../middleware/auth");

const router = new express.Router();

// fetches exercise based on bodyPart
router.get("/exercises/:bodyPart", async function (req, res, next){
    try {
        const { bodyPart } = req.params;
        const exercises = await Workout.fetchWorkoutsByBodyPart(bodyPart);
        return res.json({ exercises });
    } catch (error) {
        return next(error);
    }
});

// fetches exercises by their id in the API
router.get("/exercise/:id", ensureLoggedIn, async function (req, res, next){
    try{
        console.log("fetching exercise");
        const { id } = req.params;
        console.log(id);
        const exerciseIdx = await Workout.fetchExercise(id);
        console.log(exerciseIdx);
        return res.json({ exerciseIdx });
    } catch (error){
        return next(error);
    }
});

//fetches exerciseId by their WorkoutId in the Workouts Table
router.get("/exercise/find/:workoutId", async function(req, res, next){
    try {
        const { workoutId } = req.params;
        console.log(`finding exerciseId for workoutId: ${workoutId}`);
        const exerciseId = await WorkoutDb.getExerciseId(workoutId);
        return res.json({ exerciseId });
    } catch (error){
        return next(error);
    }
});


module.exports = router;