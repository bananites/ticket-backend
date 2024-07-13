import internal from "stream";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: number

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createDateTime: Date;





}