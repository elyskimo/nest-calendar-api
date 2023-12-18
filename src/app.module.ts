import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { EventModule } from './event/event.module';
import { Event } from './event/entities/event.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './middleware/auth.middleware';
import { EventController } from './event/event.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule, 
    // DatabaseModule
    EventModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [
            // __dirname + '/../**/*.entity{.ts,.js}',
            User, 
            Event
        ],
        synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    // .exclude(
    //   { path: 'auth', method: RequestMethod.ALL },
    //   'auth/(.*)',
    // )
    .forRoutes(EventController);
    console.log('APP MODULE end');
  }
}
