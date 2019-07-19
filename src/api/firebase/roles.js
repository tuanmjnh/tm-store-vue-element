import db from './index'
import * as actions from './extend-action'
const collection = db.firestore().collection('roles')

export function getAll(params) {
  let qry = collection.orderBy('name', 'asc')
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
    const items = []
    rs.forEach((doc) => { items.push({ ...{ id: doc.id }, ...doc.data() }) })
    return items
  })
}

export async function getPagination(params) {
  let qry = collection.orderBy('name', 'asc')
  // Filter data
  if (params && params.conditions && params.conditions.length > 0) {
    params.conditions.forEach(e => { qry = qry.where(e.key, e.operation, e.value) })
  }
  // Search data
  if (params && params.search) qry = qry.where('name', '>=', params.search).where('name', '<=', params.search + '\uf8ff')
  // Get all documents
  const documentSnapshots = await qry.get()
  const offset = documentSnapshots.docs[params.pageSize * (params.currentPage - 1)]
  params.totalItems = documentSnapshots.docs.length
  // Return data
  if (offset) {
    return qry.startAt(offset).limit(params.pageSize).get().then((rs) => {
      // console.log(rs.docs[0].data())
      const items = []
      rs.forEach(doc => { items.push({ ...{ id: doc.id }, ...doc.data() }) })
      return items
    })
  } else return []
}

export function find(id) {
  return collection.doc(id).get().then(async doc => {
    if (doc.exists) {
      const rs = doc.data()
      rs.log = await actions.getLogByDoc({ cid: collection.id, did: id })
      return rs
    }
  })
}

export function add(params) {
  return actions.add({ collection: collection, data: params.data })
}

export function edit(params) {
  const data = { ...params.data }
  if (data.id) delete data.id
  return actions.update({ collection: collection, id: params.id, data: data })
}

export function trash(params) {
  return new Promise(async (resolve, reject) => {
    const result = []
    try {
      for (const item of params) {
        if (item.flag === 1) {
          actions.trash({ id: item.id, collection: collection, data: { flag: 0 } })
        } else {
          actions.recover({ id: item.id, collection: collection, data: { flag: 1 } })
        }
        result.push(item)
      }
      resolve(result)
    } catch (err) {
      reject(err)
    }
  })
}

export function remove(params) {
  return new Promise(async (resolve, reject) => {
    const result = []
    try {
      for (const item of params) {
        actions.remove({ id: item.id, collection: collection })
        result.push(item)
      }
      resolve(result)
    } catch (err) {
      reject(err)
    }
  })
}

export function getLog(id) {
  return actions.getLogByDoc({ cid: collection.id, did: id })
}
