const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { ValidationError } = require('sequelize')
const { environment } = require('./config')
const frontendPort = 'http://localhost:3000'

// Route imports
const routes = require('./routes/routes')
const userRoutes = require('./routes/users')

const app = express()

// Setting up backend app
app.use(morgan('dev'))
app.use(cors({ origin: frontendPort }))
app.use(cookieParser())
app.use(express.json())
// TODO Check how these work out. Diff between Twitter/Pokemon, understand why
app.use(express.urlencoded({extended: false}))
// app.use(static(path.join(__dirname, 'public')))

// Routes
app.use(userRoutes)
// app.get('/', (req, res) => {
// res.send('Testing express')
// })

// 404 Catch unhandled requests and pass to error handler
app.use((req, res, next) => {
  const err = Error(`404 Nuh-uh can't find it :(`)
  err.errors = ["Can't find that resource."]
  err.status = 404
  next(err)
})

// Error handler logs errors
app.use((err, req, res, next) => {
  if (environment === 'production') {
    // TODO
  } else {
    console.error(err)
  }
  next(err)
})

// Handle 404 error
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404)
    res.render('page-not-found', {tite: '404 Not Found'})
  } else {
    next(err )
  }
})

// Handle sequelize errors
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message)
    err.title = "Sequelize Error >:["
  }
  next(err)
})

// Handle all other errors
app.use((err, req, res, next) => {
  err.status = (err.status || 500)
  const isProduction = environment === 'production'
  res.status(err.status).json({
    title: err.title || '500 Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  })
})

module.exports = app