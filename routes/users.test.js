const request = require('supertest');
const app = require('../app');
const db = require('../db');

// Clear the database before each test
beforeEach(async () => {
  await db.query('DELETE FROM Users');
});

describe('User Route Tests', () => {
  // Test user registration
  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser',
          password: 'testpassword',
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('username', 'testuser');
    });
  });

  // Test fetching user data
  describe('GET /api/users/:username', () => {
    it('should fetch user data by username', async () => {
      // First, register a user
      await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser',
          password: 'testpassword',
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com'
        });

      const res = await request(app)
        .get('/api/users/testuser');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('username', 'testuser');
    });
  });

  // Test updating user data
  describe('PATCH /api/users/:username', () => {
    it('should update user data', async () => {
      // First, register a user
      await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser',
          password: 'testpassword',
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com'
        });

      const updatedUserData = {
        firstName: 'Jane',
        lastName: 'Doe'
      };

      const res = await request(app)
        .patch('/api/users/testuser')
        .send(updatedUserData);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('firstName', 'Jane');
      expect(res.body.user).toHaveProperty('lastName', 'Doe');
    });
  });
});