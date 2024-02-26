const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const Workout = require("../models/workouts");
const { ensureLoggedIn } = require("../middleware/auth");

const router = new express.Router();


router.get("/bodyPartList", async function (req, res, next) {
    
    try {
        const bodyParts = await Workout.fetchBodyPartList();
        return res.json({ bodyParts });
    } catch (error){
        return next(error);
    }
});

// testing body part request
router.get("/exercises/:bodyPart", async function (req, res, next){
    try {
        const { bodyPart } = req.params;
        const exercises = await Workout.fetchWorkoutsByBodyPart(bodyPart);
        return res.json({ exercises });
    } catch (error) {
        return next(error);
    }
});

//  TODO: bodyPart & Equipment filter to be added
router.get("/exercises", ensureLoggedIn, async function (req, res, next){
    try {
        const exercises = await Workout.fetchWorkouts();
        return res.json({ exercises });
    } catch (error) {
        return next(error);
    }
});

router.get("/exercise/:id", ensureLoggedIn, async function (req, res, next){
    try{
        const { id } = req.params
        const exerciseIdx = await Workout.fetchExercise(id);
        return res.json({ exerciseIdx });
    } catch (error){
        return next(error);
    }
})


module.exports = router;