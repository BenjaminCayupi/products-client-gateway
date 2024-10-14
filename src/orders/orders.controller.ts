import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersClient.send('findAllOrders', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send('findOneOrder', { id });
  }
}
