import fetch from 'cross-fetch';
import { SimpuEventsError } from './error';

export class Simpu {
  key?: string;
  baseUrl = 'https://events.simpu.sh';

  constructor(key?: string) {
    this.key = key;
  }

  async _request(
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
          Authorization: this.key ?? '',
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

  request(
    url: string,
    params: object,
    method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH'
  ) {
    return this._request(`${this.baseUrl}${url}`, params, method);
  }

  init(o: string | { key: string }) {
    if (!o) {
      throw new SimpuEventsError('You need to pass in your API key.');
    }
    if (typeof o === 'string') {
      this.key = o;
      return;
    }

    if (!o.key) {
      throw new SimpuEventsError('`key` missing in object.');
    }
    if (o.key) {
      this.key = `${o.key}`;
    }
  }

  // Identify users
  async identify(o: { user_id: string; traits: object }) {
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

    return this.request('/users', o, 'POST');
  }

  // Track events
  async track(o: { user_id: string; event_key: string; properties?: object }) {
    if (!o.user_id) {
      throw new SimpuEventsError('User id is required.');
    }
    if (!o.event_key) {
      throw new SimpuEventsError('Event name is required.');
    }

    return this.request('/event', o, 'POST');
  }
}
