import { IsOptional, IsEnum } from 'class-validator';
import { OrderStatusList, OrderStatus } from '../enum/order.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `status must be one of these options ${OrderStatusList}`,
  })
  status: OrderStatus;
}
