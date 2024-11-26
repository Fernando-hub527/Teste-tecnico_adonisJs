/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { HttpRouterService } from '@adonisjs/core/types'
import { middleware } from './kernel.js'
const SalesController = () => import("#controllers/sales_controller")
const UserController = () => import("#controllers/users_controller")
const ClientController = () => import("#controllers/clients_controller")
const ProductController = () => import("#controllers/products_controller")


router.group(() => {
  setClientRouts(router)
  setProductRouts(router)


  router.post('/sale', [SalesController, 'createSale']).use(middleware.auth({guards: ['api']}))
  router.post('/login', [UserController, 'login'])
  router.post('/user', [UserController, 'createUser'])

}).prefix("/api/v1")

function setClientRouts(router: HttpRouterService) {
  router.group(() => {
    router.post('/', [ClientController, 'createClient'])
    router.patch(':id/', [ClientController, 'editClient'])
    router.delete(':id/', [ClientController, 'removeClient'])
    router.get(':id/', [ClientController, 'findClient'])
    router.get('/', [ClientController, 'listClients'])

  }).prefix("/client").use(middleware.auth({guards: ['api']}))
}

function setProductRouts(router: HttpRouterService) {
  router.group(() => {
    router.post('/', [ProductController, 'createProduct'])
    router.patch(':id/', [ProductController, 'editProduct'])
    router.delete(':id/', [ProductController, 'removeProduct'])
    router.get('/', [ProductController, 'findProduct'])
  }).prefix("/product").use(middleware.auth({guards: ['api']}))

  router.get('/products', [ProductController, 'listProducts']).use(middleware.auth({guards: ['api']}))
}