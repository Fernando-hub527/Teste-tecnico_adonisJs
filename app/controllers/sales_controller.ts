import { validNewSale } from '#validators/sales'
import type { HttpContext } from '@adonisjs/core/http'
import ResponseFormatter from '../utils/ResponseFormatter.js'
import SaleService from '../service/sales_service.js'
import { SaleDTO } from '../dtos/saleDTO.js'
import SaleHateoas from '../hateoas/sale.js'

export default class SalesController {
    public async createSale({ request, response }: HttpContext){
        const saleDataOrError = await validNewSale(request.body())
        if (!saleDataOrError.isSucess) return response.status(400).send(ResponseFormatter.error(saleDataOrError.getError()))

        const newSale = await SaleService.createSale(saleDataOrError.getValue())
        if (!newSale.isSucess) return response.status(400).send(ResponseFormatter.error(newSale.getError()))

        return ResponseFormatter.success(new SaleDTO(newSale.getValue()), SaleHateoas.getLinksToCreateSale(newSale.getValue().client.id))
    }
}