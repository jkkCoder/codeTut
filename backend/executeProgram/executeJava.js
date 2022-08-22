import {exec} from "child_process"
import path from "path"
import fs from "fs"

const __dirname = path.resolve()
// {
//     filepath: 'E:\\online-compiler\\backend\\codes\\db26a86f-4c63-4d1c-ad1a-8cf7954cad5d\\Main.java',
//     filename: 'Main.java'
// }

const executeJava = (fileData)=>{
    // const jobId = fileData.filename.split(".")[0]
    const outputPath = path.join(fileData.filepath,"../")
    console.log("output path in java is ",outputPath)

    return new Promise((resolve,reject)=>{
        //executing g++ and storing .exe file in outPath
        exec(`javac ${fileData.filepath} && cd ${outputPath} && java Main`,
                {timeout:20000},
                (error,stdout,stderr)=>{
                    error && reject({error,stderr}) //reject breaks out of the fn
                    stderr && reject(stderr)
                    resolve(stdout)
                })
    })
}

export {executeJava}