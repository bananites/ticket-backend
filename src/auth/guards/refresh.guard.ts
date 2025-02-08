import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "../auth.service";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class RefreshGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        const email = request.body.email

        if (!token || !email) {
            throw new UnauthorizedException();
        }


        try {

            const user = await this.userService.findOneByEmail(email);
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