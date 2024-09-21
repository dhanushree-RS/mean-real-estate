import express from "express";
import { test, jsonRoute } from "../controllers/user.controller.js";



const router = express.Router();

router.get('/test', test)
router.get('/json', jsonRoute)



export default router;