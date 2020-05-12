import axios from 'axios';
import * as caseConversion from '../../../util/caseConversion';

export default class SignUpInterface {
  static ENDPOINT = '/signup';

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
    const { toCamelCase } = caseConversion.default;

    Object.keys(errors).forEach((key) => {
      let camelCaseKey = toCamelCase(key);
      expectedResponse.errors[camelCaseKey] = errors[key].map(str => str.toLowerCase());
    });

    return expectedResponse;
  }
}