import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VidAuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userMS: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async validateUser(user): Promise<any> {
    return await firstValueFrom(this.userMS.send('validate-user', user));
  }

  // This method generates a JWT token for the authenticated user
  async generateJwtToken(user: any): Promise<string> {
    // Define the payload that will be encoded in the token
    const payload = {
      userId: user?.userId, // User's ID or a unique identifier
      email: user?.email, // User's username or email
    };

    // Generate and sign the JWT token
    const token = this.jwtService.sign(payload);
    return token;
  }
}
