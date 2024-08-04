import { databases } from '../lib/appwrite.config';
import { ReviewCardProps } from '../types/appwrite.type';
import * as sdk from 'node-appwrite';


export const fetchReviewsForService = async (serviceID: string): Promise<ReviewCardProps[]> => {
  let reviews: ReviewCardProps[] = [];

  try {
    // Fetch documents from Appwrite collection
    const response = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.REVIEW_COLLECTION_ID!,
      [sdk.Query.equal('serviceID', serviceID)]
    );
    const allReviews = response.documents;

    // Map reviews to your ReviewCardProps interface
    reviews = allReviews.map((doc: any) => ({
      serviceID: doc.serviceID,
      consumerID: doc.consumerID,
      providerID: doc.providerID,
      review_text: doc.review_text,
      review_date: new Date(doc.review_date),
      rating: doc.rating,
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }

  return reviews;
};