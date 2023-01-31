import store from '@/store/index'
import { v4 as uuidv4 } from 'uuid'

export function sendToWhatsApp () {
  window.location.href = 'https://wa.me/393497492300'
}
export function setNotification (value) {
  if (!Array.isArray(value.text)) value.text = [value.text]
  store.dispatch('addNotification', value)
}

export function submitForm (acction, value) {
  return store.dispatch(acction, value)
    .then(response => {
      setNotification({
        id: uuidv4(),
        name: acction,
        text: response,
        typeOfNotification: 'success'
      })
      return true
    })
    .catch(error => {
      setNotification({
        id: uuidv4(),
        name: acction,
        text: error,
        typeOfNotification: 'danger'
      })
      return false
    })
}

export function removeElement (type, value) {
  if (confirm(`Are you sure you want to delete ${type}`)) {
    store.dispatch(`remove${type}`, value) 
      .then(response => {
        this.setNotification({
          id: uuidv4(),
          name: `remove${type}`,
          text: response,
          typeOfNotification: 'success'
        })
      })
      .catch(error => {
        this.setNotification({
          id: uuidv4(),
          name: `remove${type}`,
          text: error,
          typeOfNotification: 'danger'
        })
      })
  }
}