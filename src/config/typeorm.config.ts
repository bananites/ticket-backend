import { registerAs } from '@nestjs/config';
import { config as dotenvConfig} from 'dotenv'
import { User } from 'src/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';


dotenvConfig({ path: process.env.NODE_ENV !== 'production' ? '.env.dev' : '.env'});


const configProd = {
    type: `${process.env.DATABASE_TYPE}`,
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: [User],
    migrations: [User],
    autoLoadEntities: true,
    synchronize: false,
}
const config = {
    type: `${process.env.DATABASE_TYPE}`,
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    // TODO do i need this? if yes do index entities?
    // entities: [User],
    // migrations: [User, Ticket],
    autoLoadEntities: true,
    synchronize: true
}

export default registerAs('typeorm', () => process.env.NODE_ENV !== 'production' ? config : configProd)

export const connectionSource = new DataSource(config as DataSourceOptions)