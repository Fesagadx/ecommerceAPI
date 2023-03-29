const request = require('supertest');
const app = require('../app');

let categoryId;
let token;

beforeAll(async()=>{
  const credentials = {
    email:"felipe@gmail.com",
    password:"12345678"
  }
  res = await request(app).post('/api/v1/users/login').send(credentials)
  token = res.body.token
})

test("POST / new category ", async () => {
  const newCategory = {
    name: "tv"
  }
  const res = await request(app)
    .post("/api/v1/categories")
    .set('Authorization', `Bearer ${token}`)
    .send(newCategory)
  categoryId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body.name).toBe(newCategory.name)
})

test("GET / all categories", async () => {
  const res = await request(app)
    .get('/api/v1/categories')
    .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("GET /api/v1/categories/:id", async () => {
  const res = await request(app)
  .get(`/api/v1/categories/${categoryId}`)
  .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body.name).toBe("tv")
})

test('DELETE /api/v1/categories:id', async () => {
  const res = await request(app)
  .delete(`/api/v1/categories/${categoryId}`)
  .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
})