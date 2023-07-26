import { NestFactory } from '@nestjs/core';
import { VidSearchModule } from './vid-search.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(VidSearchModule, {
    options: {
      transport: Transport.TCP,
      port: 3002,
      host: '::'
    }
  });
  await app.listen().then(()=> console.log('Search Microservice running at 3002'));

  //Additional http server created for testing purpose only as above server listens only TCP requests.
  const httpServer = await NestFactory.create(VidSearchModule);
  httpServer.listen(3004);
}
bootstrap();
