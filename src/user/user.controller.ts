import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/index';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';

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
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // // GET /api/v1/users
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  // GET /api/v1/users/:id
  @Get(':id')
  async findOne(@Param('id') id): Promise<User> {
    return await this.userService.findOne(id);
  }

  // POST /api/v1/users
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);

      return {
        success: true,
        message: 'User created successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // PUT /api/v1/users/:id
  @Put(':id')
  async updateUser(@Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

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
