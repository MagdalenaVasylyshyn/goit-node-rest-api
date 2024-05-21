import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';

import 'dotenv/config';

describe('login', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect(process.env.DB_URI);
  });

  it('responce has a status code 200', async () => {
    const res = await supertest(app).post('/users/login').send({
      email: 'user4@mail.com',
      password: 'user4@mail.com',
    });

    expect(res.statusCode).toBe(200);
  });

  it('responce has a token', async () => {
    const res = await supertest(app).post('/users/login').send({
      email: 'user4@mail.com',
      password: 'user4@mail.com',
    });

    expect(res.body.token).toBeDefined();
  });

  it('responce has a user object with email and subscription fields type string', async () => {
    const res = await supertest(app).post('/users/login').send({
      email: 'user4@mail.com',
      password: 'user4@mail.com',
    });

    expect(typeof res.body.user.email).toBe('string');
    expect(typeof res.body.user.subscription).toBe('string');
  });
});