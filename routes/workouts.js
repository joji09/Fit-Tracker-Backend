const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const Workout = require("../models/workouts");
const WorkoutDb = require("../models/workoutQueries");
const { ensureLoggedIn } = require("../middleware/auth");

const router = new express.Router();

// fetches bodyPartList
// router.get("/bodyPartList", async function (req, res, next) {
    
//     try {
//         const bodyParts = await Workout.fetchBodyPartList();
//         return res.json({ bodyParts });
//     } catch (error){
//         return next(error);
//     }
// });

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
        const { id } = req.params
        const exerciseIdx = await Workout.fetchExercise(id);
        return res.json({ exerciseIdx });
    } catch (error){
        return next(error);
    }
});


module.exports = router;