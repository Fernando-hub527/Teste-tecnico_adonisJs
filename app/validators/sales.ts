import vine from '@vinejs/vine'
import { ResultsWrapper } from '../ResultWrapper.js'

type sale = {client: string, product: number, amount: number}

export async function validNewSale(sale: any): Promise<ResultsWrapper<sale>>{
    try {
        const newSale = await createSalesValidator.validate(sale)
        return ResultsWrapper.ok(newSale)
    } catch (error) {
        return ResultsWrapper.fail(error.messages.map((message: {message: string}) => new Error(message.message)))
    }
}

const createSalesValidator = vine.compile(
    vine.object({
        client: vine.string().maxLength(15),

        product: vine.number().max(9000000000),

        amount: vine.number().positive().max(1000000000)
    })
)

