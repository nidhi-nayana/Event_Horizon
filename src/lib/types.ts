export interface TicketOption {
  type: 'General' | 'VIP';
  price: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  imageHint: string;
  date: string;
  location: string;
  tickets: TicketOption[];
}
