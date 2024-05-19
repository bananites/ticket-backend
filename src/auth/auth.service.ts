import { Injectable } from "@nestjs/common";
import { access } from "fs";

@Injectable()
export class AuthService {
    
    jwtOptions;
    jwtService: any;

    constructor(){
        this.jwtOptions = {
            secret: 'secretKey',
            verify: {algorithms: ['HS256']}
        };
    }

    login(user){
        const payload = { username: user.username, sub: user.userId};
        return{
            access_token: this.jwtService.sign(payload, this.jwtOptions)
        };
    }

    validate(payload){
        return{
            userId: payload.sub, 
            username: payload.username
        }
    }
}