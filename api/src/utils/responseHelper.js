const sendResponse = (res, statusCode, data, message = '') => {
  res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
  });
};

const sendError = (res, statusCode, message, errors = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};

const sendSuccess = (res, data, message = 'Success') => {
  sendResponse(res, 200, data, message);
};

const sendCreated = (res, data, message = 'Created successfully') => {
  sendResponse(res, 201, data, message);
};

module.exports = {
  sendResponse,
  sendError,
  sendSuccess,
  sendCreated,
};