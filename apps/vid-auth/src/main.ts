import { NestFactory } from '@nestjs/core';
import { VidAuthModule } from './vid-auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(VidAuthModule, {
    options: {
      transport: Transport.TCP,
      port: 3008,
      host: '0.0.0.0'
    }
  });
  await app.listen().then(()=> console.log('Auth Microservice running at 3008'));
    //Additional http server created for testing purpose only as above server listens only TCP requests.
    const httpServer = await NestFactory.create(VidAuthModule);
    httpServer.listen(3009);
}
bootstrap();
