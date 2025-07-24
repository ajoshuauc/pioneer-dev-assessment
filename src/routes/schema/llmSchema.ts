import { z } from 'zod';

export const LLMResponseSchema = z.object({
    action: z.literal('restaurant_search'),
    parameters: z.object({
        query: z.string(),
        near: z.string(),
        price: z.union([
            z.literal('1'),
            z.literal('2'),
            z.literal('3'),
            z.literal('4'),
        ]),
        open_now: z.boolean(),
    }),
});

export type LLMResponse = z.infer<typeof LLMResponseSchema>;