import { useCallback, useEffect, useState } from 'react'
import { FormField } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../modules/authentication/actions'
import { errorLoginSelector, isLoggedSelector, loadingLoginSelector } from '../modules/authentication/selector'
import { usePrevious } from '../hooks/use-previous'
import Button from '../components/Button'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const errorLogin = useSelector(errorLoginSelector)
    const isLoginLoading = useSelector(loadingLoginSelector)
    const isLogged = useSelector(isLoggedSelector)
    const wasLogged = usePrevious(isLogged)
    console.log('teste', isLoginLoading)

    useEffect(() => {
        if (isLogged && state.email && state.password && !isLoginLoading) {
            navigate('/')

            setState({
                email: '',
                password: ''
            })
        }
    }, [isLogged, navigate, wasLogged, isLoginLoading])

    const onChange = useCallback(event => {
        const { name, value } = event.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }, [])

    const onSubmit = useCallback(event => {
        event.preventDefault()
        dispatch(login(state))
    }, [state, dispatch])

  return (
    <div className='flex'>
        <div className='w-1/2 mx-6 flex flex-col justify-between py-20 px-16'>
            <h1 className='font-semibold text-4xl text-center'>Welcome back</h1>
            <form className='flex flex-col justify-center' onSubmit={onSubmit}>
                <FormField
                    className="mb-4"
                    labelName="Email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={state.email}
                    handleChange={onChange}
                />
                <FormField
                    className=""
                    labelName="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={state.password}
                    handleChange={onChange}
                />
                <Link className='text-sm text-right mb-4 mt-2 underline'>Forgot password?</Link>
                <Button isLoading={isLoginLoading}>Log in</Button>
                <p className='text-sm mt-2'>Don't have an account? <Link to='/sign-up' className='font-semibold underline cursor-pointer'>Sign up</Link></p>
            </form>

            <div className='w-full flex justify-center'>
                <button className='py-4 px-16 border rounded-[5rem]'>Sign up with Google</button>
            </div>
        </div>
        <div className='w-1/2 h-[calc(100vh-73px)] mx-6 flex items-center'>
            <img className='w-full h-[calc(100vh-90px)] object-cover rounded-3xl' src='https://cdn.openart.ai/uploads/image_random_EQzmLBWS_1664596083880_1024.webp' />
        </div>
    </div>
  )
}

export default Login