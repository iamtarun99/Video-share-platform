import { Injectable } from '@nestjs/common';
import { Video } from './dtos/video-search.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VidSearchService {
  constructor(@InjectModel('Video') private readonly videoModel: Model<Video>){}

  async searchVideos(query: string): Promise<Video[]> {
    const fetchedData: Video[] = await this.videoModel.find().exec() || [];
    const result = fetchedData.filter((video) => {
      const normalizedQuery = query.toLowerCase();
      const normalizedTitle = video.title.toLowerCase();
      const foundInTitle = normalizedTitle.includes(normalizedQuery);

      const normalizedTags = video.tags.map((tag) => tag.toLowerCase());
      const foundInTags = normalizedTags.includes(normalizedQuery);

      return foundInTitle || foundInTags;
    });

    return result;
  }

  getHello(): string {
    return 'Hello World!';
  }
}