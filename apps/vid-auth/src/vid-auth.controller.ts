import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { VidAuthService } from './vid-auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class VidAuthController {
  constructor(private readonly vidAuthService: VidAuthService) {}

  @Get()
  getHello(): string {
    return this.vidAuthService.getHello();
  }

  @MessagePattern('login')
  async login(data: any): Promise<any> {
    // The local strategy has successfully authenticated the user.
    // Generate a JWT token and return it in the response.
    console.log('payload for token: ',data);
    const token = await this.vidAuthService.generateJwtToken(data);
    return { token };
  }

  @MessagePattern('validate-user')
  async validateUser(data: any): Promise<any> {
    // Used by local strategy to validate user
    return this.vidAuthService.validateUser(data);
  }

}