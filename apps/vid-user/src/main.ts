import { NestFactory } from '@nestjs/core';
import { VidUserModule } from './vid-user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(VidUserModule, {
    options: {
      transport: Transport.TCP,
      port: 3005,
      host: '0.0.0.0'
    }
  });

  await app.listen().then(()=> console.log('User Microservice running at 3005'));

  //Additional http server created for testing purpose only as above server listens only TCP requests.
  const httpServer = await NestFactory.create(VidUserModule);
  httpServer.listen(3006);
}
bootstrap();
