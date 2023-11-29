export interface IReviewPlatform {
  userId: number;
  rating: number;
  feedback: string;
}

export interface BookPlanPayload {
  userId: number;
  planId: number;
  seats: number;
}

export interface IReviewPlan {
  rating: number;
  feedback: string;
  bookingId: number;
  userId: number;
}

export interface IAgencyResult {
  id: number;
  name: string;
  profileImg: string;
  rating: any;
  plans?: {
    id: number;
  }[];
  ongoingPlans?: number;
}
export interface IResult {
  result: IAgencyResult[] | [];
}
export interface IOrderSummary {
  planId: number;
  seats: number;
}
