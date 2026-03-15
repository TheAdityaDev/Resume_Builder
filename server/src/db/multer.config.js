import multer from 'multer'

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            console.log('[multer] File received:', file.originalname);
            cb(null, 'public/uploads')
        },
        filename: function (req, file, cb) {
            const uniqueName = Date.now() + '-' + file.originalname;
            console.log('[multer] Saving as:', uniqueName);
            cb(null, uniqueName);
        }
    })

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB max
    }
})

export default upload