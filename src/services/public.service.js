import axio from './middleware/axio'

class PublicService {
  getAll (collection) { return axio('public/getAll' + collection) }
  getTeam (name) { return axio('public/getTeam', { name: name }) }
}

export default new PublicService()
