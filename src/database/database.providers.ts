import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '',
        database: 'calendar',
        entities: [
            // __dirname + '/../**/*.entity{.ts,.js}',
            User
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];