import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import cookies from 'react-cookies'
import { Provider } from 'react-redux'
import createStore from './store/store-configuration'
import './index.css'

const root = () => {
  const cookieKey = cookies.load('key')
  const cookieUser = cookies.load('user')

  const initialState = {
    authentication: {
      key: cookieKey,
      user: cookieUser
    }
  }

  const store = createStore(initialState)

  ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>,
 )
}

root()


