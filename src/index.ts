import { URLController } from './controller/URLController'
import express from 'express'
import { MongoCoonection } from './database/MongoConnection'

const api = express()

api.use(express.json())

const dataBase = new MongoCoonection()
dataBase.connect()

const urlController = new URLController
api.post("/shorten", urlController.shorten)
api.get("/:hash", urlController.redirect)


api.listen(5000, ()=>console.log('Express listening..'))


