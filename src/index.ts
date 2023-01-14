/**
 * Insipred by https://github.com/engage-so/engage-js/blob/master/packages/core/index.js
 */
import fetch from 'cross-fetch';
import { SimpuEventsError } from './error';

const baseUrl = 'https://events.simpu.sh';

const options: { [key: string]: string | null } = {
  key: null,
};

async function _request(
  url: string,
  params: object,
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH'
) {
  try {
    if (!params) {
      params = {};
    }
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: options.key ?? '',
      },
      body: JSON.stringify(params),
    });
    const body = await response.json();
    let error = 'API connection error';
    if (!response.ok) {
      if (body && body.error) {
        error = body.error;
      }
      return { error };
    }
    return body;
  } catch (e) {
    return { error: 'API connection error' };
  }
}

// Alias of _request method
const request = (
  url: string,
  params: object,
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH'
) => {
  return _request(`${baseUrl}${url}`, params, method);
};

// Initialize SDK and setup API Authorization
const init = (o: { key: string }) => {
  if (!o) {
    throw new SimpuEventsError('You need to pass in your API key.');
  }
  if (typeof o === 'string') {
    options.key = o;
    return;
  }

  if (!o.key) {
    throw new SimpuEventsError('`key` missing in object.');
  }
  if (o.key) {
    options.key = `${o.key}`;
  }
};

// Identify users
const identify = async (o: { user_id: string; traits: object }) => {
  if (!o) {
    throw new SimpuEventsError(
      'You need to pass an object with at least a user id'
    );
  }
  if (!o.user_id) {
    throw new SimpuEventsError('User id is required.');
  }
  if (!o.traits) {
    throw new SimpuEventsError('User trait is required.');
  }

  return request('/users', o, 'POST');
};

// Track events
const track = async (o: {
  user_id: string;
  event_key: string;
  properties?: object;
}) => {
  if (!o.user_id) {
    throw new SimpuEventsError('User id is required.');
  }
  if (!o.event_key) {
    throw new SimpuEventsError('Event name is required.');
  }

  return request('/event', o, 'POST');
};

module.exports = {
  init,
  identify,
  track,
  request,
};
