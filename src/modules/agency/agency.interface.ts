export interface IUpdatePlan {
  description: string;
  notAllowed: string[];
  totalSeats: number;
}
export interface IPlanData extends IUpdatePlan {
  agencyId: number;
  planName: string;
  destination: string;
  departureFrom: string;
  coverLocations: string[];
  price: number;
  images: string[];
  duration: string;
  departureTime: Date;
  meals: string;
  events: string[];
  deadline: Date;
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
