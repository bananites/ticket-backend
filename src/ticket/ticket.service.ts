import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  async findOneBy(id): Promise<Ticket> {
    return this.ticketRepository.findOneBy(id);
  }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticketData = await this.ticketRepository.create(createTicketDto);
    return this.ticketRepository.save(ticketData);
  }
}
