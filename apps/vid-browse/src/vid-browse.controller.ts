import { Controller, Get } from '@nestjs/common';
import { VidBrowseService } from './vid-browse.service';
import { Video } from './dtos/video-browse.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class VidBrowseController {
  constructor(private readonly vidBrowseService: VidBrowseService) {}

  @Get()
  getHello(): string {
    return this.vidBrowseService.getHello();
  }

  @MessagePattern('getAllVideos')
  async getAllVideos(): Promise<Video[]> {
    // Implement logic to retrieve all videos from the database
    return this.vidBrowseService.getAllVideos();
  }
}


