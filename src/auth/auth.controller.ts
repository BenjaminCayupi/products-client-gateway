import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    try {
      const res = await firstValueFrom(
        this.client.send('auth.register.user', registerUserDto),
      );

      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      const res = await firstValueFrom(
        this.client.send('auth.login.user', loginUserDto),
      );

      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('verify')
  async verifyUser() {
    try {
      const res = await firstValueFrom(
        this.client.send('auth.verify.user', {}),
      );

      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
