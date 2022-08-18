import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { join } from 'path';
import 'dotenv/config';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.MASTER_DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.PROD_NAME,
    entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
    autoLoadEntities: true,
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
};