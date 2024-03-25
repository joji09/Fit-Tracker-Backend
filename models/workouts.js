const db = require("../db");
const axios = require("axios");
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../expressError");

class Workout {

    static API_URL = "https://exercisedb.p.rapidapi.com/exercises";

    constructor(id, name, bodyPart, equipment, gifUrl, instructions){
        this.id = id;
        this.name = name;
        this.bodyPart = bodyPart;
        this.equipment = equipment;
        this.gifUrl = gifUrl;
        this.instructions = instructions;
    }

    static async fetchWorkoutsByBodyPart(bodyPart){
        try {
            const response = await axios.get(`${this.API_URL}/bodyPart/${bodyPart}`, {
                headers: {
                    "X-RapidAPI-Key": "5bc5d4c469msh09809c71ce2f46ap16e742jsneafbec144066"
                }
            });
            const workoutDataRes = response.data;

            const workouts = workoutDataRes.map(workoutData => {
                return new Workout (
                workoutData.id,
                workoutData.name,
                workoutData.bodyPart,
                workoutData.equipment,
                workoutData.gifUrl,
                workoutData.instructions
                );
            });
            return workouts;
        } catch (error) {
            console.error("Error fetching workouts from API", error.message);
        }
    }

    static async fetchWorkouts(){
        try {
            const response = await axios.get(`${this.API_URL}`, {
                headers: {
                    "X-RapidAPI-Key": "5bc5d4c469msh09809c71ce2f46ap16e742jsneafbec144066"
                }
            });
            const workoutDataRes = response.data;

            const workouts = workoutDataRes.map(workoutData => {
                return new Workout (
                workoutData.id,
                workoutData.name,
                workoutData.bodyPart,
                workoutData.equipment,
                workoutData.gifUrl,
                workoutData.instructions
                );
            });
            return workouts;
        } catch (error) {
            console.error("Error fetching workouts from API", error.message);
        }
    }

    static async fetchExercise(id){
        try {
            const response = await axios.get(`${this.API_URL}/exercise/${id}`, {
                headers: {
                    "X-RapidAPI-Key": "5bc5d4c469msh09809c71ce2f46ap16e742jsneafbec144066"
                }
            });
            if (response && response.data){
                const { id, name, bodyPart, equipment, gifUrl, instructions } = response.data;
                return { id, name, bodyPart, equipment, gifUrl, instructions };
            } else {
                throw new NotFoundError;
            }
        } catch (error){
            console.error("Error fetching exercise from API", error.message);
        }
    }
}

module.exports = Workout;