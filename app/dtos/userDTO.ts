import User from "#models/user";

export class UserDTO{
    fullName: string
    email: String
    constructor(user: User){
        this.fullName = user.fullName
        this.email = user.email
    }
}