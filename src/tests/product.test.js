const request = require('supertest');
const app = require('../app');
const ProductImg = require('../models/ProductImg');
require('../models')

let productId;
let token;

beforeAll(async () => {
  const credentials = {
    email: "felipe@gmail.com",
    password: "12345678"
  }
  res = await request(app).post('/api/v1/users/login').send(credentials)
  token = res.body.token
})

test("Post / should create a new category and return code 201", async () => {
  const newProduct = {
    "title": "TELEVISOR",
    "description": "SAM",
    "price": 700
  }
  const res = await request(app)
    .post("/api/v1/products")
    .set('Authorization', `Bearer ${token}`)
    .send(newProduct)
  productId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body.title).toBe(newProduct.title)
})

test("GET / return code for the user should be 200", async () => {
  const res = await request(app)
    .get('/api/v1/products')
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("GET /api/v1/products/:id return 200 code", async () => {
  const res = await request(app)
    .get(`/api/v1/products/${productId}`)
  expect(res.status).toBe(200)
  expect(res.body.title).toBe("tv")
})

test('UPDATE /api/v1/products/:id ', async () => {
  const body = {
    title: "tv"
  }
  const res = await request(app)
    .put(`/api/v1/products/${productId}`)
    .set('Authorization', `Bearer ${token}`)
    .send(body);
  expect(res.status).toBe(200)
  expect(res.body.title).toBe(body.title)
})

test('DELETE /api/v1/products:id ', async () => {
  const res = await request(app)
    .delete(`/api/v1/products/${productId}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
})