"user strict";

module.exports = function (res, data, message) {
  const response = {
    status: res.statusCode,
    message: message,
    data: data
  };

  return response;
}
