import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { RefreshTokenDTO } from './dto/refreshToken.dto';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string, refreshToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('refresh')
  refreshTokens(@Req() refreshTokenDTO: RefreshTokenDTO):
    Promise<{ accessToken: string, refreshToken: string }> {
    const email = refreshTokenDTO.req.user['sub'].email;
    const refreshToken = refreshTokenDTO.req.user['refreshToken']

    return this.authService.refreshTokens(email, refreshToken);

  }
}
