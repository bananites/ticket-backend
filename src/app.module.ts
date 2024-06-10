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


@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),

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
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {

  constructor(private datasource: DataSource) { }
}
