import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // JWT
import { User } from 'src/user/entities/user.entity';
import { JwtPayload } from 'jsonwebtoken';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './jwtConstants';

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
      // JWT TOKEN FOR SECURE

      const userFirstname: string = user.firstname
      const userLastname: string = user.lastname
      const payload: JwtPayload = { userFirstname, userLastname, email };

      //TODO old accesstoken
      // const accessToken = await this.jwtService.signAsync({ payload }, {
      //   secret: jwtConstants.secret,
      //   expiresIn: '10m'
      // });
      // return { accessToken };


      // TODO TOKENS access and refresh token
      const tokens = await this.getTokens(payload);
      await this.updateRefreshToken(email, tokens.refreshToken);
      return tokens;


    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }


  async getTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        sub: payload
      }, {
        secret: jwtConstants.secret,
        expiresIn: '10m',
      }),
      this.jwtService.signAsync({
        sub: payload
      }, {
        secret: jwtConstants.secretRefresh,
        expiresIn: '7d'
      })
    ])
    return { accessToken, refreshToken };
  }


  async updateRefreshToken(email: string, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    await this.userService.update(email, { refreshToken: hashedRefreshToken});
  }
}