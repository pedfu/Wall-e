import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormField } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../modules/authentication/actions'
import { getIpAddress } from '../services/ipAddress'
import { isLoggedSelector, loadingSignUpSelector } from '../modules/authentication/selector'
import { usePrevious } from '../hooks/use-previous'
import { containsNumbers, containsSpecialCharacters } from '../utils'

const PASSWORD_QUALITY = {
    WEAK: 'weak',
    GOOD: 'good',
    STRONG: 'strong',
}

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        isPasswordVisible: false
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

    const passwordQuality = useMemo(() => {
        if (!state.password) return

        var passwordQuality = PASSWORD_QUALITY.WEAK

        if (state.password !== state.password.toLowerCase() && 
            state.password !== state.password.toUpperCase()) {
            passwordQuality = PASSWORD_QUALITY.GOOD

            if (containsNumbers(state.password) &&
                state.password.length >= 10 &&
                containsSpecialCharacters(state.password)) {
                passwordQuality = PASSWORD_QUALITY.STRONG
            }
        }

        return passwordQuality
    }, [state.password])

    const validateFields = useCallback(() => {
        const error = {}
        if (!state.email) error['email'] = 'Email not fulfilled' 
        if (!state.username) error['username'] = 'Username not fulfilled' 
        if (!state.password || passwordQuality !== PASSWORD_QUALITY.STRONG) error['password'] = 'Password not fulfilled or weak'

        setErrors(error)
        if (error) return false
        return true
    }, [state])

    const onChange = useCallback(event => {
        const { name, value } = event.target

        if (errors[name]) {
            errors[name] = null
        }

        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }, [errors])

    const onSubmit = useCallback(async event => {
        event.preventDefault()
        if (!validateFields()) return
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

    const handlePasswordVisibility = useCallback(() => {
        setState(prevState => ({
            ...prevState,
            isPasswordVisible: !prevState.isPasswordVisible
        }))
    }, [])

  return (
    <div className='flex bg-bgWhite'>
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
                    type={`${state.isPasswordVisible ? 'text' : 'password'}`}
                    name="password"
                    placeholder="Password"
                    error={errors.password}
                    value={state.password}
                    handleChange={onChange}
                    icon={!state.isPasswordVisible ? <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg> : <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>}
                    handleIconClick={handlePasswordVisibility}
                    message={passwordQuality ? `Your password is ${passwordQuality}` : null}
                />
                <button className='py-4 px-16 mt-4 border rounded-[5rem]'>Create account</button>
                <p className='text-sm mt-2'>Already have an Account? <Link to='/login' className='font-semibold underline cursor-pointer'>Log in</Link></p>
            </form>

            {/*<div className='w-full flex justify-center'>
                <button className='py-4 px-16 border rounded-[5rem]'>Sign up with Google</button>
            </div>*/}
            <div></div>
        </div>
        <div className='w-1/2 h-[calc(100vh-73px)] mx-6 flex items-center'>
            <img className='w-full h-[calc(100vh-90px)] object-cover rounded-3xl' src='https://cdn.openart.ai/published/4yVY24VTP48ZjPPvGDzY/kqLEnPxe_p0DC_1024.webp' />
        </div>
    </div>
  )
}

export default SignUp