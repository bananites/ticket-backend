import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TicketStatus } from "../enums/ticket-status.enum";
import { BaseEntity } from "src/model/base.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Ticket extends BaseEntity{

    
    @Column()
    description: string;
    
    @Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.NEW_OPEN
    })
    status: TicketStatus;

    @Column({type: 'varchar', length: 300})
    createdBy: string;

    @ManyToOne(type => User, owner => owner.id)
    owner: User['id']

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    lastChangedDateTime: Date;

    @Column({type: 'varchar', length: 300, default: () => null})
    lastChangedBy: string;


}