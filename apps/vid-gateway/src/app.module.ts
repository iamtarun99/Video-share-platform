import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'BROWSE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.HOSTNAME_BROWSE_SERVICE,
          port: 3001,
        },
      },
      {
        name: 'SEARCH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.HOSTNAME_SEARCH_SERVICE,
          port: 3002,
        },
      },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
