import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {

    constructor(
        // @InjectRepository(Ticket) private readonly repository: Repository<Ticket>,
        private readonly ticketService: TicketService
    ) { }

    // GET /api/v1/ticket

    @Get()
    async findAll(): Promise<Ticket[]>{

        return await this.ticketService.findAll();
    }

    // GET /api/v1/tickets/:id
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Ticket> {
        const ticket = await this.ticketService.findOneBy({ id });
        if (!ticket) {
            throw new NotFoundException();

        }
        return ticket;
    }

    // POST /api/v1/ticket
    @Post()
    async create(@Body() createTicketDto: CreateTicketDto){
        try{
           const ticket = await this.ticketService.create(
                createTicketDto
            );

            return{
                ticketId: ticket.id,
                success: true,
                message: 'Ticket created successfully'
                

            };
        } catch(error){
            return{
                success: false,
                message: error.message,
            };
        }
   }


}
