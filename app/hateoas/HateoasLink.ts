export class HateoasLink{
    rel: string
    href: string
    method: string
    constructor(rel: string, href: string, method: string){
        this.href = href
        this.rel = rel
        this.method = method
    }
}
