import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isLoggedSelector } from '../modules/authentication/selector'
import useAuthentication from '../hooks/use-authentication'

function Header() {
  const isLogged = useSelector(isLoggedSelector)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { logout } = useAuthentication()

  const onClickLogout = useCallback(event => {
    event.preventDefault()
    logout()
  }, [logout])
  
  useEffect(() => {
    // if (!isLogged && pathname !== '/login' && pathname !== '/sign-up') {
    //     navigate('/login')
    // }
  }, [isLogged, navigate, pathname])

  return (
    <header className='w-full max-w-8xl flex justify-between items-center bg-darkGrey border-b-[1px] border-grey sm:px-8 px-4 py-4'>
        <Link to='/'>
          <p className='text-3xl font-bold text-white'>AI_</p>
        </Link>

        <div className='text-white'>
          {/* <Link to='/about' className='mr-6'>About</Link> */}
          <Link to='/how-to-use' className='mr-6'>How to use</Link>
          <Link to='/generate-image'>Generate image</Link>
        </div>

        {/* <Link to='/generate-image' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
          Create
        </Link> */}
        {isLogged ? (
          <Link onClick={onClickLogout} className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
          Logout
        </Link>
        ) : (
          <Link to='/sign-up' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
          Sign up
        </Link>
        )}        
      </header>
  )
}

export default Header