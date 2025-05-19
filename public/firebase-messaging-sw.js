importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDP6gMvZDw3LleJvjbbxlosECt1iUEe3T8",
  authDomain: "visionquest-gst.firebaseapp.com",
  projectId: "visionquest-gst",
  storageBucket: "visionquest-gst.firebasestorage.app",
  messagingSenderId: "589985653318",
  appId: "1:589985653318:web:d2476c16d701102b0e2047",
  measurementId: "G-JWQRV54YH8"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);
  console.log("Storage:");
  console.log(payload.notification.title);
  console.log(payload.notification.body);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  });
});
