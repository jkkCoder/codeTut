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

    console.log("getting executed")
    return new Promise((resolve,reject)=>{
        //executing g++ and storing .exe file in outPath
        // exec(`g++ ${fileData.filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.exe`,
        exec(`python ${fileData.filepath}`,
                (error,stdout,stderr)=>{
                    if(error){
                        reject({error,stderr})
                    }
                    if(stderr){
                        reject(stderr)
                    }
                    resolve(stdout)
                })
    })
}

export {executeCpp}