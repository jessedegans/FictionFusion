import { Injectable } from '@nestjs/common';
import {HuggingFace} from 'huggingface';
import { Configuration, OpenAIApi } from 'openai';
@Injectable()
export class AppService {
  private readonly openAI: OpenAIApi;
  private readonly huggingFace: HuggingFace;
  constructor() {
    //init OPENAI
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.openAI = new OpenAIApi(configuration);

    //init HuggingFace
    this.huggingFace = new HuggingFace(process.env.HUGGINGFACE_API_KEY);
  }

  async coWriteStory(story: string): Promise<string> {
    console.log(story)
    const response = await this.openAI.createCompletion({
      model: 'text-davinci-003',
      prompt: story,
      max_tokens: 100,
      n: 1,
      stop: '.', // stop at the end of a sentence
    });
    return `${story}${response.data.choices[0].text}.`;
    
  }
  async coWriteStoryHuggingFace(story: string, model:string): Promise<string> {
    console.log(story)
    const response = await this.huggingFace.textGeneration({
      model: model,
      inputs: story,
      parameters: {
        temperature: 0.7, //because both are big model we need to lower the temperature
        top_p: 0.9, //determines the highest probability that an output can have and still be included in the set of possible outputs
        repetition_penalty: 1.2, //trying to avoid repetition
        do_sample: true, //Trying to create more diverse output here.  Sample from the distribution over possible outputs.
        num_return_sequences: 1,
      },
    });
    //only return first sentence because there is no stop parameter
    let generated_text_fixed = response.generated_text.replace(/(\r\n|\n|\r)/gm, " ");
    return `${story} ${generated_text_fixed}`;
  }
    
    
}
