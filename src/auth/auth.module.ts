import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RefreshTokenStrategy } from './jwtRefresh.strategy';

@Module({
  imports: [
    UserModule,
    // REGISTERING PASSPORT AND JWT
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    JwtStrategy,
    RefreshTokenStrategy,
    UserService,
  ],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule { }
