import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';                                                 
import { CreateUserDto } from './dto/create-user.dto';
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

@Controller()
export class UserController {

  userService: UserService;

  constructor() {}


  @Get()
  getUsers(): any {
    return this.userService.findAll();
  }

  // @Post()
  // createUser(@Body() newUser: CreateUserDto): string{
  //   if(!newUser.username || !newUser.email){
  //       throw new HttpException('Username and email are required fields', HttpStatus.BAD_REQUEST);

  //   }
  //   this.users.push(newUser);
  //   return "User created successfully";
  // }

  // @Put(':id')
  // updateUser(@Param('id') id: number, @Body() updatedUser: any): string{
  //   this.users[id]= updatedUser;
  //   return`User with ID ${id} updated successfully`
  // }

}
