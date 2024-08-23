
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'; 
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [  // REGISTERING PASSPORT AND JWT
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      //TODO add env var
      secret: 'topSecret92',   // SECRET KEY - TEXT OR FILE
      signOptions: {
        expiresIn: 3600        // TOKEN EXPIRY TIME
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}