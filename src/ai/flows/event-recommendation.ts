// src/ai/flows/event-recommendation.ts
'use server';

/**
 * @fileOverview A flow for generating event recommendations based on user preferences.
 *
 * - generateEventRecommendations - A function that generates event recommendations.
 * - EventRecommendationInput - The input type for the generateEventRecommendations function.
 * - EventRecommendationOutput - The output type for the generateEventRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EventRecommendationInputSchema = z.object({
  userPreferences: z
    .string()
    .describe(
      'A description of the user\u2019s preferences, including past events they have attended or shown interest in.'
    ),
  eventList: z
    .string()
    .describe(
      'A list of available events, including their descriptions and categories.'
    ),
});
export type EventRecommendationInput = z.infer<typeof EventRecommendationInputSchema>;

const EventRecommendationOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of recommended events based on the user\u2019s preferences.'
    ),
});
export type EventRecommendationOutput = z.infer<typeof EventRecommendationOutputSchema>;

export async function generateEventRecommendations(
  input: EventRecommendationInput
): Promise<EventRecommendationOutput> {
  return eventRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'eventRecommendationPrompt',
  input: {schema: EventRecommendationInputSchema},
  output: {schema: EventRecommendationOutputSchema},
  prompt: `You are an event recommendation system. You will receive user preferences and a list of available events. Based on the user's preferences, you will recommend events from the list.

User Preferences: {{{userPreferences}}}

Available Events: {{{eventList}}}

Recommendations:`, 
});

const eventRecommendationFlow = ai.defineFlow(
  {
    name: 'eventRecommendationFlow',
    inputSchema: EventRecommendationInputSchema,
    outputSchema: EventRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
