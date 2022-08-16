import fs from "fs"
import path from "path"

const removeFile = (job,jobId) => {
    try {
        fs.unlinkSync(job.filepath);

        if (job.language === "cpp") {
            const __dirname = path.resolve()
            const outputPath = path.join(__dirname, `backend/outputs/${jobId}.exe`)
            fs.unlinkSync(outputPath)
            console.log("removed from output path")
        }

        console.log("File is deleted.");
    } catch (error) {
        console.log(error);
    }

}

export default removeFile