import express from "express"
import {generateFile} from "./generateFile.js"
import { executeCpp } from "./executeCpp.js"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.post("/run",async (req,res)=>{
    const {language="cpp",code} = req.body

    console.log(req.body)
    if(code === undefined){
        return res.status(400).json({success:false,error:"Empty code body!"})
    }

    try{
        // need to generate a c++ file with content from the request
        const fileData = await generateFile(language,code)
        //we need to run the file and send the response
        const output = await executeCpp(fileData)

        return res.json({fileData,output})
    }catch(err){
        console.log(err)
        return res.json({error:err})
    }
})

const PORT = 5000 || process.env.PORT

app.listen(PORT,()=>{
    console.log("server running at port ",PORT)
})