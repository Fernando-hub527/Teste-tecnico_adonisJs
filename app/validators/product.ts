import vine from '@vinejs/vine'
import { ResultsWrapper } from '../ResultWrapper.js'


export async function validNewProduct(Product: any): Promise<ResultsWrapper<{name: string, price: number}>>{
    try {
        const newProduct = await createProductValidator.validate(Product)
        return ResultsWrapper.ok(newProduct)
    } catch (error) {
        return ResultsWrapper.fail(error.messages.map((message: {message: string}) => new Error(message.message)))
    }
}

export async function validParamsToFindProduct(params: any): Promise<ResultsWrapper<{id ?: number, name ?: string}>>{
    try {
        const validParams = await findProductValidator.validate(params)
        return ResultsWrapper.ok(validParams)
    } catch (error) {
        return ResultsWrapper.fail(error.messages.map((message: {message: string}) => new Error(message.message)))
    }
}

export async function validProductUpdate(params: any): Promise<ResultsWrapper<{price ?: number, name ?: string, id: number}>> {
    try {
        const ProductData = await updateProductValidator.validate(params)
        return ResultsWrapper.ok(ProductData)
    } catch (error) {
        return ResultsWrapper.fail(error.messages.map((message: {message: string}) => new Error(message.message)))
    }
}

export async function validRemoveProduct(params: any): Promise<ResultsWrapper<{id: number}>> {
    try {
        const ProductData = await removeProductValidator.validate(params)
        return ResultsWrapper.ok(ProductData)
    } catch (error) {
        return ResultsWrapper.fail(error.messages.map((message: {message: string}) => new Error(message.message)))
    }
}

const createProductValidator = vine.compile(
    vine.object({
        name: vine.string().trim().unique(async (db, value) => {
            const Product = await db.from('products').where('name', value).first()
            return !Product
        }),
        price: vine.number().max(200000000)
    })
)

const findProductValidator = vine.compile(
    vine.object({
        id: vine.number().positive().max(100000000).optional(),
        name: vine.string().maxLength(150).optional(),
    })
)

const updateProductValidator = vine.compile(
    vine.object({
        name: vine.string().maxLength(150).optional(),
        price: vine.number().max(200000000).optional(),
        id: vine.number().positive().max(100000000),
    })
)

const removeProductValidator = vine.compile(
    vine.object({
        id: vine.number().positive().max(100000000)
    })
)