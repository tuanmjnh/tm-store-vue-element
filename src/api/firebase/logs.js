import firebase from './index'
import store from '@/store'
import localIP from '@/utils/local-ip'
const collection = firebase.firestore().collection('logs')

export function getByUid(params) {
  let qry = collection.where('flag', '==', params.flag) // .orderBy('created_at', 'desc')
  if (params.search) {
    qry = qry.where('name', '>=', 'test').where('name', '<=', 'test' + '\uf8ff')
  }
  return qry.get().then((docs) => {
    const items = []
    docs.forEach(function(doc) {
      items.push({ ...{ id: doc.id }, ...doc.data() })
    })
    return items
  })
}

export function getByDoc(params) {
  return collection
    .where('cid', '==', params.cid)
    .where('coll', '==', params.coll)
    .orderBy('at', 'desc')
    .get().then((docs) => {
      const items = []
      docs.forEach(function(doc) {
        items.push(doc.data())
      })
      return items
    })
}

export function add(data) {
  // params.data = {
  //   action: params.action,
  //   collection: params.collection,
  //   cid: params.cid,
  //   uid: store.state.auth.uid,
  //   by: store.state.auth.profile.email,
  //   at: firebase.firestore.FieldValue.serverTimestamp(),
  //   ip: ''
  // }
  return new Promise((resolve, reject) => {
    data.uid = store.state.auth.uid
    data.by = store.state.auth.profile.email
    data.at = firebase.firestore.FieldValue.serverTimestamp()
    data.ip = ''
    collection.add(data).then((docRef) => {
      docRef.get().then((doc) => {
        resolve(doc.data())
      })
    })
  })
}

export async function insertType(data) {
  data.action = 'insert'
  return await add(data)
}
export async function updateType(data) {
  data.action = 'update'
  return await add(data)
}
export async function trashType(data) {
  data.action = 'trash'
  return await add(data)
}
export async function recoverType(data) {
  data.action = 'recover'
  return await add(data)
}
export function getTimeLine(data) {
  // let rs = {
  //   size: data.type === 'insert' ? 'large' : 'normal',
  //   icon
  // }
  // if (data.type === 'insert') rs.type = 'primary'
  // else if (data.type === 'update') rs.type = 'warning'
  // else if (data.type === 'trash') rs.type = 'danger'
  // else rs.type = 'info'
  // return rs
  //     content: `${this.$t('global.created_by')}: ${x.created_by}`,
  //     timestamp: x.created_at ? this.$moment(x.created_at.toDate()).format('DD/MM/YYYY hh:mm') : '',
  //     size: 'large',
  //     type: 'primary',
  //     icon: 'el-icon-plus',
  //     color: '#1890FF'
}

export function del(params) {
  collection.doc(params.item.id).delete()
    .then(doc => { })
}
