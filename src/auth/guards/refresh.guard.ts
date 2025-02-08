import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

type PayloadType =  {
    email: string;
}

@Injectable()
export class RefreshGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        // const email = request.body.email

        if (!token) {
            throw new UnauthorizedException();
        }


        try {

            const decodeJWT = this.jwtService.decode(token);
            console.log(decodeJWT.sub.email)

            const user = await this.userService.findOneByEmail(decodeJWT.sub.email);
            if(!user || !user.refreshToken){
                throw new ForbiddenException('Access Denied');
            }

            const refreshTokenMatches = await bcrypt.compare(token, user.refreshToken);

            if(!refreshTokenMatches){
                throw new ForbiddenException('Access Denied');
            }

            return true;
        } catch {
            throw new UnauthorizedException();
        }

    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}