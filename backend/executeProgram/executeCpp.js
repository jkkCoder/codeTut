import {exec} from "child_process"
import path from "path"
import fs from "fs"

const __dirname = path.resolve()
const outputPath = path.join(__dirname,"/backend/outputs")

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true})
}

const executeCpp = (fileData)=>{
    const jobId = fileData.filename.split(".")[0]
    const outPath = path.join(outputPath,`${jobId}.exe`)

    return new Promise((resolve,reject)=>{
        //executing g++ and storing .exe file in outPath
        exec(`g++ ${fileData.filepath} -o ${outPath} && cd ${outputPath} && ${jobId}.exe`,
                {timeout:20000},
                (error,stdout,stderr)=>{
                    error && reject({error,stderr}) //reject breaks out of the fn
                    stderr && reject(stderr)
                    resolve(stdout)
                })
    })
}

export {executeCpp}