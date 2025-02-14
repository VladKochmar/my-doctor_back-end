import authRoutes from './auth.mjs'
import userRoutes from './users.mjs'
import reviewRoutes from './reviews.mjs'
import serviceRoutes from './services.mjs'
import favoriteRoutes from './favorites.mjs'
import templateRoutes from './templates.mjs'
import scheduleRoutes from './schedules.mjs'
import appointmentRoutes from './appointments.mjs'

import { Router } from 'express'
const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/users', userRoutes)
routes.use('/reviews', reviewRoutes)
routes.use('/services', serviceRoutes)
routes.use('/favorites', favoriteRoutes)
routes.use('/schedules', scheduleRoutes)
routes.use('/service-templates', templateRoutes)
routes.use('/appointments', appointmentRoutes)

export default routes
