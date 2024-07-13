import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { TicketModule } from './ticket/ticket.module';
import { UserService } from './user/user.service';


@Module({
  imports: [
    UserModule,

    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm')),

    }),
    TypeOrmModule.forFeature([User]),
    TicketModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {

  constructor(private datasource: DataSource) { }
}
