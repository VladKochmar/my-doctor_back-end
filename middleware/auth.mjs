import { match } from 'path-to-regexp'
import { parseBearer } from '../utils/jwtHelpers.mjs'

const auth = app => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
  })

  app.use((req, res, next) => {
    const openRoutes = [
      { path: '/api/v1/auth/login', method: 'ALL' },
      { path: '/api/v1/auth/signup', method: 'ALL' },
      { path: '/api/v1/service-templates', method: 'ALL' },
      { path: '/uploads', method: 'ALL' },
      { path: '/api/v1/users/doctors', method: 'ALL' },
      { path: '/api/v1/users/doctors/:id', method: 'ALL' },
      { path: '/api/v1/services/doctor/:id', method: 'ALL' },
      { path: '/api/v1/services', method: 'GET' },
    ]

    const isPathOpen = openRoutes.some(route => {
      const matcher = match(route.path, { decode: decodeURIComponent })
      return matcher(req.path) && (route.method === 'ALL' || route.method === req.method)
    })

    if (!isPathOpen) {
      try {
        req.user = parseBearer(req.headers.authorization, req.headers)
      } catch (err) {
        return res.status(401).json({ result: 'Access Denied' })
      }
    }

    next()
  })
}

export default auth
