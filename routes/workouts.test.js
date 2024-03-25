const request = require('supertest');
const app = require('../app');
const db = require('../db');


beforeEach(async () => {
  await db.query('DELETE FROM Workouts');
});

describe('Workout Route Tests', () => {
  // Test fetching workouts by body part
  describe('GET /api/workouts/exercises/:bodyPart', () => {
    it('should fetch workouts by body part', async () => {
      const res = await request(app)
        .get('/api/workouts/exercises/Chest');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('exercises');
      expect(res.body.exercises).toBeInstanceOf(Array);
    });
  });

  // Test fetching workout by ID
  describe('GET /api/workouts/exercise/:id', () => {
    it('should fetch a workout by ID', async () => {
      // Assuming there's a workout with ID 1 in the database
      const res = await request(app)
        .get('/api/workouts/exercise/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('exerciseIdx');
      expect(res.body.exerciseIdx).toHaveProperty('id', 1); // Assuming the fetched workout has ID 1
    });
  });
});
