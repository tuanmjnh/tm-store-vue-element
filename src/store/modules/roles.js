import db from '@/api/firebase/index'
const collection = 'roles'

const state = {
  items: {}
  // default: {
  //   id: '',
  //   key: '',
  //   name: '',
  //   desc: '',
  //   routes: []
  // }
}

const mutations = {
}

const actions = {
  select({ state }, params) {
    let qry = db.firestore().collection(collection).orderBy('name', 'asc')
    // Filter data
    if (params) {
      if (params.conditions && params.conditions.length > 0) {
        params.conditions.forEach(e => { qry = qry.where(e.key, e.operation, e.value) })
      }
      // Search data
      if (params && params.search) {
        qry = qry.where('name', '>=', params.search).where('name', '<=', params.search + '\uf8ff')
      }
    }
    // Return data
    return qry.get().then((rs) => {
      state.items = []
      rs.forEach((doc) => { state.items.push({ ...{ id: doc.id }, ...doc.data() }) })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
