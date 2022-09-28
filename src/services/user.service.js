import axio from './middleware/axio'

class UserService {
  updateUserData (data) { return axio('user/updateUserData', data) }
  getAll (collection) { return axio('user/getAll' + collection) }
  subscribe (collection, data) { return axio('user/subscribe' + collection, data) }
}

export default new UserService()
