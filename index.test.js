const { createErrorMessageMapper, mapErrorToField } = require(".");

describe("createErrorMessageMapper", () => {
  it("returns a mapErrorToMessage function", () => {
    const mapErrorToMessage = createErrorMessageMapper();
    expect(typeof mapErrorToMessage).toEqual("function");
  });

  describe("mapErrorToMessage", () => {
    it("returns the default error message", () => {
      const mapErrorToMessage = createErrorMessageMapper();
      const message = mapErrorToMessage({
        code: "auth/email-already-in-use"
      });

      expect(message).toMatchObject({ message: "This email is in use" });
    });

    it("returns the custom error message", () => {
      const mapErrorToMessage = createErrorMessageMapper({
        "auth/email-already-in-use": "Email in use"
      });

      const message = mapErrorToMessage({
        code: "auth/email-already-in-use"
      });

      expect(message).toMatchObject({ message: "Email in use" });
    });

    it("falls back to the default dictionary if the error code doesn't match one in the custom dictionary", () => {
      const mapErrorToMessage = createErrorMessageMapper({
        "custom/error-code": "Nope!"
      });

      const message = mapErrorToMessage({
        code: "auth/email-already-in-use"
      });

      expect(message).toMatchObject({ message: "This email is in use" });
    });

    it("fallbacks back to the error's specified message", () => {
      const mapErrorToMessage = createErrorMessageMapper({
        "custom/error-code": "Nope!"
      });

      const message = mapErrorToMessage({
        code: "task/requires-title",
        message: "task.title is required"
      });

      expect(message).toMatchObject({ message: "task.title is required" });
    });

    it("falls back to the fallback if the error code matches no message", () => {
      const mapErrorToMessage = createErrorMessageMapper({}, "Fallback");

      const message = mapErrorToMessage({
        code: "custom/fallback-code"
      });

      expect(message).toMatchObject({ message: "Fallback" });
    });
  });
});

describe("mapErrorToField", () => {
  it("maps an email error to the email field", () => {
    const mapped = mapErrorToField({
      code: "auth/email-already-in-use",
      message: "Already in use"
    });

    expect(mapped).toMatchObject({
      email: "Already in use"
    });
  });

  it("maps a password error to the email field", () => {
    const mapped = mapErrorToField({
      code: "auth/weak-password",
      message: "Weak password"
    });

    expect(mapped).toMatchObject({
      password: "Weak password"
    });
  });

  it("maps a generic error to the miscellaneous key", () => {
    const mapped = mapErrorToField({
      code: "auth/user-not-found",
      message: "Misc error"
    });

    expect(mapped).toMatchObject({
      miscellaneous: "Misc error"
    });
  });

  it("maps unknown errors to the miscellaneous key", () => {
    const mapped = mapErrorToField({
      code: "custom/error",
      message: "Misc error"
    });

    expect(mapped).toMatchObject({
      miscellaneous: "Misc error"
    });
  });
});
