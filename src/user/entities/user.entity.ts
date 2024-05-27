import {Column, Entity } from "typeorm";
import { BaseEntity } from "src/model/base.entity";

@Entity()
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