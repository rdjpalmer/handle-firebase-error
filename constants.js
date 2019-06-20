const ErrorCodes = {
  email: {
    alreadyInUse: "auth/email-already-in-use",
    invalid: "auth/invalid-email"
  },
  password: {
    weak: "auth/weak-password",
    wrong: "auth/wrong-password"
  },
  user: {
    notFound: "auth/user-not-found",
    disabled: "auth/user-disabled",
    requiresRecentLogin: "auth/requires-recent-login"
  }
};

const ErrorMessages = {
  [ErrorCodes.email.alreadyInUse]: "This email is in use",
  [ErrorCodes.email.invalid]: "Use a valid email address",
  [ErrorCodes.password.weak]: "Password must be 8 chars long",
  [ErrorCodes.password.wrong]: "Incorrect password",
  [ErrorCodes.user.notFound]: "We couldn't find your user",
  [ErrorCodes.user.disabled]: "Your user account is disabled",
  [ErrorCodes.user.requiresRecentLogin]: "Please reauth to complete this action"
};

const Fallback = "Please contact support";

module.exports = {
  ErrorCodes,
  ErrorMessages,
  Fallback
};
