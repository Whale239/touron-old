import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCCZ2bo_iPbtvarsADQe84qX2s9cWPMq3U',
  authDomain: 'touronapp-248e4.firebaseapp.com',
  databaseURL: 'https://touronapp-248e4.firebaseio.com',
  projectId: 'touronapp-248e4',
  storageBucket: 'touronapp-248e4.appspot.com',
  messagingSenderId: '813320271971',
  appId: '1:813320271971:web:5a10483e3c11bc953aa056',
  measurementId: 'G-KCPSW6WFC9',
};

let fire;

if (!firebase.apps.length) {
  fire = firebase.initializeApp(firebaseConfig, 'touron-webapp');
} else {
  fire = firebase.app();
}

export let firedb = fire.database();
export let fireStorage = fire.storage();
export let auth = fire.auth();
