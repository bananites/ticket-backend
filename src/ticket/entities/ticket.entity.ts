import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TicketStatus } from "../enums/ticket-status.enum";
import { BaseEntity } from "src/model/base.entity";

@Entity()
export class Ticket extends BaseEntity{

    

    @Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.NEW_OPEN
    })
    status: TicketStatus;

    


}