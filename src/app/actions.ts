'use server';

import { z } from 'zod';
import type { Event } from '@/lib/types';
import { generateEventRecommendations } from '@/ai/flows/event-recommendation';
import { generateImage } from '@/ai/flows/image-generator';

const bookTicketsSchema = z.object({
  ticketType: z.string(),
  quantity: z.number(),
});

export async function bookTicketsAction(values: unknown) {
  const parsed = bookTicketsSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: 'Invalid input.' };
  }

  // Simulate network delay and processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log('Booking successful:', parsed.data);

  // In a real app, you would handle database operations,
  // payment processing, and sending emails here.

  return { success: true };
}

export async function getRecommendationsAction(
  currentEvent: Event,
  allEvents: Event[]
): Promise<Event[]> {
  try {
    const userPreferences = `User is interested in an event titled "${currentEvent.title}". Description: ${currentEvent.description}`;

    const eventList = allEvents
      .map((e) => `Title: ${e.title}, Description: ${e.description}`)
      .join('\n');

    const response = await generateEventRecommendations({
      userPreferences,
      eventList,
    });

    const recommendedTitlesText = response.recommendations;

    // A simple parsing strategy. Assumes AI returns a list of titles.
    const recommendedTitles = recommendedTitlesText
      .split('\n')
      .map((line) => line.replace(/^- /, '').trim())
      .filter(Boolean);
    
    // Find the full event objects for the recommended titles
    const recommendedEventsRaw = allEvents.filter(event => 
      recommendedTitles.some(title => event.title.toLowerCase().includes(title.toLowerCase()))
    ).slice(0, 3);
    
    // Now, generate images for the recommended events.
    const recommendedEventsWithImages = await Promise.all(
      recommendedEventsRaw.map(async (event) => {
        try {
          const result = await generateImage({ prompt: event.imageHint });
          return { ...event, imageUrl: result.imageUrl };
        } catch (error) {
          console.error(`Failed to generate image for recommended event ${event.id}:`, error);
          // Fallback to the original placeholder image if generation fails
          return event;
        }
      })
    );

    return recommendedEventsWithImages;
  } catch (error) {
    console.error('Error getting recommendations from AI:', error);
    return [];
  }
}
