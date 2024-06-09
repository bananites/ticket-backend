import { Status } from "../enums"


export class CreateUserDto {

    username: string
    email: string
    password: string
    createdAt: string
    updatedAt: string
    status: Status



}