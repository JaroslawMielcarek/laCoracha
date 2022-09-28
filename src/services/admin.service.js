import axio from './middleware/axio'

class AdminService {
  status (collection) { return axio('admin/status' + collection) }
  getAll (collection) { return axio('admin/getAll' + collection) }
  create (collection, data) { return axio('admin/create' + collection, data) }
  update (collection, data) { return axio('admin/update' + collection, data) }
  remove (collection, data) { return axio('admin/delete' + collection, data) }
  setMonthlyPayment (collection, data) { return axio('admin/setMonthlyPayment' + collection, data) }
}

export default new AdminService()
