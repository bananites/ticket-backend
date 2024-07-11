import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TicketStatus } from "../enums/ticket-status.enum";

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    createdBy: string;

    @Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.NEW_OPEN
    })
    status: TicketStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    


}