import axio from './middleware/axio'
// const headers = { 'Content-Type': 'multipart/form-data'}
class ModeratorService {
  getAll (collection) { return axio('moderator/getAll' + collection) }
  create (collection, data) { return axio('moderator/create' + collection, data)}
  update (collection, data) { return axio('moderator/update' + collection, data)}
  remove (collection, data) { return axio('moderator/delete' + collection, data)}
}

export default new ModeratorService()
