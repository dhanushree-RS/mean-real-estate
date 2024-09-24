import express from "express";
import { test, jsonRoute,updateUser,deleteUser,getUserListings } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";



const router = express.Router();

router.get('/test', test)
router.get('/json', jsonRoute)


router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/listings/:id',verifyToken,getUserListings)




export default router;