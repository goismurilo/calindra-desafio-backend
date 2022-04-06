import express from 'express'
import { createRouteService } from './routes/routes'

const app = express()

app.get("/", createRouteService)

app.listen(3333, () => console.log("Server started on port 3333!")) 