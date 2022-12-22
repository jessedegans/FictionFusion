import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    coWriteStory(body: any): Promise<string>;
    coWriteStoryJ(body: any): Promise<string>;
    coWriteStoryNeo(body: any): Promise<string>;
}
