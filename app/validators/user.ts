import vine from "@vinejs/vine";
import { ResultsWrapper } from "../ResultWrapper.js";

const userCredentialsValidator = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().maxLength(50),
    })
)

const newUserValidator = vine.compile(
    vine.object({
        email: vine.string().email().unique(async (db, value) => {
            const user = await db.from('users').where('email', value).first()
            return !user
        }),
        password: vine.string().maxLength(50).minLength(10),
        fullName: vine.string().maxLength(100).minLength(10)
    })
)

export async function validNewUser(userData: any): Promise<ResultsWrapper<{email: string, password: string, fullName: string}>>{
    try {
        const user = await newUserValidator.validate(userData)
        return ResultsWrapper.ok(user)
    } catch (error) {
        return ResultsWrapper.fail(error.messages.map((message: {message: string}) => new Error(message.message)))
    }
}

export async function validUserCredentials(email: any, password: any): Promise<ResultsWrapper<{email: string, password: string}>>{
    try {
        const credentials = await userCredentialsValidator.validate({email: email, password: password})
        return ResultsWrapper.ok(credentials)
    } catch (error) {
        return ResultsWrapper.fail(error.messages.map((message: {message: string}) => new Error(message.message)))
    }
}