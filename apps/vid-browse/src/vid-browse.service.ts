import { Injectable } from '@nestjs/common';
import { Video } from './dtos/video-browse.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VidBrowseService {
  constructor(@InjectModel('Video') private readonly videoModel: Model<Video>){}

  async getAllVideos(): Promise<Video[]> {
    const fetchedData = await this.videoModel.find().exec() || [];
    return fetchedData;
  }
  
  getHello(): string {
    return 'Hello World!';
  }
}