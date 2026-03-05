import { ReviewsService } from "../services/reviews.service.js";

export class ReviewsController {
  private reviewsService: ReviewsService;

  constructor() {
    this.reviewsService = new ReviewsService();
  }

  async createReview(req: any, res: any) {
    try {
      const { user_id, product_id, rating, comment } = req.body;
      const review = await this.reviewsService.createReview(
        user_id,
        product_id,
        rating,
        comment,
      );
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to create review" });
    }
  }

  async getReviewById(req: any, res: any) {
    try {
      const { review_id } = req.params;
      const review = await this.reviewsService.getReviewById(review_id);
      if (review) {
        res.json(review);
      } else {
        res.status(404).json({ error: "Review not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve review" });
    }
  }

  async updateReview(req: any, res: any) {
    try {
      const { review_id } = req.params;
      const { user_id, product_id, rating, comment } = req.body;
      const updatedReview = await this.reviewsService.updateReview(
        review_id,
        user_id,
        product_id,
        rating,
        comment,
      );
      if (updatedReview) {
        res.json(updatedReview);
      } else {
        res.status(404).json({ error: "Review not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update review" });
    }
  }

  async deleteReview(req: any, res: any) {
    try {
      const { review_id } = req.params;
      await this.reviewsService.deleteReview(review_id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  }
}
