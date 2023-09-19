import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Video } from './dtos/video-gateway.dto';

@Controller('/api/v1')
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('BROWSE_SERVICE') private readonly browseMS: ClientProxy,
    @Inject('SEARCH_SERVICE') private readonly searchMS: ClientProxy) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/browse')
  async browse(): Promise<Video[]> {
    return await firstValueFrom(this.browseMS.send('getAllVideos',{}));
  }

  @Get('/search')
  async search(@Query('query') query: string): Promise<Video[]> {
    return await firstValueFrom(this.searchMS.send('searchVideos', query));
  }
  
}
