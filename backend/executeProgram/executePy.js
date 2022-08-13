import {exec} from "child_process"

const executePy = (fileData)=>{
    const jobId = fileData.filename.split(".")[0]

    return new Promise((resolve,reject)=>{
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

export {executePy}