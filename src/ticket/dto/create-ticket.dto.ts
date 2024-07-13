import { User } from "src/user/entities/user.entity";
import { TicketStatus } from "../enums";

export class CreateTicketDto {

    description: string
    status: TicketStatus
    owner: User['id']
    createDateTime: Date
    lastChangedDateTime: Date
    createdBy: string
    lastChangedBy: string

    

}