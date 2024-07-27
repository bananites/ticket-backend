import { Body, Controller, Delete, Get, HttpCode,  NotFoundException, Param, Patch, Post, } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/index';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';

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
    // @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly userService: UserService) { }



  // // GET /api/v1/users
  // @Get()
  // async findAll() {
  //   const user = await this.repository.find();

  //   return { success: true, count: user.length, data: user };
  // }


  // GET /api/v1/users/:id
  @Get(':id')
  async findOne(@Param('id') id): Promise<User>{

    return this.userService.findOne(id);
  }


  // POST /api/v1/user
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
   try{
    await this.userService.create(
      createUserDto
    );

    return{
      success: true,
      message: 'User created successfully'
    };
   } catch(error){
    return {
      success: false,
      message: error.message,
    };
   }
  }


  // // PATCH /apu/v1/goals/:id
  // @Patch(':id')
  // async update(@Param('id') id, @Body() input: UpdateUserDto) {
  //   const user = await this.repository.findOneBy({ id });

  //   if (!user) {
  //     throw new NotFoundException();
  //   }

  //   const data = await this.repository.save({
  //     ...user,
  //     ...input,
  //     createDateTime: input.createDateTime ?? user.createDateTime,
  //     lastChangedDateTime: input.lastChangedDateTime ?? user.lastChangedDateTime

  //   });

  //   return {success: true, data};

  // };



// DELETE /api/v1/users/:id
// @Delete(':id')
// @HttpCode(204)
// async remove(@Param('id') id) {

//   const user = await this.repository.findOneBy({ id });

//   if(!user){
//     throw new NotFoundException();

//   }

//   await this.repository.remove(user); 

// }

}

