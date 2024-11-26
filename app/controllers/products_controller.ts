import type { HttpContext } from '@adonisjs/core/http'
import { validNewProduct, validParamsToFindProduct, validProductUpdate, validRemoveProduct } from "#validators/product"
import ResponseFormatter from '../utils/ResponseFormatter.js'
import ProductService from '../service/product_service.js'
import { ProductDTO } from '../dtos/productDTO.js'
import ProductHateoas from '../hateoas/product.js'

export default class ProductsController {
    public async listProducts({ response }: HttpContext) {
        const productOrError = await ProductService.listProducts()
        if (!productOrError.isSucess) return response.status(400).send(ResponseFormatter.error(productOrError.getError()))

        return ResponseFormatter.success(ProductDTO.factoryArr(productOrError.getValue()), ProductHateoas.getLinksToListProducts())
    }

    public async findProduct({ response, request }: HttpContext) {
        const paramsOrError = await validParamsToFindProduct(request.qs())
        if (!paramsOrError.isSucess) return response.status(400).send(ResponseFormatter.error(paramsOrError.getError()))

        const validParams = paramsOrError.getValue()
        const productOrError = await ProductService.findProduct(validParams.id, validParams.name)
        if (!productOrError.isSucess) return response.status(404).send(ResponseFormatter.error(productOrError.getError()))

        return ResponseFormatter.success(productOrError.getValue(), ProductHateoas.getLinksToFindProduct(productOrError.getValue().id))
    }

    public async editProduct({ request, params, response }: HttpContext) {
        const body = request.body()
        const paramsOrError = await validProductUpdate({ name: body.name, price: body.price, id: params.id })
        if (!paramsOrError.isSucess) return response.status(400).send(ResponseFormatter.error(paramsOrError.getError()))

        const validParams = paramsOrError.getValue()
        const updatedProductOrError = await ProductService.updateProduct(validParams.id, validParams.name, validParams.price)
        if (!updatedProductOrError.isSucess) return response.status(404).send(ResponseFormatter.error(updatedProductOrError.getError()))

        return ResponseFormatter.success(new ProductDTO(updatedProductOrError.getValue()), ProductHateoas.getLinksToUpdateProduct(updatedProductOrError.getValue().id))
    }

    public async removeProduct({ params, response }: HttpContext) {
        const paramsOrError = await validRemoveProduct(params)
        if (!paramsOrError.isSucess) return response.status(400).send(ResponseFormatter.error(paramsOrError.getError()))

        const sucessOrError = await ProductService.removeProduct(paramsOrError.getValue().id)
        if (!sucessOrError.isSucess) return response.status(400).send(ResponseFormatter.error(sucessOrError.getError()))

        return ResponseFormatter.success(undefined, ProductHateoas.getLinksToRemoveProduct())
    }

    public async createProduct({ request, response }: HttpContext) {
        const productDataOrError = await validNewProduct(request.body())
        if (!productDataOrError.isSucess) return response.status(400).send(ResponseFormatter.error(productDataOrError.getError()))

        const newProduct = await ProductService.createProduct(productDataOrError.getValue())
        if (!newProduct.isSucess) return response.status(400).send(ResponseFormatter.error(newProduct.getError()))

        return ResponseFormatter.success(new ProductDTO(newProduct.getValue()), ProductHateoas.getLinksToCreateProduct(newProduct.getValue().id))
    }
}