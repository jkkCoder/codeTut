import fs from "fs"
import path from "path"
import { v4 as uuid } from "uuid"

const __dirname = path.resolve()    //since we are using es6
const dirCodes = path.join(__dirname,"/backend/codes")

//create a codes directory if it doesn't exist
if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true})
}

const generateFile = async (format,code) => {
    if(format === "java"){
        const jobId = uuid()
        const folderPath = path.join(dirCodes,jobId)    //creating a new folder and storign Main function there
        //create a folder here
        fs.mkdirSync(folderPath,{recursive:true})
        const filepath = path.join(folderPath,"Main.java")

        await fs.writeFileSync(filepath,code)
        return {filepath,filename:`${jobId}/Main.java`}        
    }
    const jobId = uuid()
    const filename = `${jobId}.${format}`
    const filepath = path.join(dirCodes,filename)

    await fs.writeFileSync(filepath,code)
    return {filepath,filename:`${jobId}.${format}`}
}

export { generateFile }