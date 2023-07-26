import { Module } from '@nestjs/common';
import { VidBrowseController } from './vid-browse.controller';
import { VidBrowseService } from './vid-browse.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from './schemas/video.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bxwcgdk.mongodb.net/video-share?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema, collection: 'videos' }]),
  ],
  controllers: [VidBrowseController],
  providers: [VidBrowseService],
})
export class VidBrowseModule {}
