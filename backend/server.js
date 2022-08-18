import express from "express"
import cors from "cors"
import programRoute from "./routes/programRoute.js"
import path from "path"

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/",programRoute)

const __dirname = path.resolve()

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname,"/frontend/build")))

//     app.get("*",(req,res) => res.sendFile(path.resolve(__dirname,"frontend","build","index.html")))
// }
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
}

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log("server running at port ",PORT)
})