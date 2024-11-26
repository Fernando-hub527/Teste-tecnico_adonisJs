import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User login', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('when inavalid email is sent, should return an error with 400 status', async ({ client }) => {
    const invalidBody = { email: "invalid", password: "invalid" }

    const response = await client.post("/api/v1/login").json(invalidBody)

    response.assertStatus(400)
    response.assertBody({status: "error", errors: ["The email field must be a valid email address"]})
  })

  test('when user is not found, should return an error with 401 status', async ({ client }) => {
    const invalidBody = { email: "valid@gmail.com", password: "password123123" }

    const response = await client.post("/api/v1/login").json(invalidBody)

    response.assertStatus(401)
    response.assertBody({status: "error", errors: ["Invalid credentials"]})
  })

  test('when inavalid password is sent, should return an error', async ({ client }) => {
    await User.create({fullName: "Fernando Coelho Saraiva", email: "valid@gmail.com", password: "password321321"})
    const invalidBody = { email: "valid2@gmail.com", password: "password123123" }

    const response = await client.post("/api/v1/login").json(invalidBody)

    response.assertStatus(401)
    response.assertBody({status: "error", errors: ["Invalid credentials"]})
  })

  test('when valid password is sent, should return an access_token', async ({ client }) => {
    await User.create({fullName: "Fernando Coelho Saraiva", email: "valid@gmail.com", password: "password321321"})
    const invalidBody = { email: "valid@gmail.com", password: "password321321" }

    const response = await client.post("/api/v1/login").json(invalidBody)

    response.assertStatus(200)
  })
})