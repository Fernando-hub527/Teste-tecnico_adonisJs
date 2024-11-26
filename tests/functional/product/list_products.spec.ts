import Client from '#models/client'
import Product from '#models/product'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import assert from 'assert'

test.group('Product list products', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('when request is not authenticate, should return an error', async ({ client }) => {
    const response = await client.get("/api/v1/product")

    response.assertStatus(401)
    response.assertBody({errors: [{message: "Unauthorized access"}]})
  })

  test('when valid request is sent, should return products', async ({ client }) => {
    const user = await User.create({fullName: "Fernando Coelho Saraiva", email: "fernando@gmail.com", password: "password123"})
    const accessToken = await User.accessTokens.create(user, undefined, { expiresIn: '30 days' })
    await Client.create({cpf: "07640440394", name: "Fernando Coelho Saraiva", telephone: "77998574669"})
    await Product.create({price: 10.0, name: "product"})


    const response = await client.get("/api/v1/products")
      .header('Authorization', `Bearer ${accessToken.toJSON().token}`)
      
    
    response.assertStatus(200)
    assert.equal(response.body().data.length, 1)
  })
})