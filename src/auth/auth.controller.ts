import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

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
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req):
    Promise<{ accessToken: string, refreshToken: string }> {
    const email = req.user['sub'].email;
    const refreshToken = req.user['refreshToken']

    return this.authService.refreshTokens(email, refreshToken);

  }
}
