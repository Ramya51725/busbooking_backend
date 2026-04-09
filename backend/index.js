import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'
import dotenv from 'dotenv'

// ✅ Load .env for local only (safe for Vercel)
dotenv.config()

import busRouter from './routers/bus.router.js'
import userRouter from './routers/userRouters.js'
import bookingRouter from './routers/booking.router.js'
import adminRouter from './routers/admin.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

// ✅ ENV variables
export const MONGO_DATABASE = process.env.MONGO_DATABASE
const MONGO_URL = process.env.MONGO_URL

// ✅ Safety check (VERY IMPORTANT)
if (!MONGO_URL) {
  console.error("❌ MONGO_URL is missing")
  throw new Error("MONGO_URL is not defined")
}

// ✅ Mongo Client
export const client = new MongoClient(MONGO_URL)

// ✅ Connection flag
let isConnected = false

// ✅ DB connection function
export const connectDB = async () => {
  if (isConnected) return

  try {
    await client.connect()
    isConnected = true
    console.log("✅ MongoDB connected")
  } catch (err) {
    console.error("❌ DB Error:", err)
    throw err
  }
}

// ✅ Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    console.error("❌ DB Middleware Error:", err)
    res.status(500).json({ message: "Database connection failed" })
  }
})

// ✅ Routes
app.use("/api/buses", busRouter)
app.use("/api/users", userRouter)
app.use("/api/bookings", bookingRouter)
app.use("/api/admin", adminRouter)

// ✅ Test route
app.get("/", (req, res) => {
  res.send({ message: "Welcome to product express" })
})

export default app


// import express from 'express'
// import {MongoClient} from 'mongodb'
// import cors from 'cors'
// import * as dotenv from 'dotenv'
// import http, { createServer } from 'http'
// import busRouter from './routers/bus.router.js'
// import userRouter from './routers/userRouters.js'
// import bookingRouter from './routers/booking.router.js'
// import adminRouter from './routers/admin.routes.js'
// dotenv.config()


// const app = express()
// app.use(cors())
// app.use(express.json())

// const PORT = process.env.PORT || 5000
// export const MONGO_DATABASE = process.env.MONGO_DATABASE 
// const MONGO_URL = process.env.MONGO_URL
// export const client = new MongoClient(MONGO_URL)
// client.connect()


// app.use("/api/buses" , busRouter)
// app.use("/api/users",userRouter)
// app.use("/api/bookings",bookingRouter)
// app.use("/api/admin",adminRouter)


// app.get ("/", (req, res) => {
//     res.send ({
//         message : "Welcome to product express"
// })
// })

// const server = http.createServer(app)

// server.listen(PORT , () => {
//     console.log(`the app is running on port ${PORT}`)
// })