import vine from '@vinejs/vine'
import { ResultsWrapper } from '../ResultWrapper.js'


export async function validNewClient(client: any): Promise<ResultsWrapper<{cpf: string, name: string, telephone: string}>>{
    try {
        const newClient = await createClientValidator.validate(client)
        return ResultsWrapper.ok(newClient)
    } catch (error) {
        return ResultsWrapper.fail(error.messages.map((message: {message: string}) => new Error(message.message)))
    }
}

export async function validParamsToFindClient(params: any): Promise<ResultsWrapper<{id: number, startDate: Date, endDate: Date}>>{
    try {
        const validParams = await findClientSalesValidator.validate(params)
        return ResultsWrapper.ok(validParams)
    } catch (error) {
        return ResultsWrapper.fail(error.messages.map((message: {message: string}) => new Error(message.message)))
    }
}

export async function validClientUpdate(params: any): Promise<ResultsWrapper<{name ?: string, telephone ?: string, id: number}>> {
    try {
        const clientData = await updateClientValidator.validate(params)
        return ResultsWrapper.ok(clientData)
    } catch (error) {
        return ResultsWrapper.fail(error.messages.map((message: {message: string}) => new Error(message.message)))
    }
}

export async function validRemoveClient(params: any): Promise<ResultsWrapper<{id: number}>> {
    try {
        const clientData = await removeClientValidator.validate(params)
        return ResultsWrapper.ok(clientData)
    } catch (error) {
        return ResultsWrapper.fail(error.messages.map((message: {message: string}) => new Error(message.message)))
    }
}

const createClientValidator = vine.compile(
    vine.object({
        cpf: vine.string().trim().fixedLength(11).unique(async (db, value) => {
            const client = await db.from('clients').where('cpf', value).first()
            return !client
        }),
        name: vine.string().maxLength(60),
        telephone: vine.string().maxLength(20)
    })
)

const findClientSalesValidator = vine.compile(
    vine.object({
        id: vine.number().positive().max(100000000),
        startDate: vine.date().before("today"),
        endDate: vine.date()
    })
)

const updateClientValidator = vine.compile(
    vine.object({
        name: vine.string().maxLength(60).optional(),
        telephone: vine.string().maxLength(20).optional(),
        id: vine.number().positive().max(100000000),
    })
)

const removeClientValidator = vine.compile(
    vine.object({
        id: vine.number().positive().max(100000000)
    })
)