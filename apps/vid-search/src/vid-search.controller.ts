import { Controller, Get, Param } from '@nestjs/common';
import { VidSearchService } from './vid-search.service';
import { Video } from './dtos/video-search.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class VidSearchController {
  constructor(private readonly vidSearchService: VidSearchService) {}

  @Get()
  getHello(): string {
    return this.vidSearchService.getHello();
  }

  @MessagePattern('searchVideos')
  async searchVideos(query: string): Promise<Video[]> {
    // Implement logic to search videos by title or tags
    return this.vidSearchService.searchVideos(query);
  }
}

