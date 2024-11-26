import User from '#models/user'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User create', (group) => {
  var accessToken: AccessToken
  group.each.setup(() => testUtils.db().withGlobalTransaction())


  test('when request is not authenticate, should return an error', async ({ client }) => {
    const response = await client.post("/api/v1/user")

    response.assertStatus(401)
    response.assertBody({errors: [{message: "Unauthorized access"}]})
  })

  test('when invalid name is sent, should return an error with 400 status', async ({ client }) => {
    const user = await User.create({fullName: "Fernando Coelho Saraiva", email: "fernando@gmail.com", password: "password123"})
    accessToken = await User.accessTokens.create(user, undefined, { expiresIn: '30 days' })
    const invalidBody = { email: "valid@gmail.com", password: "validPassword", fullName: "invalid"}

    const response = await client.post("/api/v1/user")
      .header('Authorization', `Bearer ${accessToken.toJSON().token}`)
      .json(invalidBody)

    response.assertStatus(400)
    response.assertBody({status: "error", errors: ["The fullName field must have at least 10 characters"]})
  })

  test('when invalid email is sent, should return an error with 400 status', async ({ client }) => {
    const user = await User.create({fullName: "Fernando Coelho Saraiva", email: "fernando@gmail.com", password: "password123"})
    accessToken = await User.accessTokens.create(user, undefined, { expiresIn: '30 days' })
    const invalidBody = { email: "valid", password: "validPassword", fullName: "user eith valid name"}

    const response = await client.post("/api/v1/user")
      .header('Authorization', `Bearer ${accessToken.toJSON().token}`)
      .json(invalidBody)

    response.assertStatus(400)
    response.assertBody({status: "error", errors: ["The email field must be a valid email address"]})
  })

  test('when email already registered, should return an error', async ({ client }) => {
    const user = await User.create({fullName: "Fernando Coelho Saraiva", email: "fernando@gmail.com", password: "password123"})
    accessToken = await User.accessTokens.create(user, undefined, { expiresIn: '30 days' })
    const invalidBody = { email: "fernando@gmail.com", password: "validPassword", fullName: "user eith valid name"}

    const response = await client.post("/api/v1/user")
      .header('Authorization', `Bearer ${accessToken.toJSON().token}`)
      .json(invalidBody)

    response.assertStatus(400)
    response.assertBody({status: "error", errors: ["The email has already been taken"]})
  })

  test('when user is created, should return success', async ({ client }) => {
    const user = await User.create({fullName: "Fernando Coelho Saraiva", email: "fernando@gmail.com", password: "password123"})
    accessToken = await User.accessTokens.create(user, undefined, { expiresIn: '30 days' })
    const invalidBody = { email: "valid@gmail.com", password: "validPassword", fullName: "user eith valid name"}

    const response = await client.post("/api/v1/user")
      .header('Authorization', `Bearer ${accessToken.toJSON().token}`)
      .json(invalidBody)

    response.assertStatus(200)
  })
})