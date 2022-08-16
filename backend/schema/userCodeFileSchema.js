class JobClass{
    statusOfCompilation = ['pending','success','error']
    constructor(language,filepath){
        this.language = language
        this.filepath = filepath
        this.submittedAt = new Date()
        this.status = this.statusOfCompilation[0]
    }
    setStartedAt(){
        this.startedAt = new Date()
    }
    setCompileSuccess(output){
        this.completedAt = new Date()
        this.status = this.statusOfCompilation[1]
        this.output = output
    }
    setCompileError(error){
        this.completedAt = new Date()
        this.status = this.statusOfCompilation[2]
        this.output = error.stderr || "Time Limit Exceeded"
    }

    getAll(){
        return{
            language:this.language,
            filepath:this.filepath,
            submittedAt:this.submittedAt,
            startedAt:this.startedAt,
            completedAt:this.completedAt,
            output:this.output,
            status:this.status
        }
    }
}

export default JobClass