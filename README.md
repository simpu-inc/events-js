# Simpu Events JavaScript SDK

Simpu the only customer communication platform you'll ever need. Increase revenue and customer satisfaction with Simpu's best-in-class shared Inbox, Chatbot, Text & Email Marketing Platform.

The Simpu Events JavaScript SDK allows you to automatically identifiy users and user attributes and track user actions on your site or application. It can be used both in Node.js or in the browser.

## Installation and Setup

To install the Simpu Events SDK, use:

```bash
npm install -save @simpu/events-js # or yarn add @simpu/events-js
```

```bash
import { Simpu } from '@simpu/events-js'
```

## Configuration

You can initializing the Simpu Events SDK with a Simpu public API key using the following methods:

```bash
let simpu = new Simpu('YOUR_SIMPU_PUBLIC_API_KEY');
```

```bash
let simpu = new Simpu();
simpu.init({
  key: 'YOUR_SIMPU_PUBLIC_API_KEY'
})
```

```bash
let simpu = new Simpu();
simpu.init('YOUR_SIMPU_PUBLIC_API_KEY')
```

> The SDK identifies your application with the `key` parameter. Your can generate a public API key in your Simpu account dashboard.

### Identifying users

To track user events, actions, or user information in Simpu, we first need some basic details about the user. This includes a unique identification number, their email address and their name (optional). This information helps us connect and understand the user's data. You only have to provide this information once, typically during the user signup process.

```bash
simpu.identify({
  user_id: '1234',
  traits: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'test@example.com',
  }
})
```

`user_id` should be a unique identifier for the user in your application, it should be a value that will not change.

If you need to update a users properties, you can call identify method with the new values for the properties to update.

### Tracking user events

Track user events/actions with the SDK like this:

```bash
simpu.track({
  user_id: '1234',
  event_key: 'Campaign Paused',
})
```

Events with additional properties can be tracked as follows:

```bash
simpu.track({
  user_id: '1234',
  event_key: 'Campaign Paused',
  properties: {
    name: 'Test campaign',
  },
})
```

#### A note on values

When tracking attributes and events, it is important you use the right data type for better segmentation. For example, instead of using a string value of `$10` for a price, you can use a number value so that numerical operators like equality, greater than, and less than can be used on the value.

To track a date attribute, use a valid date format like `2023-06-12` or `2023-06-12T10:00:00Z`.
