import store from '@/store/index'

export function sendToWhatsApp () {
  window.location.href = 'https://wa.me/393497492300'
}
export function setNotification (value) {
  if (!Array.isArray(value.text)) value.text = [value.text]
  store.dispatch('addNotification', value)
}

export function submitForm (acction, value, callback) {
  store.dispatch(acction, value)
    .then(response => {
      setNotification({
        name: acction,
        text: response,
        typeOfNotification: 'success'
      })
    })
    .then( () => {
      callback()
    })
    .catch(error => {
      setNotification({
        name: acction,
        text: error,
        typeOfNotification: 'danger'
      })
    })
}

export function removeElement (type, value) {
  if (confirm(`Are you sure you want to delete ${type}`)) {
    store.dispatch(`remove${type}`, value) 
      .then(response => {
        this.setNotification({
          name: `remove${type}`,
          text: response,
          typeOfNotification: 'success'
        })
      })
      .catch(error => {
        this.setNotification({
          name: `remove${type}`,
          text: error,
          typeOfNotification: 'danger'
        })
      })
  }
}