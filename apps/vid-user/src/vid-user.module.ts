import { Module } from '@nestjs/common';
import { VidUserController } from './vid-user.controller';
import { VidUserService } from './vid-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './schemas/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bxwcgdk.mongodb.net/video-share?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema, collection: 'users' }])
],
  controllers: [VidUserController],
  providers: [VidUserService, UserModel],
})
export class VidUserModule {}
