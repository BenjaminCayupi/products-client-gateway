import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  public name: string;

  @IsNumber({ maxDecimalPlaces: 4 })
  @IsPositive()
  @Min(0)
  @IsNotEmpty()
  @Type(() => Number)
  public price: number;
}
