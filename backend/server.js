import express from "express"
import cors from "cors"
import programRoute from "./routes/programRoute.js"

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/",programRoute)

const PORT = 5000 || process.env.PORT

app.listen(PORT,()=>{
    console.log("server running at port ",PORT)
})