import firebase from 'firebase/app'
import 'firebase/auth'

// const config = {
//   REACT_APP_FIREBASE_KEY: "AIzaSyAsxkXLcXVajX_ZZ1hpzxJ4lU0yhJ25Lxg",
//   REACT_APP_FIREBASE_DOMAIN: "fragment-c5b38.firebaseapp.com",
//   REACT_APP_FIREBASE_DATABASE: "https://fragment-c5b38.firebaseio.com",
//   REACT_APP_FIREBASE_PROJECT_ID: "fragment-c5b38",
//   REACT_APP_FIREBASE_STORAGE_BUCKET: "fragment-c5b38.appspot.com",
//   REACT_APP_FIREBASE_SENDER_ID: "197591288817"
// };

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
})

export const createUser = ({ email, password }) => {
  return app.auth().createUserWithEmailAndPassword(email, password)
}

export const sendVerificationEmail = () => {
  return app.auth().currentUser.sendEmailVerification()
}

export const signInUser = ({ email, password }) => {
  return app.auth().signInWithEmailAndPassword(email, password)
}

export const updateProfile = ({
  displayName = 'Jane Q. User',
  photoURL = 'https://randomuser.me/api/portraits/women/24.jpg'
}) => {
  return app.auth().currentUser.updateProfile({
    displayName,
    photoURL
  })
}

export const logoutUser = () => {
  return app.auth().signOut()
}

export const authStateChanged = ({ onSuccess, onError }) => {
  const result = app.auth().onAuthStateChanged(user => {
    if (user) {
      if (typeof onSuccess === 'function') {
        onSuccess(user)
      }
    } else {
      if (typeof onError === 'function') {
        onError()
      }
    }
  })
  return result
}

export const oauthLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
  app.auth().signInWithPopup(provider).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })
}
