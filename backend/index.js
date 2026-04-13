import express from 'express'
import {MongoClient} from 'mongodb'
import cors from 'cors'
import * as dotenv from 'dotenv'
import http, { createServer } from 'http'
import busRouter from './routers/bus.router.js'
import userRouter from './routers/userRouters.js'
import bookingRouter from './routers/booking.router.js'
import adminRouter from './routers/admin.routes.js'
dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000
export const MONGO_DATABASE = process.env.MONGO_DATABASE 
const MONGO_URL = process.env.MONGO_URL
export const client = new MongoClient(MONGO_URL)
client.connect()


app.use("/api/buses" , busRouter)
app.use("/api/users",userRouter)
app.use("/api/bookings",bookingRouter)
app.use("/api/admin", adminRouter)



app.get ("/", (req, res) => {
    res.send ({
        message : "Welcome to product express"
})
})

const server = http.createServer(app)

server.listen(PORT , () => {
    console.log(`the app is running on port ${PORT}`)
})