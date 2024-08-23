import { ApiProperty } from "@nestjs/swagger";

export class AuthCredentialsDto{

    @ApiProperty({
        required: true,
        default: "example@example.de"
    })
    email: string

    @ApiProperty({
        required: true,
        default: "password123!"
    })
    password: string
}