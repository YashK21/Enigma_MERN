import express from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors"
import dotenv from "dotenv"

const app = express()
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials:true
    })
)



export default app