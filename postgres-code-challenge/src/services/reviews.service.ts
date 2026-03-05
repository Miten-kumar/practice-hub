import { ReviewsRepository } from "../repositories/reviews.repository.js";

export class ReviewsService {
  private reviewsRepository: ReviewsRepository;

  constructor() {
    this.reviewsRepository = new ReviewsRepository();
  }

  async createReview(user_id: string, product_id: string, rating: number, comment: string) {
    return this.reviewsRepository.create({
      user_id,
      product_id,
      rating,
      comment,
    } as any);
  }

  async getReviewById(review_id: string) {
    return this.reviewsRepository.findById(review_id);
  }

  async updateReview(
    review_id: string,
    user_id?: string,
    product_id?: string,
    rating?: number,
    comment?: string,
  ) {
    const updateData: Partial<{
      user_id: string;
      product_id: string;
      rating: number;
      comment: string;
    }> = {};
    if (user_id) updateData.user_id = user_id;
    if (product_id) updateData.product_id = product_id;
    if (rating !== undefined) updateData.rating = rating;
    if (comment) updateData.comment = comment;
    return this.reviewsRepository.update(review_id, updateData);
  }

  async deleteReview(review_id: string) {
    await this.reviewsRepository.delete(review_id);
  }
}
