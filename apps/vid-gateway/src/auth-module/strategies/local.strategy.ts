// local.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH_SERVICE') private readonly authMS: ClientProxy) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await firstValueFrom(this.authMS.send('validate-user-credentials',{email, password}));
    if (!user) {
        throw new UnauthorizedException('Invalid credentials.');
    }
    return user;
  }
}