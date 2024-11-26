import Client from "#models/client";
import Sale from "#models/sale";
import { ClientDTO } from "../dtos/clientDTO.js";
import { ResultsWrapper } from "../ResultWrapper.js";

export default class ClientService{
    static async createClient(client: {cpf: string, name: string, telephone: string}): Promise<ResultsWrapper<Client>>{
        try {
            return ResultsWrapper.ok(await Client.create(client))
        } catch (error) {
            return ResultsWrapper.fail([Error(`Unable to complete client creation. ${error.message}`)])
        }
    }

    static async listClients(): Promise<ResultsWrapper<Client[]>>{
        try {
            return ResultsWrapper.ok(await Client.query().orderBy('id'))
        } catch (error) {
            return ResultsWrapper.fail([Error(`Unable to list customers. ${error.message}`)])
        }
    }

    static async findClient(id: number, startDate: Date, endDate: Date): Promise<ResultsWrapper<ClientDTO>>{
        try {
            const client = await Client.query().where("id", id).firstOrFail()
            const sales = await Sale.query().where('clientId', id).
                whereBetween("createdAt", [startDate, endDate]).
                preload('product').orderBy("createdAt")

            return ResultsWrapper.ok(new ClientDTO(client, sales))
        } catch (error) {
            return ResultsWrapper.fail([Error(`Unable to locate client with id ${id}`)])
        }
    }

    static async updateClient(id: number, name ?: string, telephone ?: string): Promise<ResultsWrapper<Client>>{
        try {
            const client = await Client.query().where("id", id).firstOrFail()
            name && (client.name = name)
            telephone && (client.telephone = telephone)

            return ResultsWrapper.ok(await client.save())
        } catch (error) {
            return ResultsWrapper.fail([Error(`Unable to list customers. ${error.message}`)])
        }
    }

    static async removeClient(id: number): Promise<ResultsWrapper<boolean>>{
        try {
            const client = await Client.findOrFail(id)
            await client!.delete()
            return ResultsWrapper.ok(true)
        } catch (error) {
            return ResultsWrapper.fail([Error(`Unable to remove client. ${error.message}`)])
        }
    }
}