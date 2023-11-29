import { useCallback, useEffect, useMemo, useState } from 'react'
import { FormField } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { confirmCode, forgotPassword, login, updatePassword } from '../modules/authentication/actions'
import { errorConfirmCodeSelector, errorForgotPasswordSelector, errorLoginSelector, errorUpdatePasswordSelector, isLoggedSelector, loadingConfirmCodeSelector, loadingForgotPasswordSelector, loadingLoginSelector, loadingUpdatePasswordSelector } from '../modules/authentication/selector'
import { usePrevious } from '../hooks/use-previous'
import Button from '../components/Button'

const PAGE_TYPE = {
    FIRST_STEP_EMAIL: 'first_step_email',
    SECOND_STEP_CONFIRM_CODE: 'second_step_confirm_code',
    THIRD_STEP_RESET_PASSWORD: 'third_step_reset_password',
    DONE: 'DONE',
}

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [state, setState] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        code: '',
        isPasswordVisible: false,
        isConfirmPasswordVisible: false,
    })
    const [errors, setErrors] = useState({})
    const [page, setPage] = useState(PAGE_TYPE.FIRST_STEP_EMAIL)

    const errorLogin = useSelector(errorLoginSelector)
    const errorForgotPassword = useSelector(errorForgotPasswordSelector)
    const errorConfirmCode = useSelector(errorConfirmCodeSelector)
    const errorUpdatePassword = useSelector(errorUpdatePasswordSelector)

    const isLoginLoading = useSelector(loadingLoginSelector)

    const isForgotPasswordLoading = useSelector(loadingForgotPasswordSelector)
    const wasForgotPasswordLoading = usePrevious(isForgotPasswordLoading)
    
    const isConfirmCodeLoading = useSelector(loadingConfirmCodeSelector)
    const wasConfirmCodeLoading = usePrevious(isConfirmCodeLoading)

    const isUpdatePasswordLoading = useSelector(loadingUpdatePasswordSelector)
    const wasUpdatePasswordLoading = usePrevious(isUpdatePasswordLoading)

    const isLogged = useSelector(isLoggedSelector)
    const wasLogged = usePrevious(isLogged)

    // first step
    useEffect(() => {
        if (!isForgotPasswordLoading && wasForgotPasswordLoading) {
            if (!errorForgotPassword) {
                setPage(PAGE_TYPE.SECOND_STEP_CONFIRM_CODE)
            }
        }
    }, [isForgotPasswordLoading, wasForgotPasswordLoading, errorForgotPassword])

    // second step
    useEffect(() => {
        if (!isConfirmCodeLoading && wasConfirmCodeLoading) {
            if (!errorConfirmCode) {
                setPage(PAGE_TYPE.THIRD_STEP_RESET_PASSWORD)
            }
        }
    }, [isConfirmCodeLoading, wasConfirmCodeLoading, errorConfirmCode])

    // third step
    useEffect(() => {
        if (!isUpdatePasswordLoading && wasUpdatePasswordLoading) {
            if (!errorUpdatePassword) {
                navigate('/login')
                // setPage(PAGE_TYPE.DONE)
            }
        }
    }, [isUpdatePasswordLoading, wasUpdatePasswordLoading, errorUpdatePassword, navigate])

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

    const onSubmitFirstStep = useCallback((event) => {
        event.preventDefault()
        if (!state.email) return
        dispatch(forgotPassword({ email: state.email }))
    }, [dispatch, state.email])

    const onSubmitSecondStep = useCallback((event) => {
        event.preventDefault()
        if (!state.email || !state.code) return
        dispatch(confirmCode({ email: state.email, code: state.code }))
    }, [dispatch, state.email, state.code])

    const onSubmitThirdStep = useCallback((event) => {
        event.preventDefault()
        if (!state.confirmPassword || !state.password || state.confirmPassword !== state.password) return
        dispatch(updatePassword({ newPassword: state.password, confirmationPassword: state.confirmPassword }))
    }, [dispatch, state.password, state.confirmPassword])

    const renderForm = useMemo(() => {
        if (page === PAGE_TYPE.FIRST_STEP_EMAIL) {
            return (
                <form className='flex flex-col justify-center' onSubmit={onSubmitFirstStep}>
                    <FormField
                        className="mb-7"
                        labelName="Email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        error={errors?.email}
                        value={state.email}
                        handleChange={onChange}
                    />
                    <Button isLoading={false}>Send code</Button>
                </form>
            )
        } else if (page === PAGE_TYPE.SECOND_STEP_CONFIRM_CODE) {
            return (
                <form className='flex flex-col justify-center' onSubmit={onSubmitSecondStep}>
                    <FormField
                        className="mb-7"
                        labelName="Code"
                        type="text"
                        name="code"
                        placeholder="Confirmation code"
                        error={errors?.code}
                        value={state.code}
                        handleChange={onChange}
                    />
                    <Button isLoading={false}>Confirm code</Button>
                </form>
            )
        } else if (page === PAGE_TYPE.THIRD_STEP_RESET_PASSWORD) {
            return (
                <form className='flex flex-col justify-center' onSubmit={onSubmitThirdStep}>
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
                    <Button isLoading={false}>Reset password</Button>
                </form>
            )
        } else {
            return <h5>Error</h5>
        }
    }, [page, errors, state, onSubmitFirstStep, onSubmitSecondStep, onSubmitThirdStep, onChange, handlePasswordVisibility])

  return (
    <div className='flex bg-bgWhite'>
        <div className='w-1/2 mx-6 flex flex-col justify-between py-20 px-16'>
            <h1 className='font-semibold text-4xl text-center'>Reset your password</h1>
            {renderForm}

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