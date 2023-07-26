import { NestFactory } from '@nestjs/core';
import { VidBrowseModule } from './vid-browse.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(VidBrowseModule, {
    options: {
      transport: Transport.TCP,
      port: 3001,
      host: '0.0.0.0'
    }
  });

  await app.listen().then(()=> console.log('Browse Microservice running at 3001'));

  //Additional http server created for testing purpose only as above server listens only TCP requests.
  const httpServer = await NestFactory.create(VidBrowseModule);
  httpServer.listen(3003);
}
bootstrap();
