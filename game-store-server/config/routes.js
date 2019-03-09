const authRoutes = require('../routes/auth')
const gameRoutes = require('../routes/game')
const statsRoutes = require('../routes/stats')
const ordersRoutes = require('../routes/order')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/game', gameRoutes)
  app.use('/stats', statsRoutes)
  app.use('/orders', ordersRoutes)
}
