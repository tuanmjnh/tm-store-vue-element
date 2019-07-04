import firebase from './index'
const collection = firebase.firestore().collection('users')

export function signInWithEmailAndPassword({ username, password }) {
  firebase.auth().signInWithEmailAndPassword(username, password).then((doc) => {
    return doc
  })
}

