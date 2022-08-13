import express from "express"
import {runProgram,getStatusById} from "../controllers/programController.js"

const router = express.Router()

router.get("/status",getStatusById)
router.post("/run",runProgram)


export default router