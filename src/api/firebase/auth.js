import { auth, firestore } from './index'
const collection = firestore.collection('users')

export function signInWithEmailAndPassword({ username, password }) {
  auth.signInWithEmailAndPassword(username, password).then((doc) => {
    return doc
  })
}

