import express from 'express'
import { getAllUserResume, getUserById, loginUser, registerUser } from '../controller/user.controller.js'
import authUser from '../middleware/user.middleware.js'
const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/data',authUser,getUserById)
router.get('/resumes',authUser,getAllUserResume)

export default router