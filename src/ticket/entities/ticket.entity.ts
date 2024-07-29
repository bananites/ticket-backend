import { BeforeInsert, Column, Entity, ManyToOne, UpdateDateColumn } from "typeorm";
import { TicketStatus } from "../enums/ticket-status.enum";
import { BaseEntity } from "src/model/base.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Ticket extends BaseEntity{
    

    @Column({type: 'varchar', length: 300})
    title: string;

    @Column({type: 'varchar', length: 300})
    description: string;
    
    @Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.NEW_OPEN
    })
    status: TicketStatus;

    @Column({type: 'varchar', length: 300})
    createdBy: string;
    
    @ManyToOne(() => User, (user) => user.id, {nullable: true, eager: true})
    owner: User['id']

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    lastChangedDateTime: Date;

    @Column({type: 'varchar', length: 300})
    lastChangedBy: string;


    // Set a the lastChangedBy to the Creator
    @BeforeInsert()
    async setLastChanged(){
        this.lastChangedBy = this.createdBy
    }



}