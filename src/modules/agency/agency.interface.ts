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
