import FavoriteController from '../controllers/favorite.mjs'

import { Router } from 'express'
const router = Router()

router.get('/patient/:id', FavoriteController.getPatientFavorites)

router.post('/add', FavoriteController.addToFavorites)

router.delete('/', FavoriteController.deleteFromFavorites)

export default router
