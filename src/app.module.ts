import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { getConnectionOptions } from 'typeorm';



@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'}), 

    UserModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'TicketSystem',
      entities: [],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.dev.env'}),

  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
