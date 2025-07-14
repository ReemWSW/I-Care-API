// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ทำให้สามารถเข้าถึงไฟล์ที่อัปโหลดได้ผ่าน URL
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// อนุญาตให้ Frontend URL ไหนเข้ามาเรียก API ได้

const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';

const corsOptions = {
  origin: process.env.FRONTEND_URL, // อนุญาตเฉพาะ URL ของ Frontend ของเรา
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


// <-- เพิ่มบรรทัดนี้

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

app.listen(PORT, HOST, () => { // <-- แก้ไขตรงนี้
  console.log(`Server is running on http://${HOST}:${PORT}`);
});