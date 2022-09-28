import axio from '../middleware/axio'

class AuthService {
  login (user) {
    return axio('auth/signin', {
      username: user.username,
      password: user.password
    })
      .then(response => {
        if (response.accessToken) {
          localStorage.setItem('user', JSON.stringify(response))
        }
        return response
      })
  }

  logout () { 
    console.log('remove user from localstorage')
    localStorage.removeItem('user') 
    return true
  }

  register (user) { return axio('auth/signup', user) }
  forgot (data) { return axio('auth/forgot', data) }
  reset (data, accessToken) { return axio('auth/reset', data, { headers: { 'x-access-token': accessToken } }) }
}
export default new AuthService()
