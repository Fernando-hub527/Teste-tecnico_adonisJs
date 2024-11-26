import { HateoasLink } from "./HateoasLink.js"

export default class ProductHateoas{
    static getLinksToCreateProduct(ProductId: number): HateoasLink[]{
        return [
            new HateoasLink("findProduct", `http://localhost:3333/api/v1/product?id=${ProductId}`, "get"),
            new HateoasLink("deleteProduct", `http://localhost:3333/api/v1/product/${ProductId}`, "delete"),
            new HateoasLink("UpdateProduct", `http://localhost:3333/api/v1/product/${ProductId}`, "patch")
        ]
    }
    static getLinksToListProducts(): HateoasLink[]{
        return [
            new HateoasLink("findProduct", `http://localhost:3333/api/v1/product?id=`, "get"),
            new HateoasLink("CreateProduct", `http://localhost:3333/api/v1/product`, "post")
        ]
    }
    static getLinksToFindProduct(ProductId: number): HateoasLink[]{
        return [
            new HateoasLink("deleteProduct", `http://localhost:3333/api/v1/product/${ProductId}`, "delete"),
            new HateoasLink("UpdateProduct", `http://localhost:3333/api/v1/product/${ProductId}`, "patch"),
        ]
    }
    static getLinksToUpdateProduct(ProductId: number): HateoasLink[]{
        return [
            new HateoasLink("deleteProduct", `http://localhost:3333/api/v1/product/${ProductId}`, "delete"),
            new HateoasLink("findProduct", `http://localhost:3333/api/v1/product?id=${ProductId}`, "get"),
        ]
    }
    static getLinksToRemoveProduct(): HateoasLink[]{
        return [
            new HateoasLink("CreateProduct", `http://localhost:3333/api/v1/product`, "post"),
            new HateoasLink("ListProducts", `http://localhost:3333/api/v1/products`, "get")
        ]
    }
}