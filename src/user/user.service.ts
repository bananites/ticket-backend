import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id: id });
  }

  findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email: email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const userData = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(userData);
  }

  async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email: email});

    if(!user){
      throw new NotFoundException(`User with Email ${email} not found`);
    }
   
    // update user with provided data
    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  
  }
}
