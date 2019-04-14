import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBLMDPZNDdBUzo-YnxXt1LcFuQQbCeL3Gk',
  authDomain: 'project-slayer-tusave.firebaseapp.com',
  databaseURL: 'https://project-slayer-tusave.firebaseio.com',
  projectId: 'project-slayer-tusave',
  storageBucket: 'project-slayer-tusave.appspot.com',
  messagingSenderId: '52098615542'
};
firebase.initializeApp(firebaseConfig);

export default firebase;
