importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAVMP3RGAaQl0Nim_Jvi_mDb2sU3FnZ8sA",
  authDomain: "foodchart-96009.firebaseapp.com",
  databaseURL: "https://foodchart-96009.firebaseio.com",
  projectId: "foodchart-96009",
  storageBucket: "foodchart-96009.firebasestorage.app",
  messagingSenderId: "591484359935",
  appId: "1:591484359935:web:cef992cd162e7470c8e8ca"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  });
});
