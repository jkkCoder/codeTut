import {exec} from "child_process"

const executePy = (fileData)=>{

    return new Promise((resolve,reject)=>{
        exec(`python ${fileData.filepath}`,
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

export {executePy}