import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dtos/create-event.dto';
import { Event } from './event.entity';
import { eventRepository } from './event.repository';

@Injectable()
export class EventsService {
    constructor(@InjectRepository(Event) private readonly eventRepository: eventRepository) {}

    async createEventResult(userIdx: number, body: CreateEventDto) {
        const event = await this.eventRepository.create({ 
            userIdx,  
            ques1: parseInt(body.ques1),
            ques2: parseInt(body.ques2),
            ques3: parseInt(body.ques3),
            ques4: parseInt(body.ques4),
            ques5: parseInt(body.ques5),
        });
        await this.eventRepository.save(event);
        return {
            isSuccess: true,
            statusCode: 201,
            message: '이벤트 참여 성공',
            data: event
        }
    }
}
