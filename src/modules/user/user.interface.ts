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
