'user strict';

module.exports = function resp(res, data, message) {
  const response = {
    status: res.statusCode,
    message: (message || ''),
    data: (data || undefined),
  };

  return response;
};
