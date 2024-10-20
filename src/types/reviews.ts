// Review interface to define the shape of review props
export interface Review {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
}

// Component expects 'reviews' prop passed in from the parent component
export interface RatingAndReviewsProps {
  reviews: Review[];
}
