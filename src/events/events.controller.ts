import { 
    Body,
    Controller, 
    Post, 
    UseGuards, 
    UseInterceptors 
} from '@nestjs/common';
import { 
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse, 
    ApiOperation, 
    ApiTags 
} from '@nestjs/swagger';
import { GetUser } from 'common/decorators/get-user.decorator';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { responseSuccessDto } from 'common/responses/global.reponse';
import { User } from 'src/users/user.entity';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventsService } from './events.service';

@ApiTags('events')
@ApiBearerAuth('Authorization')
@UseInterceptors(responseSuccessDto)
@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @ApiOperation({ summary: '이벤트 참여 API'})
    @ApiCreatedResponse({
        status: 201,
        description: '이벤트 참여 성공',
        type: responseSuccessDto,
    })
    @ApiBody({ type: CreateEventDto })
    @Post()
    async postEventResult(@GetUser() user: User, @Body() body: CreateEventDto ) {
        return await this.eventsService.createEventResult(user.userIdx, body);
    }
}
