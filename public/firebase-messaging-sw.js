importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBua3wJ5KoDMxhO8SmKHX9ce0Fapel6Xlo",
  authDomain: "social-login-29a59.firebaseapp.com",
  projectId: "social-login-29a59",
  storageBucket: "social-login-29a59.firebasestorage.app",
  messagingSenderId: "812709778021",
  appId: "1:812709778021:web:d4e3590ae8c83eaf6e2c8c"
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