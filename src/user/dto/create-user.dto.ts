import { ApiProperty } from "@nestjs/swagger"
import { Status } from "../enums"
import { APP_FILTER } from "@nestjs/core"


export class CreateUserDto {

    @ApiProperty({
        example:"firstname",
        required: true
    })
    firstname: string

    @ApiProperty({
        example: "lastname",
        required: true
    })
    lastname: string

    @ApiProperty({
        example:"example@example.de",
        required: true
    })
    email: string

    @ApiProperty({
        example:"password123!",
        required: true
    })
    password: string

    
    status: Status
    createDateTime: Date
    lastChangedDateTime: Date

}