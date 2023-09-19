import { Module } from '@nestjs/common';
import { VidAuthController } from './vid-auth.controller';
import { VidAuthService } from './vid-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    JwtModule.register({
      secret: 'qwerty', // Replace with your actual secret key
      signOptions: { expiresIn: '180s' },
    }),
    ClientsModule.register([
    {
      name: 'USER_SERVICE',
      transport: Transport.TCP,
      options: {
        host: process.env.HOSTNAME_USER_SERVICE,
        port: 3005,
      },
    },
  ]),
  ],
  controllers: [VidAuthController],
  providers: [VidAuthService],
})
export class VidAuthModule {}
