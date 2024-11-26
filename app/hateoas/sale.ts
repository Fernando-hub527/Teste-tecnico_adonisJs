import { HateoasLink } from "./HateoasLink.js"

export default class SaleHateoas{
    static getLinksToCreateSale(clientId: number): HateoasLink[]{
        return [
            new HateoasLink("findClient", `http://localhost:3333/api/v1/client/${clientId}?startDate=&endDate=`, "get"),
            new HateoasLink("findProduct", `http://localhost:3333/api/v1/product?id=${clientId}`, "get"),
        ]
    }
}