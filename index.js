import express from "express";
import cors from "cors";
import path from "path";
import { userRouter } from "./controller/UserController.js";
import { equityRouter } from "./controller/equityController.js";
import { forexRouter } from "./controller/forexController.js";
import { cryptoRouter } from "./controller/cryptoController.js";
import { commodityRouter } from "./controller/commodityController.js";
import { predictionRouter } from "./controller/PredictionsController.js";

const app = express()
const port = process.env.PORT || 4000

app.use(cors({
  origin: '*',
  credentials: true,
  methods: '*',
  allowedHeaders: '*',
  exposedHeaders: ['Authorization']
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('./static'))

app.use('/users', userRouter)
app.use('/user', userRouter)

app.use('/predictions', predictionRouter)
app.use('/prediction', predictionRouter)

app.use('/equity', equityRouter)

app.use('/forex', forexRouter)

app.use('/crypto', cryptoRouter)

app.use('/commodity', commodityRouter)

app.get('^/$|FortuneTrack', (req, res) => {
  res.status(200).sendFile(path.resolve('./static/index.html'))
})

app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    msg: 'Resource not found'
  })
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})