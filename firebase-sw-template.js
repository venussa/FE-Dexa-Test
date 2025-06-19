importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "<API_KEY>",
  authDomain: "<AUTH_DOMAIN>",
  projectId: "<PROJECT_ID>",
  storageBucket: "<STORAGE_BUCKET>",
  messagingSenderId: "<MESSAGING_SENDER_ID>",
  appId: "<APP_ID>"
});

const messaging = firebase.messaging();

self.addEventListener('push', function(event) {
  if (event.data) {
    const payload = event.data.json();
    const { title, body } = payload.notification;

    const options = {
      body,
      data: payload.data || {},
    };

    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  }
});