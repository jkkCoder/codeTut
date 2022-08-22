import fs from "fs"
import path from "path"

const removeFile = (job,jobId) => {
    try {
        fs.unlinkSync(job.filepath);

        if (job.language === "cpp") {
            const __dirname = path.resolve()
            const outputPath = path.join(__dirname, `backend/outputs/${jobId}.exe`)
            fs.unlinkSync(outputPath)
        }

        if(job.language === "java") {
            const __dirname = path.resolve()
            let outputDir = path.join(__dirname,"backend","codes",jobId)
            console.log("output directory is ",outputDir)
            outputDir = path.join(outputDir,"../")
            console.log("removing output directory of java ",outputDir)
            fs.rmdirSync(outputDir, { recursive: true });
        }
    } catch (error) {
        console.log(error);
    }

}

export default removeFile