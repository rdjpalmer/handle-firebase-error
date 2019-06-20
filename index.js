const { ErrorMessages, ErrorCodes, Fallback } = require("./constants");

function createErrorMessageMapper(customDictionary, fallback = Fallback) {
  const dictionary = Object.assign({}, ErrorMessages, customDictionary);

  return function mapErrorToMessage(error) {
    let message;

    if (error.code && dictionary[error.code]) {
      message = dictionary[error.code];
    } else if (error.message) {
      message = error.message;
    } else {
      message = fallback;
    }

    return Object.assign({}, error, { message: message });
  };
}

function mapErrorToField(error) {
  switch (error.code) {
    case ErrorCodes.email.alreadyInUse:
    case ErrorCodes.email.invalid: {
      return { email: error.message };
    }
    case ErrorCodes.password.weak:
    case ErrorCodes.password.wrong: {
      return { password: error.message };
    }
    case ErrorCodes.user.notFound:
    case ErrorCodes.user.disabled:
    default: {
      return { miscellaneous: error.message };
    }
  }
}

module.exports = {
  createErrorMessageMapper,
  mapErrorToField,
  ErrorCodes
};
