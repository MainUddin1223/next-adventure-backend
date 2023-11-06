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
