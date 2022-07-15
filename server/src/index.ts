import express from "express"
import { graphqlHTTP } from "express-graphql"
import cors from "cors"
import { DataSource } from "typeorm"
import {schema} from './Schema'
import { Posts } from "./Entities/Post"
import dotenv from 'dotenv'
import { Photos } from "./Entities/Image"
import {generateUploadURL} from './S3/s3'


const main = async () => {
    dotenv.config();
    
    let MysqlDataSource = new DataSource({
        type: "mysql",
        host: process.env.DB_HOST,
        database: "sys",
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: 3306,
        synchronize: true,
        entities: [Posts, Photos]
    })

    MysqlDataSource.initialize()
    .then(()=> {
        console.log("Data Source has been initialized")
    })
    .catch((err) => {
        console.log(err)
    });

    

    const app = express();
    app.use(cors());
    app.use(express.json())
    app.get("/s3_upload", async (req,res) => {
        const url = await generateUploadURL()
        res.send({url})
    })
    app.use("/graphql", graphqlHTTP({
        schema, 
        graphiql: true
    }))

    app.listen(3001, ()=> console.log("Server is Running on 3001"))
}

main().catch((err) => {
    console.log(err)
})