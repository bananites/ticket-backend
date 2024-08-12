
import { BeforeInsert, Column, Entity} from "typeorm";
import { Status } from "../enums";
import { BaseEntity } from "src/model/base.entity";
import  * as bcrypt from "bcrypt";

@Entity()
export class User extends BaseEntity {


    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ unique : true})
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.ACTIVE
    })
    status: Status;

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt)
    }

}