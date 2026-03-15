import express from 'express'
import { createResume, deleteResume, getPublicResumeById, updateResume } from '../controller/resume.controller.js'
import authUser from '../middleware/user.middleware.js'
import upload from '../db/multer.config.js'
const router = express.Router()

router.post('/create',authUser,createResume)
router.put('/update',authUser,upload.single('image'),updateResume)
router.delete('/delete/:resumeId',authUser,deleteResume)
router.get('/get/:resumeId',authUser,getPublicResumeById)
router.get('/public/:resumeId',getPublicResumeById)

export default router