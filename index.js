import express from "express";
import cors from "cors";
import path from "path";

const app = express()
const port = process.env.PORT || 4000;

app.use(cors({
    origin: '*',
    credentials: true,
    methods: '*',
    allowedHeaders: '*',
    exposedHeaders: ['Authorization']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('./static'))

app.get('^/$|FortuneTrack', (req, res) => {
    res.status(404).json({
        status: 404,
        msg: 'Resoure not found.'
    })
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})