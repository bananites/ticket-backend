import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { UnauthorizedException } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { JwtPayload } from "jsonwebtoken";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            //TODO pass env var
            secretOrKey: process.env.SECRET_OR_KEY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user: User = await this.userRepository.findOne({select: ["id", "email", "password"], where: {email}});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}