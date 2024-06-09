import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/index';
import { User } from './entities/user.entity';
import { Status } from './enums';
import { GLOBAL_MODULE_METADATA } from '@nestjs/common/constants';
import { throws } from 'assert';


/**
 * Controller sind Klassen die dafür verantwortlich ist, HTTP-Anfragen zu empfangen und entsprechende Antworten zu senden.
 * Controller verarbeiten ANfragen, die von Clients gesendet werden. Sie dienen als Vermittler zwischen den eingehenden
 * Anfragen und den Geschäftslogiken oder Datenbankoperationen die in der Anwendung stattfinden.
 */

/**
 * Hauptaufgaben,
 * Routen definieren
 * Anfragen verarbeiten
 * Antwort senden
 */

@Controller('users')
export class UserController {


  private users: User[] = [
    {
      id: 1,
      username: 'Learn tRPC',
      password: "password",
      status: Status.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      username: 'Learn Nest.js',
      password: 'password',
      status: Status.IN_PROGRESS,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  @Get()
  findAll() {
    return this.users;
  }

  @Get(':id')
  findOne(@Param('id') id) {
    const user = this.users.find((user) => user.id === parseInt(id));

    return user;

  }

  @Post()
  create(@Body() input: CreateUserDto) {
    const user = {
      ...input,
      createdAt: new Date(input.createdAt),
      updatedAt: new Date(input.updatedAt),
      id: this.users.length + 1,
    };

    this.users.push(user);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() input: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === parseInt(id));

    this.users[index] = {
      ...this.users[index],
      ...input,
      createdAt: input.createdAt
        ? new Date(input.createdAt)
        : this.users[index].createdAt,
      updatedAt: input.updatedAt
        ? new Date(input.updatedAt)
        : this.users[index].updatedAt,

    };
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id) {
    
    this.users= this.users.filter((user) => user.id !== parseInt(id));

  }

}

