
import {CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createDateTime: Date;





}