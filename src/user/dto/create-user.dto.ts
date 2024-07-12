import { Status } from "../enums"


export class CreateUserDto {

    username: string
    email: string
    password: string
    status: Status
    createDateTime: Date
    lastChangedDateTime: Date

}