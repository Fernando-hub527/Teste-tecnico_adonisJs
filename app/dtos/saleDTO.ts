import Sale from "#models/sale";
import { ClientDTO } from "./clientDTO.js";
import { ProductDTO } from "./productDTO.js";

export class SaleDTO{
    id: number
    client: ClientDTO
    product: ProductDTO
    amount: number
    unitPrice: number
    totalPrice: number

    constructor(sale: Sale){
        this.id = sale.id
        this.client = new ClientDTO(sale.client)
        this.product = new ProductDTO(sale.product)
        this.amount = sale.amount
        this.unitPrice = sale.unitPrice
        this.totalPrice = this.amount * this.unitPrice
    }
}