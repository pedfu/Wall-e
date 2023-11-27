import { useCallback, useEffect, useState } from 'react'
import { FormField } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../modules/authentication/actions'
import { errorLoginSelector, isLoggedSelector, loadingLoginSelector } from '../modules/authentication/selector'
import { usePrevious } from '../hooks/use-previous'
import Button from '../components/Button'

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [state, setState] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        isPasswordVisible: false,
        isConfirmPasswordVisible: false,
    })
    const [errors, setErrors] = useState({})

    const errorLogin = useSelector(errorLoginSelector)
    const isLoginLoading = useSelector(loadingLoginSelector)
    const isLogged = useSelector(isLoggedSelector)
    const wasLogged = usePrevious(isLogged)

    useEffect(() => {
        if (isLogged && state.username && state.password && !isLoginLoading) {
            navigate('/')

            setState({
                username: '',
                password: ''
            })
        }
    }, [isLogged, navigate, wasLogged, isLoginLoading])

    const validateFields = useCallback(() => {
        const error = {}
        if (!state.email) error['email'] = 'Email not fulfilled' 
        if (!state.confirmPassword) error['confirmPassword'] = 'Confirm password not fulfilled' 
        if (!state.password) error['password'] = 'Password not fulfilled'
        if (state.confirmPassword !== state.password) {
            error['password'] = 'Password and confirm password not matching'
            error['confirmPassword'] = 'Password and confirm password not matching'
        }

        setErrors(error)
    }, [state])

    const onChange = useCallback(event => {
        const { name, value } = event.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }, [])

    const onSubmit = useCallback(event => {
        event.preventDefault()
        validateFields()
        if (Object.keys(errors).length > 0) return
        dispatch(login(state))
    }, [state, dispatch])

    const handlePasswordVisibility = useCallback(type => {
        if (type === 'confirmPassword') {
            setState(prevState => ({
                ...prevState,
                isConfirmPasswordVisible: !prevState.isConfirmPasswordVisible
            }))
        } else {
            setState(prevState => ({
                ...prevState,
                isPasswordVisible: !prevState.isPasswordVisible
            }))
        }
    }, [])

  return (
    <div className='flex bg-bgWhite'>
        <div className='w-1/2 mx-6 flex flex-col justify-between py-20 px-16'>
            <h1 className='font-semibold text-4xl text-center'>Reset your password</h1>
            <form className='flex flex-col justify-center' onSubmit={onSubmit}>
                <FormField
                    className="mb-7"
                    labelName="Email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    error={errors?.username}
                    value={state.username}
                    handleChange={onChange}
                />
                <FormField
                    className="mb-7"
                    labelName="Password"
                    type={`${state.isPasswordVisible ? 'text' : 'password'}`}
                    name="password"
                    placeholder="Password"
                    error={errors?.password}
                    value={state.password}
                    handleChange={onChange}
                    icon={!state.isPasswordVisible ? <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg> : <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>}
                    handleIconClick={handlePasswordVisibility}
                />
                <FormField
                    className="mb-4"
                    labelName="Confirm password"
                    type={`${state.isConfirmPasswordVisible ? 'text' : 'password'}`}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    error={errors?.confirmPassword}
                    value={state.confirmPassword}
                    handleChange={onChange}
                    icon={!state.isConfirmPasswordVisible ? <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg> : <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>}
                    handleIconClick={() => handlePasswordVisibility('confirmPassword')}
                />
                <Button isLoading={isLoginLoading}>Reset password</Button>
                <p className='text-sm mt-2'>Don't have an account? <Link to='/sign-up' className='font-semibold underline cursor-pointer'>Sign up</Link></p>
            </form>

            {/*<div className='w-full flex justify-center'>
                <button className='py-4 px-16 border rounded-[5rem]'>Sign up with Google</button>
            </div>*/}
            <div></div>
        </div>
        <div className='w-1/2 h-[calc(100vh-73px)] mx-6 flex items-center'>
            <img className='w-full h-[calc(100vh-90px)] object-cover rounded-3xl' src='https://cdn.openart.ai/uploads/image_random_EQzmLBWS_1664596083880_1024.webp' />
        </div>
    </div>
  )
}

export default ForgotPassword