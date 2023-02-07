import axio from './middleware/axio'

class PublicService {
  getAll (collection) { return axio('public/getAll' + collection) }
  getTeam (name) { return axio('public/getTeam', { name: name }) }
  sendJoinRequest (data) { return axio('public/sendJoinRequest', data)}
}

export default new PublicService()
