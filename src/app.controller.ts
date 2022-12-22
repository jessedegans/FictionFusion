import { Controller,  Post, Body  } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('co-write-GPT3')
  async coWriteStory(@Body() body: any): Promise<string> {
    return await this.appService.coWriteStory(body.text);
  }

  @Post('co-write-GPTJ')
  async coWriteStoryJ(@Body() body: any): Promise<string> {
    return await this.appService.coWriteStoryHuggingFace(body.text, "EleutherAI/gpt-j-6B");
  }
  @Post('co-write-GPTNEO')
  async coWriteStoryNeo(@Body() body: any): Promise<string> {
    return await this.appService.coWriteStoryHuggingFace(body.text, "EleutherAI/gpt-neo-2.7B");
  }
}
