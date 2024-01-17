import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";

AppDataSource.initialize().then( () => {
    const app = express()
    app.use(express.json())
    app.use(routes)
    app.listen(process.env.APP_PORT,() => { console.log(`Servidor rodando na porta ${process.env.APP_PORT}`) })
})