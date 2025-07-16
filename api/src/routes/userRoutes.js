const express = require('express');
const { getProfile, updateProfile, uploadProfilePicture } = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { validateUpdateProfile, validateFileUpload } = require('../validators/userValidator');
const router = express.Router();

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, validateUpdateProfile, updateProfile);
router.post('/profile/upload', verifyToken, upload.single('profileImage'), validateFileUpload, uploadProfilePicture);

module.exports = router;