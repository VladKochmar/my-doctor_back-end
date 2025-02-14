import FavoriteDBService from '../models/favorite/FavoriteDBService.mjs'
import modelConfigs from '../models/configs.mjs'

const { favorites } = modelConfigs

class FavoriteController {
  static async getPatientFavorites(req, res) {
    try {
      const patientId = req.params.id
      const favoritesData = await FavoriteDBService.getPatientFavorites(patientId, favorites.fields, favorites.joins)

      res.status(200).json({
        data: favoritesData,
      })
    } catch (err) {
      res.status(500).json({ error: 'Error fetching patients favorites', message: err.message })
    }
  }

  static async addToFavorites(req, res) {
    try {
      const favoriteData = req.body
      await FavoriteDBService.create(favoriteData)
      res.status(200).json({ message: `Added to favorites successfully` })
    } catch (err) {
      res.status(500).json({
        errors: [{ msg: err.message }],
      })
    }
  }

  static async deleteFromFavorites(req, res) {
    try {
      await FavoriteDBService.deleteById(req.body.id)
      res.status(200).json({ message: 'Doctor deleted from favorites' })
    } catch (err) {
      res.status(500).json({ error: 'Error deleting from favorites' })
    }
  }
}

export default FavoriteController
