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
import { jwtConstants } from './jwtConstants';

@Module({
  imports: [
    UserModule,
    // REGISTERING PASSPORT AND JWT
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      //TODO add env var
      secret: jwtConstants.secret, // SECRET KEY - TEXT OR FILE
      signOptions: {
        expiresIn: '60s', // TOKEN EXPIRY TIME
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
