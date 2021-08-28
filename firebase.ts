import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyB_qfzh8gnuOoQgaIJwSJ0xy6R7tWjGeVw',
  authDomain: 'vdp-nextjs-whatsapp2.firebaseapp.com',
  projectId: 'vdp-nextjs-whatsapp2',
  storageBucket: 'vdp-nextjs-whatsapp2.appspot.com',
  messagingSenderId: '227082341255',
  appId: '1:227082341255:web:978844060ff5f4278e2122',
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
