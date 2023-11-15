export interface IPlanData {
  agencyId: number;
  planName: string;
  destination: string;
  departureFrom: string;
  coverLocations: string[];
  price: number;
  images: string[];
  duration: string;
  description: string;
  departureTime: Date;
  meals: string;
  events: string[];
  notAllowed: string[];
  deadline: Date;
  totalSeats: number;
}
export interface IPayouts {
  status: 'pending' | 'canceled' | 'released' | 'upcoming';
  totalAmount: number;
  departureTime: Date;
  booking_status:
    | 'canceled'
    | 'confirmed'
    | 'pending'
    | 'rejected'
    | 'requested'
    | 'postponed';
}
