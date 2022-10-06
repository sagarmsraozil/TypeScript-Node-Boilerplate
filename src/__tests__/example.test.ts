// import request from 'supertest';
import { describe, it, expect } from '@jest/globals';
// import express, { Request, Response } from 'express';

// Core modules
import assert from 'assert';

// Local modules
import './hooks';

// Create a server
// const app = express();

// const server = request(app);

describe('Products', () => {
  it('Demo testing', () => {
    expect(true).toBe(true);
  });

  it('Test assertion', () => {
    const isTrue = true;

    assert.equal(isTrue, true, 'Debug required!');
  });
});
