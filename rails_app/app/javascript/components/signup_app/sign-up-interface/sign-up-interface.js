import axios from 'axios';
import * as caseConversion from '../../../util/caseConversion';

export default class SignUpInterface {
  static ENDPOINT = '/signup';

  submit(userData) {
    const params = this._toParams(userData);
    const config = SignUpInterface.getConfig();

    return axios.post(SignUpInterface.ENDPOINT, params, config)
      .then(_ => { return { errors: {}} })
      .catch(response => this._toExpectedResponse(response));
  }

  _toParams(userData) {
    const params = { user: {} };
    const { toSnakeCase } = caseConversion.default;

    Object.keys(userData).forEach((key) => {
      const snakeCaseKey = toSnakeCase(key);
      params.user[snakeCaseKey] = userData[key];
    });

    return params;
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

  static setCSRFToken(csrfToken) {
    SignUpInterface.CSRF_TOKEN = csrfToken;
  }

  static getConfig() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': SignUpInterface.CSRF_TOKEN,
      },
    };
  }
}