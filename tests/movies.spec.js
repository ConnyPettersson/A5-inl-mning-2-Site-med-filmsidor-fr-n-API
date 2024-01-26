import { expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import { loadMovies } from '../src/movies.js';

test('All movie pages show correct title', async () => {
  const movies = await loadMovies();

  for (const movie of movies) {
    const response = await request(app)
      .get(`/movies/${movie.id}`)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200);

    expect(response.text).toMatch(movie.title);
  }
});
