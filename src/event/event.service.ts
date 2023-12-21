import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventParams } from 'src/utils/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private readonly eventRepository: Repository<Event>,
    private userService: UserService,
  ) {}

  async create(createEventDto: CreateEventParams) {

    const { userId, ...eventData } = createEventDto;
    console.log("********************************************** CREATE EVENT ********************************************** ");

    const user = await this.userService.findOneById(Number(userId));

    const newEvent = this.eventRepository.create({
        ...eventData,
        // other properties...
        userId: user // or user: userId
    });
    this.eventRepository.save(newEvent);
    return newEvent;
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
