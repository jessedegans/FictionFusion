"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const huggingface_1 = require("huggingface");
const openai_1 = require("openai");
let AppService = class AppService {
    constructor() {
        const configuration = new openai_1.Configuration({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.openAI = new openai_1.OpenAIApi(configuration);
        this.huggingFace = new huggingface_1.HuggingFace(process.env.HUGGINGFACE_API_KEY);
    }
    async coWriteStory(story) {
        console.log(story);
        const response = await this.openAI.createCompletion({
            model: 'text-davinci-003',
            prompt: story,
            max_tokens: 100,
            n: 1,
            stop: '.',
        });
        return `${story}${response.data.choices[0].text}.`;
    }
    async coWriteStoryHuggingFace(story, model) {
        console.log(story);
        const response = await this.huggingFace.textGeneration({
            model: model,
            inputs: story,
            parameters: {
                temperature: 0.7,
                top_p: 0.9,
                repetition_penalty: 1.2,
                do_sample: true,
                num_return_sequences: 1,
            },
        });
        let generated_text_fixed = response.generated_text.replace(/(\r\n|\n|\r)/gm, " ");
        return `${story} ${generated_text_fixed}`;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map