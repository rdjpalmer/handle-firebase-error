# handle-firebase-error

Library for mapping firebase authentication errors to the originating field and a custom error message.

See `constants.js` for the mapping and error messages which ship with the lib.

## Useage

```bash
yarn add handle-firebase-error
```

```js
import {
  createErrorMessageMapper,
  mapErrorToField,
  ErrorCodes
} from "handle-firebase-error";

const errorDictionary = {
  [ErrorCodes.alreadyInUse]: "Your custom error message"
};

const mapErrorToMessage = createErrorMessageMapper(errorDictionary);

try {
  await firebase.auth().signInWithEmailAndPassword(email, password);
  // Errors with error.code `auth/email-already-in-use`
} catch (error) {
  mapErrorToField(errorMessageMapper(error));
  // { email: "Your custom error message" }
}
```
