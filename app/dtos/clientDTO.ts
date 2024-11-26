import Client from "#models/client";
import Sale from "#models/sale";

export class SalesDTO{
    clientName ?: string
    productName ?: string
    unitPrice: number
    amount: number
    totalPrice: number
    date: Date
    constructor(sale: Sale){
        sale.client && (this.clientName = sale.client.name)
        sale.product && (this.productName = sale.product.name)
        this.unitPrice = sale.unitPrice
        this.amount = sale.amount
        this.date = new Date(sale.createdAt.toString())
        this.totalPrice = this.amount * this.unitPrice
    }

    static factoryArr(sales: Sale[]): SalesDTO[] {
        return sales.map(sale => new SalesDTO(sale))
    }
}

export class ClientDTO{
    id: number
    telephone: string
    name: string
    sales ?: SalesDTO[]
    constructor(client: Client, sales ?: Sale[]){
        this.id = client.id
        this.telephone = client.telephone
        this.name = client.name
        sales ? this.sales = SalesDTO.factoryArr(sales) : this.sales = []
    }

    static factoryArr(clients: Client[]): ClientDTO[] {
        return clients.map(client => new ClientDTO(client, client.sales))
    }
}