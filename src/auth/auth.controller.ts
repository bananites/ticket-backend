import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { RefreshTokenDTO } from './dto/refreshToken.dto';
import { RefreshGuard } from './guards/refresh.guard';

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
  @UseGuards(RefreshGuard)
  @Post('refresh')
  // refreshTokens(@Req() refreshDTO: RefreshTokenDTO):
  refreshTokens(@Body() refreshDTO: RefreshTokenDTO):
    Promise<{email:string,  accessToken: string, refreshToken: string }> {

    const email = refreshDTO.email

    return this.authService.refreshTokens(email);

  }
}
