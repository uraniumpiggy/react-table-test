import { Router } from "express";
import dataController from "./dataController.js";

const router = Router()

router.get('/', dataController.getAllData)

export default router
