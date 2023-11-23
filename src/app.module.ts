import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    UserModule, 
    // DatabaseModule
    EventModule,
    TypeOrmModule.forRoot({
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
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
