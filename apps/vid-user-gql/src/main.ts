import { NestFactory } from '@nestjs/core';
import { VidUserGqlModule } from './vid-user-gql.module';

async function bootstrap() {
  const app = await NestFactory.create(VidUserGqlModule);
  app.listen(3010).then(()=> console.log('User GQL Microservice running at 3010'));

}
bootstrap();
