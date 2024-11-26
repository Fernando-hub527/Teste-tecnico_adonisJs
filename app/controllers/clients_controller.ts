import type { HttpContext } from '@adonisjs/core/http'
import { ClientDTO } from '../dtos/clientDTO.js'
import ClientHateoas from '../hateoas/client.js'
import ResponseFormatter from '../utils/ResponseFormatter.js'
import ClientService from '../service/clients_service.js'
import { validClientUpdate, validNewClient, validParamsToFindClient, validRemoveClient } from '#validators/client'

export default class ClientsController {
    public async createClient({ request, response }: HttpContext) {
        const clientDataOrError = await validNewClient(request.body())
        if (!clientDataOrError.isSucess) return response.status(400).send(ResponseFormatter.error(clientDataOrError.getError()))

        const newClient = await ClientService.createClient(clientDataOrError.getValue())
        if (!newClient.isSucess) return response.status(400).send(ResponseFormatter.error(newClient.getError()))

        return ResponseFormatter.success(new ClientDTO(newClient.getValue()), ClientHateoas.getLinksToCreateClient(newClient.getValue().id))
    }

    public async listClients({ response }: HttpContext) {
        const clientsOrError = await ClientService.listClients()
        if (!clientsOrError.isSucess) return response.status(400).send(ResponseFormatter.error(clientsOrError.getError()))

        return ResponseFormatter.success(ClientDTO.factoryArr(clientsOrError.getValue()), ClientHateoas.getLinksToListClients())
    }

    public async findClient({ response, request, params }: HttpContext) {
        const query = request.qs()
        const paramsOrError = await validParamsToFindClient({ id: params.id, startDate: query.startDate, endDate: query.endDate })
        if (!paramsOrError.isSucess) return response.status(400).send(ResponseFormatter.error(paramsOrError.getError()))

        const validParams = paramsOrError.getValue()
        const clientOrError = await ClientService.findClient(validParams.id, validParams.startDate, validParams.endDate)
        if (!clientOrError.isSucess) return response.status(404).send(ResponseFormatter.error(clientOrError.getError()))

        return ResponseFormatter.success(clientOrError.getValue(), ClientHateoas.getLinksToFindClient(validParams.id))
    }

    public async editClient({ request, params, response }: HttpContext) {
        const body = request.body()
        const paramsOrError = await validClientUpdate({ name: body.name, telephone: body.telephone, id: params.id })
        if (!paramsOrError.isSucess) return response.status(400).send(ResponseFormatter.error(paramsOrError.getError()))

        const validParams = paramsOrError.getValue()
        const updatedClientOrError = await ClientService.updateClient(validParams.id, validParams.name, validParams.telephone)
        if (!updatedClientOrError.isSucess) return response.status(404).send(ResponseFormatter.error(updatedClientOrError.getError()))

        return ResponseFormatter.success(new ClientDTO(updatedClientOrError.getValue()), ClientHateoas.getLinksToUpdateClient(validParams.id))
    }

    public async removeClient({ params, response }: HttpContext) {
        try {
            const paramsOrError = await validRemoveClient(params)
            if (!paramsOrError.isSucess) return response.status(400).send(ResponseFormatter.error(paramsOrError.getError()))

            const sucessOrError = await ClientService.removeClient(paramsOrError.getValue().id)
            if (!sucessOrError.isSucess) return response.status(400).send(ResponseFormatter.error(sucessOrError.getError()))

            return ResponseFormatter.success(undefined, ClientHateoas.getLinksToRemoveClient())
        } catch (error) {
            return response.status(422).send(ResponseFormatter.error(error.messages))
        }
    }
}