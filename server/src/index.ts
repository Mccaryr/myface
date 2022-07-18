import express from "express"
import cors from "cors"
import { DataSource } from "typeorm"
import mongoose from 'mongoose'
import { Posts } from "./Entities/Post"
import dotenv from 'dotenv'
import { User } from "./Entities/User"
import {generateUploadURL} from './S3/s3'
import { ApolloServer } from "apollo-server"
import { typeDefs } from "./Schema/typeDefs"
import { resolvers } from "./Schema/resolvers"

const main = async () => {
    
    dotenv.config()

    mongoose.connect(process.env.MONGO_URL as string)
    const db = mongoose.connection
    db.on('error', (error) => console.log(error))
    db.once('open', () => console.log('Connected to Mongo Database'))
    
    let MysqlDataSource = new DataSource({
        type: "mysql",
        host: process.env.DB_HOST,
        database: "sys",
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: 3306,
        synchronize: true,
        entities: [Posts]
    })

    MysqlDataSource.initialize()
    .then(()=> {
        console.log("Connected to MYSQL Database")
    })
    .catch((err) => {
        console.log(err)
    });

    

    

    const app = express();
    app.use(cors());
    // app.use(express.json())

    const server = new ApolloServer({ typeDefs, resolvers})

    app.get("/s3_upload", async (req,res) => {
        const url = await generateUploadURL()
        res.send({url})
    })


    

    app.listen(3001, ()=> console.log("Server is Running on 3001"))

    server.listen().then(({url}) => {
        console.log(`Apollo Server is Running at: ${url}`)
    })
}

main().catch((err) => {
    console.log(err)
})