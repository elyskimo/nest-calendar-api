import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Event]), 
      UserModule
  ],
  controllers: [EventController],
  providers: [EventService], 
})
export class EventModule {}
