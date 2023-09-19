import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VidAuthService {
  constructor(private readonly jwtService: JwtService){}

  private usersData = [
    {
      userId: 'u00',
      email: 'abc@mail.com',
      password: 'apple'
    }
  ];

  getHello(): string {
    return 'Hello World!';
  }

  async validateUser({email, password}): Promise<any> {
    const user = await this.usersData.find(user => user.email === email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // This method generates a JWT token for the authenticated user
  async generateJwtToken(user: any): Promise<string> {
    // Define the payload that will be encoded in the token
    const payload = {
      userId: user.userId, // User's ID or a unique identifier
      email: user.email, // User's username or email
      // Add any other user-related data as needed
    };

    // Generate and sign the JWT token
    const token = this.jwtService.sign(payload);

    return token;
  }
}
