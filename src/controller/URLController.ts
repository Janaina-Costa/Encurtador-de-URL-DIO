import { URLModel } from '../database/model/URL'
import {Request, Response} from 'express'
import shortId from 'shortid'
import {Config} from '../config/constants'

export class URLController{
    public async shorten(req:Request, res:Response):Promise<void>{
        //ver se URL existe
        const {originURL} = req.body
        const url = await URLModel.findOne({originURL})
        if(url){
            res.json(url)
            return
        }
        //Criar hash para esta URL
        const hash = shortId.generate()
        const shortURL = `${Config.API_URL}/${hash}`
        const newUrl = await URLModel.create({hash, shortURL, originURL})
        //Salvar URL no banco
        //Retornar a URL salva
        res.json({newUrl})
    }

    public async redirect(req:Request, res:Response):Promise<void>{
        //pegra hash da url
        const {hash} = req.params
        const url = await URLModel.findOne({hash})
        if(url){
            res.redirect(url.originURL)
            return
        }
        //encontrar a URL original pelo hash
        
        //redirecionar para a uRL original a partir do que encontramos no DB
        res.status(400).json({error:'URL not found'})
    }
} 