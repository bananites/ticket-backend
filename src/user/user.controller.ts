import { Body, Controller, Delete, Get, HttpCode,  NotFoundException, Param, Patch, Post, } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/index';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,) { }



  // GET /api/v1/users
  @Get()
  async findAll() {
    const user = await this.repository.find();

    return { success: true, count: user.length, data: user };
  }


  // GET /api/v1/goals/:id
  @Get(':id')
  async findOne(@Param('id') id) {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();

    }
    return { success: true, data: user };
  }


  // POST /api/v1/user
  @Post()
  async create(@Body() input: CreateUserDto) {
    const user = {
      ...input,
      createdAt: new Date(input.createdAt),
      updatedAt: new Date(input.updatedAt),
    };

    return { success: true, data: user };
  }


  // PATCH /apu/v1/goals/:id
  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateUserDto) {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }

    const data = await this.repository.save({
      ...user,
      ...input,
      createdAt: input.createdAt ?? user.createdAt,
      updatedAt: input.updatedAt ?? user.updatedAt

    });

    return {success: true, data};

  };



// DELETE /api/v1/users/:id
@Delete(':id')
@HttpCode(204)
async remove(@Param('id') id) {

  const user = await this.repository.findOneBy({ id });

  if(!user){
    throw new NotFoundException();

  }

  await this.repository.remove(user); 

}

}

