import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dtos/create-event.dto';
import { Event } from './event.entity';
import { eventRepository } from './event.repository';

@Injectable()
export class EventsService {
    constructor(@InjectRepository(Event) private readonly eventRepository: eventRepository) {}

    async createEventResult(userIdx: number, body: CreateEventDto) {
        const event = await this.eventRepository.create({ userIdx, ...body });
        await this.eventRepository.save(event);
        return {
            isSuccess: true,
            statusCode: 201,
            message: '이벤트 참여 성공',
            data: event
        }
    }
}
