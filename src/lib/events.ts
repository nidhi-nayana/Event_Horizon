import type { Event } from './types';
import { generateImage } from '@/ai/flows/image-generator';

const events: Event[] = [
  {
    id: '1',
    title: 'Starlight Symphony',
    description: 'An evening of classical music under the stars.',
    longDescription:
      'Join us for the Starlight Symphony, a magical night where classical music meets the cosmos. Featuring world-renowned conductors and a full orchestra, this open-air concert will transport you to another dimension. Blankets and picnics are encouraged.',
    imageUrl: '/images/events/starlight-symphony.jpg',
    imageHint: 'symphony orchestra',
    date: '2024-08-15T20:00:00Z',
    location: 'Central Park, New York',
    tickets: [
      { type: 'General', price: 50 },
      { type: 'VIP', price: 150 },
    ],
  },
  {
    id: '2',
    title: 'Innovate & Inspire Tech Summit',
    description: 'A two-day summit for tech enthusiasts and professionals.',
    longDescription:
      'The Innovate & Inspire Tech Summit is the premier event for developers, entrepreneurs, and tech leaders. With keynotes from industry giants, hands-on workshops, and networking opportunities, you will leave with the knowledge and connections to shape the future.',
    imageUrl: '/images/events/tech-summit.jpg',
    imageHint: 'tech conference',
    date: '2024-09-20T09:00:00Z',
    location: 'Moscone Center, San Francisco',
    tickets: [
      { type: 'General', price: 300 },
      { type: 'VIP', price: 800 },
    ],
  },
  {
    id: '3',
    title: 'Gourmet Gala',
    description: 'Experience a culinary journey with top chefs.',
    longDescription:
      'The Gourmet Gala brings together the brightest stars of the culinary world for an unforgettable tasting experience. Sample signature dishes, attend live cooking demonstrations, and savor exquisite wine pairings in a luxurious setting.',
    imageUrl: '/images/events/gourmet-gala.jpg',
    imageHint: 'gourmet food',
    date: '2024-10-05T18:00:00Z',
    location: 'The Grand Ballroom, Chicago',
    tickets: [
      { type: 'General', price: 200 },
      { type: 'VIP', price: 500 },
    ],
  },
  {
    id: '4',
    title: 'Abstract Dimensions Art Exhibit',
    description: 'A mind-bending journey through modern abstract art.',
    longDescription:
      'Explore the boundaries of perception at the Abstract Dimensions Art Exhibit. This curated collection features groundbreaking works from international artists, challenging form, color, and texture. An immersive experience for art lovers and curious minds alike.',
    imageUrl: '/images/events/abstract-art.jpg',
    imageHint: 'abstract art',
    date: '2024-11-01T10:00:00Z',
    location: 'Modern Art Museum, Los Angeles',
    tickets: [
      { type: 'General', price: 25 },
      { type: 'VIP', price: 75 },
    ],
  },
  {
    id: '5',
    title: 'Indie Film Festival',
    description: 'Discover the next generation of filmmakers.',
    longDescription:
      'Our annual Indie Film Festival showcases a diverse lineup of feature films, shorts, and documentaries from independent creators around the globe. Participate in Q&A sessions with directors, attend workshops, and vote for the audience choice award.',
    imageUrl: '/images/events/indie-film-festival.jpg',
    imageHint: 'film festival',
    date: '2024-11-12T13:00:00Z',
    location: 'The Indie Theater, Austin',
    tickets: [
      { type: 'General', price: 15 },
      { type: 'VIP', price: 45 },
    ],
  },
  {
    id: '6',
    title: 'Future Beats Electronic Music Fest',
    description: 'A weekend of cutting-edge electronic music.',
    longDescription:
      'Experience the pulse of tomorrow at Future Beats, a festival dedicated to the latest in electronic music. With a lineup of innovative DJs and live acts, stunning visuals, and an electrifying atmosphere, this is the ultimate destination for dance music fans.',
    imageUrl: '/images/events/future-beats.jpg',
    imageHint: 'music festival',
    date: '2024-09-28T16:00:00Z',
    location: 'Digital Dreams Park, Miami',
    tickets: [
      { type: 'General', price: 120 },
      { type: 'VIP', price: 250 },
    ],
  },
  {
    id: '7',
    title: 'Cosmic Comedy Fest',
    description: 'A night of laughter with the galaxy\'s funniest comedians.',
    longDescription:
      'Prepare for liftoff into a universe of humor at the Cosmic Comedy Fest. Featuring a stellar lineup of stand-up comedians, improv troupes, and sketch artists, this event promises non-stop laughs that are out of this world.',
    imageUrl: '/images/events/comedy-fest.jpg',
    imageHint: 'stand-up comedian stage',
    date: '2024-10-19T20:00:00Z',
    location: 'Galaxy Theater, Houston',
    tickets: [
      { type: 'General', price: 40 },
      { type: 'VIP', price: 100 },
    ],
  },
  {
    id: '8',
    title: 'Cityscape Marathon 2024',
    description: 'Run through the heart of the city in our annual marathon.',
    longDescription:
      'Lace up your running shoes for the Cityscape Marathon 2024. Whether you\'re a seasoned runner or a first-timer, this course takes you past iconic landmarks and cheering crowds. Join thousands of others in this celebration of fitness and community spirit.',
    imageUrl: '/images/events/cityscape-marathon.jpg',
    imageHint: 'city marathon runners',
    date: '2024-11-03T07:00:00Z',
    location: 'Downtown Plaza, Chicago',
    tickets: [
      { type: 'General', price: 60 },
      { type: 'VIP', price: 120 },
    ],
  },
  {
    id: '9',
    title: 'Zen Garden Yoga Retreat',
    description: 'A day of peace, meditation, and rejuvenating yoga.',
    longDescription:
      'Escape the hustle and bustle at our Zen Garden Yoga Retreat. Guided by expert instructors, you will flow through rejuvenating yoga sessions, practice mindfulness meditation, and find your inner peace amidst a serene and beautiful garden setting.',
    imageUrl: '/images/events/zen-garden-yoga.jpg',
    imageHint: 'serene yoga retreat',
    date: '2024-09-14T09:30:00Z',
    location: 'Tranquil Gardens, Portland',
    tickets: [
      { type: 'General', price: 85 },
      { type: 'VIP', price: 160 },
    ],
  },
  {
    id: '10',
    title: 'Medieval Kingdom Faire',
    description: 'Step back in time to an age of knights and dragons.',
    longDescription:
      'Hark, noble traveler! The Medieval Kingdom Faire awaits. Witness thrilling jousting tournaments, browse artisan crafts, feast on rustic fare, and be enchanted by minstrels and magicians. A grand day out for the entire family!',
    imageUrl: '/images/events/medieval-kingdom-faire.jpg',
    imageHint: 'medieval jousting festival',
    date: '2024-08-24T11:00:00Z',
    location: 'Castlewood Park, Boston',
    tickets: [
      { type: 'General', price: 30 },
      { type: 'VIP', price: 90 },
    ],
  },
];

// In-memory cache to avoid re-generating images on every request during a server session.
const imageCache = new Map<string, string>();

export function getEvents(): Event[] {
  return events;
}

export function getEventById(id: string): Event | undefined {
  return events.find((event) => event.id === id);
}

export async function getEventsWithImages(): Promise<Event[]> {
  const updatedEvents: Event[] = [];
  for (const event of events) {
    if (imageCache.has(event.id)) {
      updatedEvents.push({ ...event, imageUrl: imageCache.get(event.id)! });
      continue;
    }
    try {
      const result = await generateImage({ prompt: event.imageHint });
      imageCache.set(event.id, result.imageUrl);
      updatedEvents.push({ ...event, imageUrl: result.imageUrl });
    } catch (error) {
      console.error(`Failed to generate image for event ${event.id}:`, error);
      // Fallback to original placeholder if generation fails
      updatedEvents.push(event);
    }
  }
  return updatedEvents;
}

export async function getEventByIdWithImage(id: string): Promise<Event | undefined> {
  const event = events.find((event) => event.id === id);
  if (!event) {
    return undefined;
  }
  
  if (imageCache.has(event.id)) {
    return { ...event, imageUrl: imageCache.get(event.id)! };
  }

  try {
    const result = await generateImage({ prompt: event.imageHint });
    imageCache.set(event.id, result.imageUrl);
    return { ...event, imageUrl: result.imageUrl };
  } catch (error) {
    console.error(`Failed to generate image for event ${event.id}:`, error);
    // Fallback to original placeholder
    return event;
  }
}
