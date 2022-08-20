import {generateFile} from "../generateFile.js"
import { executeCpp } from "../executeProgram/executeCpp.js"
import { executePy } from "../executeProgram/executePy.js"
import {executeJavascript} from "../executeProgram/executeJavascript.js"
import removeFile from "../utils/removeFile.js"
import JobClass from "../schema/userCodeFileSchema.js"
import fs from "fs"
import path from "path"

let jobs = new Map()

const getStatusById = async(req,res)=>{
    const jobId = req.query.id

    if(jobId === undefined){
        return res.status(400).json({success:false,error:"missing id query param"})
    }
    
    const job = jobs.get(jobId)
    if(job === undefined){
        return res.status(404).json({success:false,error:"invalid job id"})
    }

    //remove files from codes and output if status is not pending and also remove it from map
    if(job.status !== "pending")
    {
        removeFile(job,jobId)

        //remove from map too
        jobs.delete(jobId)
        console.log("maps is ", jobs)
    }

    return res.status(200).json({success:true,job})
}

const runProgram = async(req,res)=>{
    const {language="cpp",code} = req.body

    if(code === undefined || code===""){
        return res.status(400).json({success:false,error:"Empty code body!"})
    }

    let jobInstance
    let fileId
    try{
        // need to generate a c++ file with content from the request
        const fileData = await generateFile(language,code)
        fileId = fileData.filename.split(".")[0]  //unique id to store it in map

        //saving it in class
        jobInstance = new JobClass(language,fileData.filepath)
        jobs.set(fileId,jobInstance.getAll())   //storing it in map
        console.log("job saved before compiling is ",jobInstance.getAll())

        res.status(201).json({success:true,jobId:fileId})   //send some unique id so that frontend can use polling to check if it is compiled or not

        //we need to run the file and send the response
        let output
        jobInstance.setStartedAt()
        if(language==="cpp"){
            output = await executeCpp(fileData)
            console.log("output is ",output)
        }
        else if(language==="py"){
            output = await executePy(fileData)
            console.log("output is ",output)
        }
        else if(language==="js"){
            output = await executeJavascript(fileData)
            console.log("output is",output)
        }
        jobInstance.setCompileSuccess(output)

        console.log("job saved in class is ",jobInstance.getAll())
        jobs.set(fileId,jobInstance.getAll())
    }catch(err){
        jobInstance.setCompileError(err)
        jobs.set(fileId,jobInstance.getAll())
    }
}

export { runProgram,getStatusById }