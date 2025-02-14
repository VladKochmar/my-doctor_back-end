import ReviewsDBService from '../models/reviews/ReviewsDBService.mjs'
import modelConfigs from '../models/configs.mjs'
import { validationResult } from 'express-validator'

const { reviews } = modelConfigs

class ReviewController {
  static async getReviewsList(req, res) {
    try {
      const reviewsData = await ReviewsDBService.findManyWithSearchOptions(req.query, reviews.filters, reviews.fields, reviews.joins)
      res.status(200).json({
        data: reviewsData,
      })
    } catch (err) {
      res.status(500).json({ error: 'Error fetching reviews', message: err.message })
    }
  }

  static async getReviewById(req, res) {
    try {
      const id = req.params.id
      const reviewData = await ReviewsDBService.findById(id, reviews.fields, reviews.joins)

      res.status(200).json({
        data: reviewData,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async getReviewsByPatientId(req, res) {
    try {
      const id = req.params.id
      const reviewsData = await ReviewsDBService.getReviewsByPatientId(id, reviews.fields, reviews.joins)

      res.status(200).json({
        data: reviewsData,
      })
    } catch (err) {
      res.status(500).json({ error: 'Error fetching patients reviews', message: err.message })
    }
  }

  static async getReviewsByDoctorId(req, res) {
    try {
      const id = req.params.id
      const reviewsData = await ReviewsDBService.getReviewsByDoctorId(id, reviews.fields, reviews.joins)

      res.status(200).json({
        data: reviewsData,
      })
    } catch (err) {
      res.status(500).json({ error: 'Error fetching doctors reviews', message: err.message })
    }
  }

  static async reviewForm(req, res) {
    try {
      const id = req.params.id
      let review = null

      if (id) {
        review = await ReviewsDBService.findById(id, reviews.fields, reviews.joins)
      }

      res.status(200).json({
        errors: [],
        data: review,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async createReview(req, res) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const formattedErrors = {}
      errors.array().forEach(error => {
        formattedErrors[error.path] = error.msg
      })

      return res.status(400).json({
        errors: formattedErrors,
      })
    }

    try {
      const reviewData = req.body

      if (req.params.id) {
        await ReviewsDBService.update(req.params.id, reviewData)
      } else {
        await ReviewsDBService.create(reviewData)
      }

      res.status(200).json({ message: `Review ${req.params.id ? 'updated' : 'registered'} successfully` })
    } catch (err) {
      res.status(500).json({
        errors: [{ msg: err.message }],
      })
    }
  }

  static async deleteReview(req, res) {
    if (!req.user) {
      return res.status(403).json({ error: 'Access denied' })
    }

    try {
      await ReviewsDBService.deleteById(req.body.id)
      res.status(200).json({ message: 'Review deleted' })
    } catch (err) {
      res.status(500).json({ error: 'Error deleting review' })
    }
  }
}

export default ReviewController
