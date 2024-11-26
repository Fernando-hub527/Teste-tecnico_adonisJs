import { HateoasLink } from "../hateoas/HateoasLink.js"

export default class ResponseFormatter {
    public static success(data: any, links: HateoasLink[]) {
      return {
        status: 'success',
        data: data,
        actions: links
      }
    }
  
    public static error(errors: Error[]) {
      return {
        status: 'error',
        errors: errors.map(error => error.message),
      }
    }
  }