const request = require('supertest');
const app = require('../app');
const db = require('../db');

// Clear the database before each test
beforeEach(async () => {
  await db.query('DELETE FROM Playlists');
  await db.query('DELETE FROM PlaylistWorkouts');
});

describe('Playlist Route Tests', () => {
  // Test creating a new playlist
  describe('POST /api/playlist/create', () => {
    it('should create a new playlist', async () => {
      const res = await request(app)
        .post('/api/playlist/create')
        .send({
          userId: 1,
          playlistName: 'Test Playlist',
          days: ['Monday', 'Wednesday', 'Friday']
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Playlist created successfully');
    });
  });

  // Test adding exercise to playlist
  describe('POST /api/playlist/add', () => {
    it('should add an exercise to the playlist', async () => {
      const res = await request(app)
        .post('/api/playlist/add')
        .send({
          userId: 1,
          exerciseId: 1,
          workoutName: 'Test Workout',
          bodyPart: 'Chest',
          playlistId: 1,
          playlistName: 'Test Playlist'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('mappingId');
    });
  });

  // Test fetching user's playlist
  describe('GET /api/playlist', () => {
    it('should fetch user\'s playlist', async () => {
      const res = await request(app)
        .get('/api/playlist')
        .query({ userId: 1 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('userPlaylist');
      expect(res.body.userPlaylist).toBeInstanceOf(Array);
    });
  });

  // Test fetching playlist details
  describe('GET /api/playlist/:playlistId', () => {
    it('should fetch playlist details', async () => {
      const res = await request(app)
        .get('/api/playlist/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('playlistDetails');
    });
  });

  // Test fetching playlist workouts
  describe('GET /api/playlist/workouts/:playlistId', () => {
    it('should fetch playlist workouts', async () => {
      const res = await request(app)
        .get('/api/playlist/workouts/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('PlaylistWorkouts');
      expect(res.body.PlaylistWorkouts).toBeInstanceOf(Array);
    });
  });

  // Test updating playlist workout
  describe('PATCH /api/playlist/workouts/:playlistId/:playlistWorkoutId', () => {
    it('should update playlist workout', async () => {
      const res = await request(app)
        .patch('/api/playlist/workouts/1/1')
        .send({
          sets: 3,
          reps: 12,
          weight: 50
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Values updated');
    });
  });

  // Test deleting playlist workout
  describe('DELETE /api/playlist/workouts/:playlistId/:playlistWorkoutId', () => {
    it('should delete playlist workout', async () => {
      const res = await request(app)
        .delete('/api/playlist/workouts/1/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Playlist removed');
    });
  });

  // Test removing playlist
  describe('DELETE /api/playlist/remove/:playlistId', () => {
    it('should remove playlist', async () => {
      const res = await request(app)
        .delete('/api/playlist/remove/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Playlist deleted successfully');
    });
  });
});
