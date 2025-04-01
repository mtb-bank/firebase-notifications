# Firebase Notification Sender

A simple tool for sending push notifications via Firebase Cloud Messaging.

## Installation

1. Clone the repository:
```bash
git clone git@github.com:mtb-bank/firebase-notifications.git
```

2. Install dependencies:
```bash
npm install
```

3. Add service-account.json file to the project root
   - Get this file from Firebase Console (Project Settings -> Service Accounts)
   - Generate new key and save it as service-account.json

## Usage

To send a notification, run:

```bash
npm run send
```

## Configuration

Make sure to configure the correct notification parameters in send-notification.js:
- topic - topic for sending notification
- notification - object with notification title and body