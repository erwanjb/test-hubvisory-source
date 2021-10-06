import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './secrets';
import { User } from '../user/user.entity';

export const typeOrmConfig = {
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [User],
    synchronize: true
};