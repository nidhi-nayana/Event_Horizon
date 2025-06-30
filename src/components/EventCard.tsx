import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Event } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/events/${event.id}`}>
          <div className="relative h-48 w-full">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              data-ai-hint={event.imageHint}
              unoptimized={event.imageUrl.startsWith('data:image')}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Link href={`/events/${event.id}`} className="hover:underline">
          <CardTitle className="mb-2 font-headline text-xl">
            {event.title}
          </CardTitle>
        </Link>
        <div className="text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {format(new Date(event.date), 'PPP')}
          </p>
          <p className="flex items-center gap-2 mt-1">
            <MapPin className="h-4 w-4" />
            {event.location}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/events/${event.id}`}>Buy Tickets</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
