const path = require('path');
const fs = require('fs');

const createFullImageUrl = (req, imagePath) => {
  if (!imagePath || imagePath.startsWith('http')) {
    return imagePath;
  }
  const apiBaseUrl = process.env.API_BASE_URL || `${req.protocol}://${req.get('host')}`;
  return `${apiBaseUrl}${imagePath}`;
};

const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const getFileExtension = (filename) => {
  return path.extname(filename).toLowerCase();
};

const generateUniqueFilename = (originalName) => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  const extension = getFileExtension(originalName);
  return `${timestamp}-${random}${extension}`;
};

module.exports = {
  createFullImageUrl,
  deleteFile,
  ensureDirectoryExists,
  getFileExtension,
  generateUniqueFilename,
};