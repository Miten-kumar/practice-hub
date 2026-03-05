import { ReviewsController } from "../controllers/reviews.controller.js";
import express from "express";

const router = express.Router();
const reviewsController = new ReviewsController();

router.post("/", (req, res) => reviewsController.createReview(req, res));
router.get("/:review_id", (req, res) =>
  reviewsController.getReviewById(req, res),
);
router.put("/:review_id", (req, res) =>
  reviewsController.updateReview(req, res),
);
router.delete("/:review_id", (req, res) =>
  reviewsController.deleteReview(req, res),
);

export default router;
