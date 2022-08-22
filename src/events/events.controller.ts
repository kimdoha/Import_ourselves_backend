import { 
    Controller, 
    UseGuards, 
    UseInterceptors 
} from '@nestjs/common';
import { 
    ApiCreatedResponse, 
    ApiOperation, 
    ApiTags 
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { responseSuccessDto } from 'common/responses/global.reponse';
import { EventsService } from './events.service';

@ApiTags('events')
@UseInterceptors(responseSuccessDto)
@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @ApiOperation({ summary: '이벤트 참여 API'})
    @ApiCreatedResponse({

    })
    async postEventResult() {

    }
}
