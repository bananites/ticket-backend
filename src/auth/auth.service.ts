import {
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  import { JwtService } from '@nestjs/jwt'; // JWT
import { User } from 'src/user/entities/user.entity';
import { JwtPayload } from 'jsonwebtoken';
import { AuthCredentialsDto } from './auth-credentials.dto';
  
  @Injectable()
  export class AuthService {
    constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      private jwtService: JwtService
    ) {}

    async signIn(authcredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
      const { email, password } = authcredentialsDto;
      const user = await this.userRepository.findOne({ select: ["id", "email", "password"], where: {email} });
  
      if(user && await bcrypt.compare(password, user.password)) {
          // PREVIOUSLY HERE ONLY successful message
          // JWT TOKEN FOR SECURE
          const payload: JwtPayload = { email };
          const accessToken = this.jwtService.sign(payload);
          return { accessToken };
      } else {
          throw new UnauthorizedException('Please check your login credentials.');
      }
    } 
  }