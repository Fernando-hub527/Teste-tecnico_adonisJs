import Product from "#models/product";
import product from "#models/product";
import { DateTime } from "luxon";
import { ProductDTO } from "../dtos/productDTO.js";
import { ResultsWrapper } from "../ResultWrapper.js";

export default class ProductService{
    static async createProduct(product: {name: string, price: number}): Promise<ResultsWrapper<Product>>{
        try {
            return ResultsWrapper.ok(await Product.create(product))
        } catch (error) {
            return ResultsWrapper.fail([Error(`Unable to complete product creation. ${error.message}`)])
        }
    }

    static async listProducts(): Promise<ResultsWrapper<Product[]>>{
        try {
            return ResultsWrapper.ok(await Product.query().whereNull("deletedAt").orderBy('name', 'asc'))
        } catch (error) {
            return ResultsWrapper.fail([Error(`Unable to list products. ${error.message}`)])
        }
    }

    static async findProduct(id ?: number, name ?: string): Promise<ResultsWrapper<ProductDTO>>{
        try {
            if(!id && !name) return ResultsWrapper.fail([Error(`Invalid parameters, device must be filtered by name or Id`)])

            const query = id ? {name: "id", value: id} :{name: "name", value: name} 
            return ResultsWrapper.ok(new ProductDTO(await Product.query().whereNull("deletedAt").where(query.name, query.value!).firstOrFail()))
        } catch (error) {
            return ResultsWrapper.fail([Error(`Unable to locate product with ${id ? "id " + id : "name " + name}`)])
        }
    }

    static async updateProduct(id: number, name ?: string, price ?: number): Promise<ResultsWrapper<product>>{
        try {
            const product = await Product.query().where("id", id).whereNull("deletedAt").firstOrFail()
            name && (product.name = name)
            price && (product.price = price)

            return ResultsWrapper.ok(await product.save())
        } catch (error) {
            return ResultsWrapper.fail([Error(`Unable to list products. ${error.message}`)])
        }
    }

    static async removeProduct(id: number): Promise<ResultsWrapper<boolean>>{
        try {
            const product = await Product.findOrFail(id)
            product.deletedAt = DateTime.local()
            await product.save()
            return ResultsWrapper.ok(true)
        } catch (error) {
            return ResultsWrapper.fail([Error(`Unable to remove product. ${error.message}`)])
        }
    }
}