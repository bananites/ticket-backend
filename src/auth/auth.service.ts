import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
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
  ): Promise<{  email: string, accessToken: string, refreshToken: string }> {
    const { email, password } = authcredentialsDto;
    const user: User = await this.userService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // JWT TOKEN FOR SECURE


      // TOKENS access and refresh token
      const tokens = await this.getTokens(user.email) ;
      await this.updateRefreshToken(email, tokens.refreshToken);
      return tokens;


    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }


  async getTokens(email: string) {

    const jwtPayload: JwtPayload = { email: email }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        sub: jwtPayload
      }, {
        secret: jwtConstants.secret,
        expiresIn: '60s',
      }),
      this.jwtService.signAsync({
        sub: jwtPayload
      }, {
        secret: jwtConstants.secretRefresh,
        expiresIn: '60m'
      })
    ])
    return { email, accessToken, refreshToken };
  }



  async updateRefreshToken(email: string, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    await this.userService.update(email, { refreshToken: hashedRefreshToken });
  }

  async refreshTokens(email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.email);
    return tokens;
  }
}