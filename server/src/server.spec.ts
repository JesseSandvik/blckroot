import {describe, expect, test} from '@jest/globals';
const request = require("supertest");
import app from "./app";

describe('sum module', () => {
  test('renders the app route', async () => {
    const response = await request(app).get("/");
    expect(response).toBeDefined();
  });
});