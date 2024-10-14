import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, StatusDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { PaginationDto } from 'src/common';

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
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders', orderPaginationDto);
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id }),
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return this.ordersClient.send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() status: StatusDto,
  ) {
    try {
      const updatedOrder = await firstValueFrom(
        this.ordersClient.send('changeOrderStatus', {
          id,
          status: status.status,
        }),
      );

      return updatedOrder;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
