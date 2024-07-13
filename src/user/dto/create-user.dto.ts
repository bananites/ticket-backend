import { Status } from "../enums"


export class CreateUserDto {

    firstname: string
    lastname: string
    email: string
    password: string
    status: Status
    createDateTime: Date
    lastChangedDateTime: Date

}