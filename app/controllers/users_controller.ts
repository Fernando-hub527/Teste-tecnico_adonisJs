import type { HttpContext } from '@adonisjs/core/http'
import { UserService } from '../service/user_service.js'
import ResponseFormatter from '../utils/ResponseFormatter.js'
import UserHateoas from '../hateoas/user.js'
import { validNewUser, validUserCredentials } from '#validators/user'
import { UserDTO } from '../dtos/userDTO.js'

export default class UsersController {
    public async createUser({ request, response }: HttpContext) {
        const userDataOrError = await validNewUser(request.body())
        if (!userDataOrError.isSucess) return response.status(400).send(ResponseFormatter.error(userDataOrError.getError()))

        const createdUserOrError = await UserService.createUser(userDataOrError.getValue())
        if (!createdUserOrError.isSucess) return response.status(400).send(ResponseFormatter.error(createdUserOrError.getError()))

        return ResponseFormatter.success(new UserDTO(createdUserOrError.getValue()), UserHateoas.getLinksToCreate())
    }

    public async login({ request, response }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])

        const credentialsOrError = await validUserCredentials(email, password)
        if (!credentialsOrError.isSucess) return response.status(400).send(ResponseFormatter.error(credentialsOrError.getError()))

        const userOrError = await UserService.getAccessToken(password, email)
        if (!userOrError.isSucess) return response.status(401).send(ResponseFormatter.error(userOrError.getError()))

        return ResponseFormatter.success({ access_token: userOrError.getValue() }, UserHateoas.getLinksToLogin())
    }
}