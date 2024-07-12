import internal from "stream";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: number

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createDateTime: Date;

    @Column({type: 'varchar', length: 300})
    createdBy: string;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    lastChangedDateTime: Date;

    @Column({type: 'varchar', length: 300})
    lastChangedBy: string;





}