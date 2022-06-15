import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import StartupInterface from './startup-interface';

describe('app/javascript/packs/signup_app/startup-interface/startup-interface', () => {
  const validParams = {
      email_address: 'joe@blow.com',
      password: 'password',
    };
  const invalidParams = {
      email_address: 'not valid',
      password: 'password',
    };

  it('allows setting a CSRF token', async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(StartupInterface.ENDPOINT, validParams)
      .reply(200);
    StartupInterface.setCSRFToken('this_is_csrf_token');
    const startupInterface = new StartupInterface();
    await startupInterface.submit({ emailAddress: 'joe@blow.com', password: 'password' });

    const sentCSRFToken = mock.history.post[0].headers['X-CSRF-TOKEN'];
    expect(sentCSRFToken).toEqual('this_is_csrf_token');
  });

  it('responds with success when successful', async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(StartupInterface.ENDPOINT, validParams)
      .reply(200);
    const startupInterface = new StartupInterface();
    const response = await startupInterface.submit({ emailAddress: 'joe@blow.com', password: 'password' });

    expect(response).toEqual({
      errors: false,
    });
  });

  it('handles a bad response', async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(StartupInterface.ENDPOINT, validParams)
      .reply(400);
    const startupInterface = new StartupInterface();
    const response = await startupInterface.submit({ emailAddress: 'joe@blow.com', password: 'password' });
    expect(response).toEqual({
      errors: true,
    });
  });
});