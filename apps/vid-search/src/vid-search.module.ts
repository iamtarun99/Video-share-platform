import { Module } from '@nestjs/common';
import { VidSearchController } from './vid-search.controller';
import { VidSearchService } from './vid-search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModel, VideoSchema } from './schemas/video.schema';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bxwcgdk.mongodb.net/video-share?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema, collection: 'videos' }]),
  ],
  controllers: [VidSearchController],
  providers: [VidSearchService, VideoModel],
})
export class VidSearchModule {}
