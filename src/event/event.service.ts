import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventParams } from 'src/utils/types';

@Injectable()
export class EventService {
  constructor(@InjectRepository(Event) private eventRepository: Repository<Event>) {}

  create(createEventDto: CreateEventParams) {
    // const newEvent = this.eventRepository.create({
    //     ...createEventDto, 
    //     // createdAt: new Date()
    // });
    const { userId, ...eventData } = createEventDto;
    console.log("********************************************** CREATE EVENT ********************************************** ");
    console.log(userId,eventData);
    const newEvent = this.eventRepository.create({
        ...eventData,
        // other properties...
        userId: userId // or user: userId
    });
    this.eventRepository.save(newEvent);
    return newEvent;
    // return 'This action adds a new event';
  }

  findAll() {
    return this.eventRepository.find();
    // return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
