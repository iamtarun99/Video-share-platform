import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    JwtModule.register({
      secret: 'qwerty', // Replace with your actual secret key
      signOptions: { expiresIn: '180s' },
      // Additional JWT configuration options
    }),
    PassportModule,
    ClientsModule.register([{
      name: 'AUTH_SERVICE',
      transport: Transport.TCP,
      options: {
        host: process.env.HOSTNAME_AUTH_SERVICE,
        port: 3008,
      },
    },
    {
      name: 'USER_SERVICE',
      transport: Transport.TCP,
      options: {
        host: process.env.HOSTNAME_USER_SERVICE,
        port: 3005,
      },
    },
  ]),
    HttpModule
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, LocalAuthGuard],
})
export class AuthModule {}
