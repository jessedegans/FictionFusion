export declare class AppService {
    private readonly openAI;
    private readonly huggingFace;
    constructor();
    coWriteStory(story: string): Promise<string>;
    coWriteStoryHuggingFace(story: string, model: string): Promise<string>;
}
