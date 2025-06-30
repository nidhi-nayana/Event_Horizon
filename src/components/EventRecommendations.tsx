'use client';

import React, { useState, useEffect } from 'react';
import type { Event } from '@/lib/types';
import { getRecommendationsAction } from '@/app/actions';
import EventCard from './EventCard';
import { Skeleton } from './ui/skeleton';

interface EventRecommendationsProps {
  currentEvent: Event;
  allEvents: Event[];
}

export default function EventRecommendations({
  currentEvent,
  allEvents,
}: EventRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const recommendedEvents = await getRecommendationsAction(
          currentEvent,
          allEvents
        );
        setRecommendations(recommendedEvents);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, [currentEvent, allEvents]);

  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <p className="mt-8 text-center text-muted-foreground">
        No similar events found.
      </p>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
