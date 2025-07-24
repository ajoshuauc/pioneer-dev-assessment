import { GROQ_API_KEY } from "../utils/env";
import Groq from "groq-sdk";
import { LLMResponse, LLMResponseSchema } from "../routes/schema/llmSchema";
import { z } from 'zod';

const client = new Groq({
  apiKey: GROQ_API_KEY // This is the default and can be omitted
});

export async function getStructuredJson(message: string): Promise<LLMResponse> {
    const response = await client.chat.completions.create({
        model: 'llama3-70b-8192',
        messages: [
            {
                role: 'system',
                content: `
                    Convert the following user input into this exact JSON format:
                    {
                        "action": "restaurant_search",
                        "parameters": {
                            "query": "<string>",
                            "near": "<string>",
                            "price": "<1-4>",
                            "open_now": <true|false>
                        }
                    }
                    Only output valid JSON. Do not include any extra text.
                `
            },
            { role: 'user', content: message}
        ],
        temperature: 0,
    });

    const content = response.choices[0]?.message?.content ?? '';

    let jsonOutput: unknown;

    try{
        jsonOutput = JSON.parse(content);
    }catch {
        throw new Error('LLM did not return valid JSON.');
    }

    try {
        return LLMResponseSchema.parse(jsonOutput);
    } catch (err) {
        if (err instanceof z.ZodError) {
            console.error('Invalid LLM Response', err)
        }
        throw new Error('LLM returned invalid JSON structure')
    }
};