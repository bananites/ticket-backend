import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // JWT
import { User } from 'src/user/entities/user.entity';
import { JwtPayload } from 'jsonwebtoken';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn(
    authcredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authcredentialsDto;
    const user: User = await this.userService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // PREVIOUSLY HERE ONLY successful message
      // JWT TOKEN FOR SECURE

      const userFirstname: string = user.firstname
      const userLastname: string = user.lastname
      const payload: JwtPayload = { userFirstname, userLastname, email };
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }
}