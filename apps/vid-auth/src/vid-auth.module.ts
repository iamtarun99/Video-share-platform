import { Module } from '@nestjs/common';
import { VidAuthController } from './vid-auth.controller';
import { VidAuthService } from './vid-auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'qwerty', // Replace with your actual secret key
      // Additional JWT configuration options
    }),
  ],
  controllers: [VidAuthController],
  providers: [VidAuthService],
})
export class VidAuthModule {}
