import express from 'express'
const app = express()

import router from "./route/bot";
app.use(router)

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost/${port}`)
})