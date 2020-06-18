import firebaseConfig from './firebase_config.json'
declare var firebase:any;

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const firebaseConnection = firebase.auth().signInWithEmailAndPassword('jptannus@gmail.com', 'testpassword');

// Validate login
firebaseConnection.then((data) => {
  console.log('User loggin was successful!');
})
.catch((error) => console.error(error));

const Database = {
  getDB() {
    return firebaseConnection.then(() => firestore);
  },
  getCurrentUser() {
    return firebaseConnection.then((data) => data.user)
  }
}

export default Database;