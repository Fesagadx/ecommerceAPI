const request = require('supertest');
const app = require('../app');

let userId;
let token;

test("POST / new user", async () => {
  const newUser = {
    firstName: "Felipe",
    lastName: "Super",
    email: "felipe@gmail.com",
    password: "12345678",
    phone: "+1234567890"
  }
  const res = await request(app)
    .post("/api/v1/users")
    .send(newUser)
  userId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body.firstName).toBe(newUser.firstName)
})

test('POST /user/login/ login', async () => {
  const newUser = {
    email: "felipe@gmail.com",
    password: "12345678"
  }

  const res = await request(app)
    .post('/api/v1/users/login')
    .send(newUser)

  expect(res.status).toBe(200)
  expect(res.body.user.email).toBe(newUser.email)
  token = res.body.token
  expect(res.body.token).toBeDefined()
})

test('POST /api/v1/users/login/ invalid credentials', async () => {
  const newUser = {
    email: "felipe@gmail.com",
    password: "12345"
  }

  const res = await request(app)
    .post('/api/v1/users/login')
    .send(newUser)

  expect(res.status).toBe(401)
})

test("GET /  all", async () => {
  const res = await request(app)
    .get('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(2)
})

test("GET /api/v1/users/:id ", async () => {
  const res = await request(app)
    .get(`/api/v1/users/${userId}`)
    .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe("Felipe")
})

test('UPDATE /api/v1/users/:id ', async () => {
  const body = {
    firstName: "Felipe"
  }
  const res = await request(app)
    .put(`/api/v1/users/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    .send(body);
  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(body.firstName)
})

test('DELETE /api/v1/users:id ', async () => {
  const res = await request(app)
    .delete(`/api/v1/users/${userId}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
})