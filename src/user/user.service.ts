import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private datasource: DataSource) { }



    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User | undefined > {
        return this.usersRepository.findOneBy({ id: id});
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async create(
        createUserDto: CreateUserDto,
    ): Promise<User> {
        const userData =
            await this.usersRepository.create(
                createUserDto
            );
            return this.usersRepository.save(userData);
    }

}
