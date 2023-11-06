import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormField } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../modules/authentication/actions'
import { getIpAddress } from '../services/ipAddress'
import { isLoggedSelector, loadingSignUpSelector } from '../modules/authentication/selector'
import { usePrevious } from '../hooks/use-previous'

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [state, setState] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})

    const isLogged = useSelector(isLoggedSelector)
    const wasLogged = usePrevious(isLogged)
    const isSignupLoading = useSelector(loadingSignUpSelector)

    useEffect(() => {
        if (isLogged && state.email && state.password && !isSignupLoading) {
            navigate('/')

            setState({
                email: '',
                password: ''
            })
        }
    }, [isLogged, navigate, wasLogged, isSignupLoading])

    const validateFields = useCallback(() => {
        const error = {}
        if (!state.email) error['email'] = 'Email not fulfilled' 
        if (!state.username) error['username'] = 'Username not fulfilled' 
        if (!state.password) error['password'] = 'Password not fulfilled'

        setErrors(error)
    }, [state])

    const onChange = useCallback(event => {
        const { name, value } = event.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }, [])

    const onSubmit = useCallback(async event => {
        event.preventDefault()
        validateFields()
        if (Object.keys(errors).length > 0) return
        const body = {
            username: state.username,
            email: state.email,
            password: state.password
        }

        const ipAddress = await getIpAddress()
        if (ipAddress?.data?.ip) {
            body.ipAddress = ipAddress?.data?.ip
        }
        dispatch(signup(body))
    }, [dispatch, state.email, state.password, state.username, errors])

  return (
    <div className='flex'>
        <div className='w-1/2 mx-6 flex flex-col justify-between py-20 px-16'>
            <h1 className='font-semibold text-4xl text-center'>Create account</h1>
            <form className='flex flex-col justify-center' onSubmit={onSubmit}>
                <FormField
                    className="mb-7"
                    labelName="Username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    error={errors.username}
                    value={state.username}
                    handleChange={onChange}
                />
                <FormField
                    className="mb-7"
                    labelName="Email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    error={errors.email}
                    value={state.email}
                    handleChange={onChange}
                />
                <FormField
                    className="mb-7"
                    labelName="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    error={errors.password}
                    value={state.password}
                    handleChange={onChange}
                />
                <button className='py-4 px-16 mt-4 border rounded-[5rem]'>Create account</button>
                <p className='text-sm mt-2'>Already have an Account? <Link to='/login' className='font-semibold underline cursor-pointer'>Log in</Link></p>
            </form>

            <div className='w-full flex justify-center'>
                <button className='py-4 px-16 border rounded-[5rem]'>Sign up with Google</button>
            </div>
        </div>
        <div className='w-1/2 h-[calc(100vh-73px)] mx-6 flex items-center'>
            <img className='w-full h-[calc(100vh-90px)] object-cover rounded-3xl' src='https://cdn.openart.ai/published/4yVY24VTP48ZjPPvGDzY/kqLEnPxe_p0DC_1024.webp' />
        </div>
    </div>
  )
}

export default SignUp