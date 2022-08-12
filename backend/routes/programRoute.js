import express from "express"
import {runProgram} from "../controllers/programController.js"

const router = express.Router()

router.post("/run",runProgram)


export default router