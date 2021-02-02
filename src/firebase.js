import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDF2n0ldTj3k3J0UmJT36ulf69Jy26wdY8",
  authDomain: "ffff-8.firebaseapp.com",
  databaseURL: "https://ffff-8-default-rtdb.firebaseio.com",
  projectId: "ffff-8",
  storageBucket: "ffff-8.appspot.com",
  messagingSenderId: "755086614964",
  appId: "1:755086614964:web:e119b0278f9acc59a312e1"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const userRef = firebaseApp.database().ref("users");

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/8.2.5/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>
*/
