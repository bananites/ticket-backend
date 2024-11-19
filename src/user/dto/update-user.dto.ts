import { ApiProperty } from "@nestjs/swagger";
import { Status } from "../enums";

export class UpdateUserDto {
    readonly firstname?: string;

    readonly lastname?: string;

    readonly email?: string;

    readonly password?: string;

    readonly refreshToken?: string;

    readonly status?: Status;

    readonly createDateTime?: Date;

    readonly lastChangedDateTime?: Date;

}