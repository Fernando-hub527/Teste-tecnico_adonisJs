import Client from "#models/client";
import Product from "#models/product";
import Sale from "#models/sale";
import { ResultsWrapper } from "../ResultWrapper.js";

export default class SaleService {
    static async createSale(sale: { client: string, product: number, amount: number}): Promise<ResultsWrapper<Sale>> {
        try {
            const clientFound = await Client.findBy("cpf", sale.client)
            if (!clientFound) return ResultsWrapper.fail([Error(`Unable to find customer with cpf ${sale.client}`)])

            const productFound = await Product.findBy("id", sale.product)
            if (!productFound) return ResultsWrapper.fail([Error(`Unable to find product with id ${sale.product}`)])
            
            return ResultsWrapper.ok(await this.saveSale(clientFound, productFound, sale.amount))
        } catch (error) {
            return ResultsWrapper.fail([Error(`Unable to complete client creation. ${error.message}`)])
        }
    }


    private static async saveSale(client: Client, product: Product, amount: number): Promise<Sale>{       
        const newSale = await Sale.create({
            clientId: client.id,
            productId: product.id,
            amount: amount,
            unitPrice: product.price
        })

        return await Sale.query().where("id", newSale.id).preload('client').preload('product').firstOrFail()
    }
}