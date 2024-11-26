import Product from "#models/product";

export class ProductDTO{
    id: number
    name: string
    price: number
    constructor(product: Product){
        this.id = product.id
        this.price = product.price
        this.name = product.name
    }

    static factoryArr(products: Product[]): ProductDTO[] {
        return products.map(product => new ProductDTO(product))
    }
}