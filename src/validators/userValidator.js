const validateUpdateProfile = (req, res, next) => {
  const { firstName, lastName, phone, friendCategories } = req.body;
  const errors = [];

  if (firstName !== undefined && firstName.trim().length < 1) {
    errors.push('First name cannot be empty');
  }

  if (lastName !== undefined && lastName.trim().length < 1) {
    errors.push('Last name cannot be empty');
  }

  if (phone !== undefined && phone !== null && phone.trim().length > 0) {
    const phoneRegex = /^[+]?[\d\s\-()]+$/;
    if (!phoneRegex.test(phone)) {
      errors.push('Invalid phone number format');
    }
  }

  if (friendCategories !== undefined && !Array.isArray(friendCategories)) {
    errors.push('Friend categories must be an array');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors 
    });
  }

  next();
};

const validateFileUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(400).json({ 
      message: 'Invalid file type. Only JPEG, JPG, PNG and GIF are allowed' 
    });
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (req.file.size > maxSize) {
    return res.status(400).json({ 
      message: 'File too large. Maximum size is 5MB' 
    });
  }

  next();
};

module.exports = {
  validateUpdateProfile,
  validateFileUpload,
};