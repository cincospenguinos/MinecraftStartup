import axios from 'axios';

export default class SignUpInterface {
  static ENDPOINT = '/signup';

  constructor() {}

  async submit(userData) {
    const params = this._toParams(userData);
    let serverResponse = {};
    await axios.post(SignUpInterface.ENDPOINT, params)
      .then(_ => serverResponse = { errors: {}})
      .catch(response => serverResponse = this._toExpectedResponse(response));

    return serverResponse;
  }

  _toParams(userData) {
    return {
      user: {
        name: userData.name,
        email_address: userData.emailAddress,
        password: userData.password,
        password_confirmation: userData.passwordConfirmation,
      }
    };
  }

  _toExpectedResponse(backendResponse) {
    const { errors } = backendResponse.response.data;

    const expectedResponse = { errors: {} };

    Object.keys(errors).forEach((key) => {
      const split = key.split('_');

      let camelCaseKey = split[0];

      for (let i = 1; i < split.length; i++) {
        const splitWord = split[i];
        const upperCaseCharacter = splitWord.slice(0, 1).toUpperCase();
        const upperCaseWord = `${upperCaseCharacter}${splitWord.slice(1, splitWord.length)}`;

        camelCaseKey = `${camelCaseKey}${upperCaseWord}`;
      }

      expectedResponse.errors[camelCaseKey] = errors[key].map(str => str.toLowerCase());
    });

    return expectedResponse;
  }
}