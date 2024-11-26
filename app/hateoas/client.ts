import { HateoasLink } from "./HateoasLink.js"

export default class ClientHateoas{
    static getLinksToCreateClient(clientId: number): HateoasLink[]{
        return [
            new HateoasLink("findClient", `http://localhost:3333/api/v1/client/${clientId}?startDate=&endDate=`, "get"),
            new HateoasLink("deleteClient", `http://localhost:3333/api/v1/client/${clientId}`, "delete"),
            new HateoasLink("UpdateClient", `http://localhost:3333/api/v1/client/${clientId}`, "patch")
        ]
    }
    static getLinksToListClients(): HateoasLink[]{
        return [
            new HateoasLink("findClient", `http://localhost:3333/api/v1/client/`, "get"),
            new HateoasLink("deleteClient", `http://localhost:3333/api/v1/client/`, "delete"),
            new HateoasLink("UpdateClient", `http://localhost:3333/api/v1/client/`, "patch"),
            new HateoasLink("CreateClient", `http://localhost:3333/api/v1/client`, "post")
        ]
    }
    static getLinksToFindClient(clientId: number): HateoasLink[]{
        return [
            new HateoasLink("deleteClient", `http://localhost:3333/api/v1/client/${clientId}`, "delete"),
            new HateoasLink("UpdateClient", `http://localhost:3333/api/v1/client/${clientId}`, "patch"),
        ]
    }
    static getLinksToUpdateClient(clientId: number): HateoasLink[]{
        return [
            new HateoasLink("deleteClient", `http://localhost:3333/api/v1/client/${clientId}`, "delete"),
            new HateoasLink("findClient", `http://localhost:3333/api/v1/client/${clientId}?startDate=&endDate=`, "get"),
        ]
    }
    static getLinksToRemoveClient(): HateoasLink[]{
        return [
            new HateoasLink("CreateClient", `http://localhost:3333/api/v1/client`, "post"),
            new HateoasLink("ListClients", `http://localhost:3333/api/v1/client`, "get")
        ]
    }
}