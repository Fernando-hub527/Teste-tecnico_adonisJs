import {  } from "./client.js"
import { HateoasLink } from "./HateoasLink.js"


export default class UserHateoas{
    static getLinksToLogin(): HateoasLink[]{
        return [
            new HateoasLink("ListClients", `http://localhost:3333/api/v1/client`, "get"),
            new HateoasLink("CreateClient", `http://localhost:3333/api/v1/client`, "post"),
            new HateoasLink("CreateUser", `http://localhost:3333/api/v1/user`, "post")
        ]
    }
    static getLinksToCreate(): HateoasLink[]{
        return [
            new HateoasLink("login", `http://localhost:3333/api/v1/login`, "post")
        ]
    }
}