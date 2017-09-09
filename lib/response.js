module.exports = (res, data, message) => {
  const response = {
    status: res.statusCode,
    message: (message || ''),
    data: (data || undefined),
  };

  return response;
};
