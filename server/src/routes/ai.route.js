import express from 'express'
import authUser from '../middleware/user.middleware.js'
import upload from '../db/multer.config.js'
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume } from '../controller/ai.controller.js'
const router = express.Router()

router.post('/enhance-pro-sum',authUser,enhanceProfessionalSummary)
router.post('/enhance-pro-des',authUser,enhanceJobDescription)

// Multer MUST come before authUser to properly parse multipart/form-data
router.post('/upload-resume', (req, res, next) => {
    console.log('[route] /upload-resume received');
    console.log('[route] content-type:', req.headers['content-type']);
    next();
}, upload.single('resume'), (req, res, next) => {
    console.log('[route] after multer - file:', !!req.file, 'body:', req.body);
    next();
}, authUser, uploadResume, (err, req, res, next) => {
    // Multer error handler
    if (err) {
        console.error('[route] Multer error:', err.message);
        return res.status(400).json({ message: 'File upload error: ' + err.message });
    }
    next();
})

export default router