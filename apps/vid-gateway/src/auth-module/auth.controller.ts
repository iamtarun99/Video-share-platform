import {
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  Request,
  Body
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { HttpService } from '@nestjs/axios';

@Controller('/api/v1')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authMS: ClientProxy,
    @Inject('USER_SERVICE') private readonly userMS: ClientProxy,
    private readonly httpService: HttpService
  ) {}

  @Get('/check-auth') // for testing only
  getHello(): string {
    return 'Hello World!';
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: Request & {user: any}): Promise<{token: string}> {
    return await firstValueFrom(this.authMS.send('login', req.user));
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Request() req: Request & {user: any}): Promise<any> {
    return await firstValueFrom(this.userMS.send('profile', req.user));
  }

  @Post('/user-graphql')
  async user(@Body('query') query: string): Promise<any> {
    const res = await firstValueFrom(this.httpService.post(`http://${process.env.HOSTNAME_USER_GQL_SERVICE}:3010/graphql`, {query}));
    return res?.data;
  }
}
