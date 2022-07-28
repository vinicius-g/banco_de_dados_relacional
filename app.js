const express = require('express')
const app = express()
const router = express.Router()
const port = 2405

require("./server/database")

app.use(express.static("./app/public"))

app.set("view engine", "ejs")
app.set("views", "./app/views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var rotas = require("./app/routes/router")
app.use("/", rotas)

app.listen(port, () => {
    console.log(`Servidor aberto em http://localhost:${port}`)
})