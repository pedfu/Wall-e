import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import dotenv from 'dotenv'
import cookies from 'react-cookies'
import { Provider } from 'react-redux'
import configureStore from './store/store-configuration'
import './index.css'

// dotenv.config()

const root = () => {
  const cookieKey = cookies.load('key')
  const cookieUser = cookies.load('user')

  const initialState = {
    authentication: {
      key: cookieKey,
      user: cookieUser
    }
  }

  const store = configureStore(initialState)

  ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>,
 )
}

root()


