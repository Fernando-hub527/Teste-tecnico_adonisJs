import User from "#models/user"
import hash from '@adonisjs/core/services/hash'
import { ResultsWrapper } from "../ResultWrapper.js"
import { AccessToken } from "@adonisjs/auth/access_tokens"

export class UserService{
    static async getAccessToken(password: string, email: string): Promise<ResultsWrapper<AccessToken>>{
        const user = await User.findBy('email', email)
        if (!user) return ResultsWrapper.fail([Error("Invalid credentials")])
        if (!await hash.verify(user.password, password)) return ResultsWrapper.fail([Error("Invalid credentials")])
        return ResultsWrapper.ok(await User.accessTokens.create(user, undefined, { expiresIn: '30 days' }))
    }

    static async createUser(user: {password: string, email: string, fullName: string}): Promise<ResultsWrapper<User>>{
        try {
            return ResultsWrapper.ok(await User.create(user))
        } catch (error) {
            return ResultsWrapper.fail([Error(`Unable to complete user creation. ${error.message}`)])
        }
    }
}