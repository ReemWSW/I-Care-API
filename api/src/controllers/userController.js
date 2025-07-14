// src/controllers/userController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProfile = async (req, res) => {
    try {
        const userFromDb = await prisma.user.findUnique({ where: { id: req.userId } });
        if (!userFromDb) return res.status(404).json({ message: 'User not found' });
        
        userFromDb.profileImageUrl = createFullImageUrl(req, userFromDb.profileImageUrl);
        const { password: _, ...userToReturn } = userFromDb;
        res.json(userToReturn);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    const { firstName, lastName, phone, address, education, experience, skills, friendCategories } = req.body;
    try {
        const updatedUserFromDb = await prisma.user.update({
            where: { id: req.userId },
            data: {
                firstName, lastName, phone, address, education, experience, skills,
                friendCategories: friendCategories || [],
            },
        });

        // **นี่คือส่วนที่สำคัญที่สุดที่ต้องเพิ่มเข้ามา**
        // แปลง path ของรูปให้เป็น Full URL ก่อนส่งกลับไป
        updatedUserFromDb.profileImageUrl = createFullImageUrl(req, updatedUserFromDb.profileImageUrl);

        const { password: _, ...userToReturn } = updatedUserFromDb;
        res.json({ message: 'Profile updated successfully', user: userToReturn });

    } catch (error) {
         console.error('[UPDATE PROFILE ERROR]', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
};
// --- END: แก้ไขฟังก์ชัน updateProfile ---

exports.uploadProfilePicture = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    try {
        const relativePath = `/uploads/${req.file.filename}`;

        const updatedUser = await prisma.user.update({
            where: { id: req.userId },
            data: { profileImageUrl: relativePath }, // เก็บแค่ Relative Path
        });
        
        // แปลง path เป็น Full URL ก่อนส่งกลับ
        updatedUser.profileImageUrl = createFullImageUrl(req, updatedUser.profileImageUrl);

        const { password: _, ...userToReturn } = updatedUser;

        res.status(200).json({
            message: 'Profile picture uploaded!',
            user: userToReturn, // ส่งข้อมูล user ที่อัปเดตแล้วและมี Full URL กลับไป
        });

    } catch (error) {
        console.error("[UPLOAD ERROR]", error);
        res.status(500).json({ message: 'Server error during file upload.', details: error.message });
    }
};

// ฟังก์ชันสำหรับสร้าง Full URL (แยกออกมาเพื่อใช้ซ้ำ)
const createFullImageUrl = (req, path) => {
    if (!path || path.startsWith('http')) {
        return path; // ถ้าไม่มี path หรือเป็น Full URL อยู่แล้ว ก็ไม่ต้องทำอะไร
    }
    const apiBaseUrl = process.env.API_BASE_URL || `${req.protocol}://${req.get('host')}`;
    return `${apiBaseUrl}${path}`;
};

