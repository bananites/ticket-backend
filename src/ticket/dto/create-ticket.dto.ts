import { User } from "src/user/entities/user.entity";
import { TicketStatus } from "../enums";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTicketDto {

    @ApiProperty({
        example:"title",
        required: true
    })
    title: string

    @ApiProperty({
        example: "description",
        required: true
    })
    description: string

    status: TicketStatus

    @ApiProperty({
        description: "User ID, default",
        example: "8fa408ef-0ce1-4f41-9674-47aa3246404a",
        required: false
    })
    owner: User['id']

    @ApiProperty({
        default: "TIMESTAMP",
        required: true
    })
    createDateTime: Date

    @ApiProperty({
        default: "TIMESTAMP",
        required: false
    })
    lastChangedDateTime: Date
    
    @ApiProperty({
        description: "User ID",
        required: true
    })
    createdBy: User['id']
    
    @ApiProperty({
        default: "createdBy",
        description: "User ID",
        required: true
    })
    lastChangedBy: User['id']

    

}