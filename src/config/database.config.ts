import { DataSource } from 'typeorm';
import { DATA_SOURCE } from './datasource.config';

export const databaseConfig = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/**/database/migrations/*{.ts,.js}'],
        logging: true,
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
