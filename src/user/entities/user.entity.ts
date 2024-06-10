
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../enums";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.IN_PROGRESS
    })
    status: Status;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}