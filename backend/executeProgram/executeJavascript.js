import {exec} from "child_process"

const executeJavascript = (fileData)=>{
    const jobId = fileData.filename.split(".")[0]

    return new Promise((resolve,reject)=>{
        exec(`node ${fileData.filepath}`,
                {timeout:20000},
                (error,stdout,stderr)=>{
                    if(error){
                        console.log("error ",error)
                        reject({error,stderr})
                    }
                    if(stderr){
                        console.log("stderr is",stderr)
                        reject(stderr)
                    }

                    console.log("stdout ",stdout)
                    resolve(stdout)
                })
    })
}

export {executeJavascript}