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

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
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
    async createMany(users: User[]) {
        const queryRunner = this.datasource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(users[0]);
            await queryRunner.manager.save(users[1]);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally{
            await queryRunner.release();
        }
    }
}
