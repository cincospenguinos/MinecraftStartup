import axios from 'axios';
import caseConversion from "../../../util/caseConversion";

export default class StartupInterface {
  static ENDPOINT = '/startup';
  static CSRF_TOKEN = undefined;

  constructor() {}

  async submit(userData) {
    const config = StartupInterface.getConfig();
    const params = this._getParams(userData);

    return axios.post(StartupInterface.ENDPOINT, params, config)
      .then(_ => { return { errors: false } })
      .catch(_ => { return { errors: true } });
  }

  _getParams(data) {
    const params = {};

    Object.keys(data).forEach((key) => {
      const adjustedKey = caseConversion.toSnakeCase(key);
      params[adjustedKey] = data[key];
    });

    return params;
  }

  static setCSRFToken(token) {
    StartupInterface.CSRF_TOKEN = token;
  }

  static getConfig() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': StartupInterface.CSRF_TOKEN,
      },
    };
  }
}