import { Config } from "../config/constants"
import mongoose from "mongoose"

export class MongoCoonection{
    public async connect():Promise<void>{

        try{
            await mongoose.connect(Config.MONGO_CONNECTION)
            console.log('Data Base connected')
        }catch(err){
            console.error(err.message)
            process.exit(1)
        }
    }
}