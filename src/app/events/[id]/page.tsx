import { getEventById, getEvents } from '@/lib/events';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { CalendarDays, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import TicketBooking from '@/components/TicketBooking';
import EventRecommendations from '@/components/EventRecommendations';

interface EventPageProps {
  params: {
    id: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  const event = getEventById(params.id);
  const allEvents = getEvents();

  if (!event) {
    notFound();
  }

  const otherEvents = allEvents.filter((e) => e.id !== event.id);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              data-ai-hint={event.imageHint}
              unoptimized={event.imageUrl.startsWith('data:image')}
            />
          </div>
          <div className="mt-8">
            <h1 className="text-4xl font-bold font-headline">
              {event.title}
            </h1>
            <div className="mt-4 flex flex-col gap-2 text-lg text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
              <p className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                <span>{format(new Date(event.date), 'PPPP p')}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{event.location}</span>
              </p>
            </div>
            <p className="mt-6 text-base leading-relaxed">
              {event.longDescription}
            </p>
          </div>
        </div>
        <div className="md:col-span-1">
          <TicketBooking event={event} />
        </div>
      </div>
      <Separator className="my-12" />
      <div>
        <h2 className="text-3xl font-bold font-headline text-center">
          You Might Also Like
        </h2>
        <EventRecommendations currentEvent={event} allEvents={otherEvents} />
      </div>
    </div>
  );
}
