import Client from '#models/client'
import Product from '#models/product'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Sale create', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('when request is not authenticate, should return an error', async ({ client }) => {
    const response = await client.post("/api/v1/sale")

    response.assertStatus(401)
    response.assertBody({errors: [{message: "Unauthorized access"}]})
  })

  test('when invalid client id is sent, should return an error', async({client}) => {
    const user = await User.create({fullName: "Fernando Coelho Saraiva", email: "fernando@gmail.com", password: "password123"})
    const accessToken = await User.accessTokens.create(user, undefined, { expiresIn: '30 days' })
    const invalidBody = { client: 55, product: 1, amount: 10}

    const response = await client.post("/api/v1/sale")
      .header('Authorization', `Bearer ${accessToken.toJSON().token}`)
      .json(invalidBody)

    response.assertStatus(400)
    response.assertBody({status: "error", errors: ["The client field must be a string"]})
  })

  test('when invalid product id is sent, should return an error', async({ client }) => {
    const user = await User.create({fullName: "Fernando Coelho Saraiva", email: "fernando@gmail.com", password: "password123"})
    const accessToken = await User.accessTokens.create(user, undefined, { expiresIn: '30 days' })
    const invalidBody = { client: "08740450564", product: "invalid", amount: 10}

    const response = await client.post("/api/v1/sale")
      .header('Authorization', `Bearer ${accessToken.toJSON().token}`)
      .json(invalidBody)

    response.assertStatus(400)
    response.assertBody({status: "error", errors: ["The product field must be a number"]})
  })

  test('when invalid amount is sent, should return an error', async( {client} ) => {
    const user = await User.create({fullName: "Fernando Coelho Saraiva", email: "fernando@gmail.com", password: "password123"})
    const accessToken = await User.accessTokens.create(user, undefined, { expiresIn: '30 days' })
    const invalidBody = { client: "08740450564", product: 10, amount: "invalid"}

    const response = await client.post("/api/v1/sale")
      .header('Authorization', `Bearer ${accessToken.toJSON().token}`)
      .json(invalidBody)

    response.assertStatus(400)
    response.assertBody({status: "error", errors: ["The amount field must be a number"]})
  })

  test('when client is not found, should return an error 404', async({client}) => {
    const user = await User.create({fullName: "Fernando Coelho Saraiva", email: "fernando@gmail.com", password: "password123"})
    const accessToken = await User.accessTokens.create(user, undefined, { expiresIn: '30 days' })
    const product = await Product.create({price: 10.0, name: "product"})

    const invalidBody = { client: "08740450564", product: product.id, amount: 10}

    const response = await client.post("/api/v1/sale")
      .header('Authorization', `Bearer ${accessToken.toJSON().token}`)
      .json(invalidBody)

    response.assertStatus(400)
    response.assertBody({status: "error", errors: ["Unable to find customer with cpf 08740450564"]})
  })

  test('when product is not found, should return an error 404', async({client}) => {
    const user = await User.create({fullName: "Fernando Coelho Saraiva", email: "fernando@gmail.com", password: "password123"})
    const accessToken = await User.accessTokens.create(user, undefined, { expiresIn: '30 days' })
    await Client.create({cpf: "9839383736", name: "Fernando Coelho Saraiva", telephone: "77998574669"})

    const invalidBody = { client: "9839383736", product: 10, amount: 10}

    const response = await client.post("/api/v1/sale")
      .header('Authorization', `Bearer ${accessToken.toJSON().token}`)
      .json(invalidBody)

    response.assertStatus(400)
    response.assertBody({status: "error", errors: ["Unable to find product with id 10"]})
  })

  test('when sale is valid, should return success', async( {client} ) => {
    const user = await User.create({fullName: "Fernando Coelho Saraiva", email: "fernando@gmail.com", password: "password123"})
    const accessToken = await User.accessTokens.create(user, undefined, { expiresIn: '30 days' })
    await Client.create({cpf: "07640440394", name: "Fernando Coelho Saraiva", telephone: "77998574669"})
    const product = await Product.create({price: 10.0, name: "product"})

    const invalidBody = { client: "07640440394", product: product.id, amount: 10}

    const response = await client.post("/api/v1/sale")
      .header('Authorization', `Bearer ${accessToken.toJSON().token}`)
      .json(invalidBody)

    response.assertStatus(200)
  })


})