import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyBcvOdFyqKtCRSX_LTA2YirSaD0Rs_Z9kc',
  authDomain: 'vdp-nextjs-whatsapp.firebaseapp.com',
  projectId: 'vdp-nextjs-whatsapp',
  storageBucket: 'vdp-nextjs-whatsapp.appspot.com',
  messagingSenderId: '372702177177',
  appId: '1:372702177177:web:fc513a7631992bf0499508',
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
