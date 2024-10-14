import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { envs, ORDER_SERVICE } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.orderMicroserviceHost,
          port: envs.orderMicroservicePort,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
