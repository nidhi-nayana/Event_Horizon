'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import type { Event } from '@/lib/types';
import { bookTicketsAction } from '@/app/actions';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from 'lucide-react';
import React from 'react';

const formSchema = z.object({
  ticketType: z.string().min(1, { message: 'Please select a ticket type.' }),
  quantity: z.coerce
    .number()
    .int()
    .min(1, { message: 'Please select at least one ticket.' })
    .max(10, { message: 'You can book a maximum of 10 tickets.' }),
});

type FormValues = z.infer<typeof formSchema>;

interface TicketBookingProps {
  event: Event;
}

export default function TicketBooking({ event }: TicketBookingProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticketType: '',
      quantity: 1,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const result = await bookTicketsAction(values);
      if (result.success) {
        toast({
          title: 'Booking Successful!',
          description: `Your tickets for ${event.title} have been booked. A confirmation email has been sent.`,
        });
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Booking Failed',
          description: result.message || 'An unexpected error occurred.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Booking Error',
        description: 'Could not complete your booking. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Ticket className="h-6 w-6" />
          <span>Book Tickets</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="ticketType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a ticket type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {event.tickets.map((ticket) => (
                        <SelectItem key={ticket.type} value={ticket.type}>
                          {ticket.type} - ${ticket.price.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Booking...' : 'Book Now'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
