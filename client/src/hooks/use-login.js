import { useDispatch } from 'react-redux'
import { login, logout } from '../modules/authentication/actions'

export default () => {
  // dispatch
  const dispatch = useDispatch()
  
  return {
    login: async credentials => {
      try {
        const response = await ServiceWorker.login(credentials)
        dispatch(login(response))
      } catch (error) {
        return error  
      }
    },
    logout: () => {
      dispatch(logout())
    }
  }
}

// reducer for login
    // use cookies.save to save user token key (or id?) and username

// reducer for logout
    // use cookies.remove to remove saved data