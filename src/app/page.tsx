import { getEvents } from '@/lib/events';
import EventCard from '@/components/EventCard';

export default function Home() {
  const events = getEvents();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold font-headline text-center">
        Upcoming Events
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
