import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.routes.js'
import resumeRoutes from './routes/resume.routes.js'
import aiRoutes from './routes/ai.route.js'
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// JSON parser that skips multipart/form-data
app.use(express.json({
    limit: '50mb',
    // Skip parsing if content-type is multipart
    skip: (req) => req.is('multipart/form-data') || req.is('application/octet-stream')
}))

app.use(express.urlencoded({
    limit: '50mb',
    extended: true,
    // Also skip for multipart
    skip: (req) => req.is('multipart/form-data')
}))

app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello from the server!')
})

app.use('/api/user',userRoutes);
app.use('/api/resume',resumeRoutes);
app.use('/api/ai',aiRoutes);



export default app