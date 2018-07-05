exports.successMessage = function(message) {
  return {
    success: true,
    message
  };
};

exports.failedMessage = function(message) {
  return {
    success: false,
    message
  };
};