import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "src/model/base.entity";

@Entity('User')
export class User extends BaseEntity{


    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string


    // @OneToMany(type => Tickets, tickets => tickets.user)
    // tickets: Tickets[];

}