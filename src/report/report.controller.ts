import { 
    Controller,
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Query, 
    Delete, 
    NotFoundException,
    UseGuards
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create.report.dto';
import { UpdateReportDto } from './dtos/update.report'; 
import { UpdateStatusDto } from './dtos/update.status.dto';
import { ReportService } from './report.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { CurrentUser } from 'src/user/decorator/current-user.decorator';
import { User } from 'src/user/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';


@Controller('ticket')
export class ReportController {

    constructor(private reportService: ReportService){}

    @Post('/create')
    @UseGuards(AuthGuard)
    async createTicket(@Body() body: CreateReportDto, @CurrentUser() user: User){
        return this.reportService.create(body, user);
    }

    @Get('/:id')
    async getTicketByid(@Param('id') id: string){
        const report = await this.reportService.get(parseInt(id));
        if(!report){
            throw new NotFoundException('ticket not found');
        }
        return report;
    }

    @Get()
    getAllTicketByStatus(@Query('status') status: string){
        return this.reportService.getAllByStatus(status);
        
    }

    @Delete('/remove/:id')
    removeTicket(@Param('id') id: string){
        return this.reportService.remove(parseInt(id));
    }

    @Patch('/update/:id')
    updateTicket(@Param('id') id: string, @Body() body: UpdateReportDto){
        return this.reportService.update(parseInt(id), body);
    }

    @Patch('/update/status/:id')
    updateTicketStatus(@Param('id') id: string, @Body() body: UpdateStatusDto){
        return this.reportService.update(parseInt(id), body);
    }

}
