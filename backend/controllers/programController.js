import {generateFile} from "../generateFile.js"
import { executeCpp } from "../executeProgram/executeCpp.js"
import { executePy } from "../executeProgram/executePy.js"

const runProgram = async(req,res)=>{
    const {language="cpp",code} = req.body

    console.log(req.body)
    if(code === undefined){
        return res.status(400).json({success:false,error:"Empty code body!"})
    }

    try{
        // need to generate a c++ file with content from the request
        const fileData = await generateFile(language,code)
        //we need to run the file and send the response
        let output
        if(language==="cpp"){
            output = await executeCpp(fileData)
        }
        else if(language==="py"){
            output = await executePy(fileData)
        }
        return res.json({fileData,output})
    }catch(err){
        console.log(err)
        return res.json({error:err})
    }
}

export { runProgram }