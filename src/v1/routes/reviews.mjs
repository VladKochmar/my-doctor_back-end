import { checkSchema } from 'express-validator'
import ReviewController from '../controllers/review.mjs'
import ReviewValidator from '../../../validators/review.mjs'

import { Router } from 'express'
const router = Router()

router.get('/', ReviewController.getReviewsList)
router.get('/:id', ReviewController.getReviewById)

router.get('/doctors/:id', ReviewController.getReviewsByDoctorId)
router.get('/patients/:id', ReviewController.getReviewsByPatientId)

router.post('/form/:id?', checkSchema(ReviewValidator.reviewSchema), ReviewController.createReview)

router.delete('/', ReviewController.deleteReview)

export default router
