import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SignUpInterface from "./sign-up-interface";

describe('app/javascript/packs/signup_app/sign-up-interface/sign-up-interface', () => {
  const validParams = { user: {
      name: 'Joe',
      email_address: 'joe@blow.com',
      password: 'password',
      password_confirmation: 'password'
    }};
  const invalidParams = { user : {
      name: 'Joe',
      email_address: 'not valid',
      password: 'password',
      password_confirmation: 'passwordd'
    }};

  it('allows setting of a CSRF token', async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(SignUpInterface.ENDPOINT, validParams)
      .reply(400, { errors: { success: ['yes'] } });

    SignUpInterface.setCSRFToken('do you sell your tokens for money?');
    const signUpInterface = new SignUpInterface();
    const response = await signUpInterface.submit({
      name: 'Joe',
      emailAddress: 'joe@blow.com',
      password: 'password',
      passwordConfirmation: 'password'
    });

    const sentCSRFToken = mock.history.post[0].headers['X-CSRF-TOKEN'];
    expect(sentCSRFToken).toEqual('do you sell your tokens for money?');
  });

  it('handles a successful sign up request', async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(SignUpInterface.ENDPOINT, validParams)
      .reply(200, () => { return {} });

    const signUpInterface = new SignUpInterface();
    const response = await signUpInterface.submit({
      name: 'Joe',
      emailAddress: 'joe@blow.com',
      password: 'password',
      passwordConfirmation: 'password'
    });

    expect(response).toEqual({
      errors: {},
    });
  });

  it('handles a bad request', async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(SignUpInterface.ENDPOINT, invalidParams)
      .reply(400, { errors: {
          email_address: ['is invalid'],
          password_confirmation: ["doesn't match Password"],
        } });

    const signUpInterface = new SignUpInterface();
    const response = await signUpInterface.submit({
      name: 'Joe',
      emailAddress: 'not valid',
      password: 'password',
      passwordConfirmation: 'passwordd'
    });

    expect(response).toEqual({
      errors: {
        emailAddress: ['is invalid'],
        passwordConfirmation: ["doesn't match password"],
      },
    });
  });
});