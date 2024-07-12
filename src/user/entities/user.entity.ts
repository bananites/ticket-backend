
import { Column, Entity} from "typeorm";
import { Status } from "../enums";
import { BaseEntity } from "src/model/base.entity";

@Entity()
export class User extends BaseEntity {


    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.ACTIVE
    })
    status: Status;

}