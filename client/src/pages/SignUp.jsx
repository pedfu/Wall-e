import React, { useCallback, useState } from 'react'
import { FormField } from '../components'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChange = useCallback(event => {
        const { name, value } = event.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }, [])

  return (
    <div className='flex'>
        <div className='w-1/2 mx-6 flex flex-col justify-between py-20 px-16'>
            <h1 className='font-semibold text-4xl text-center'>Create account</h1>
            <form className='flex flex-col justify-center'>
                <FormField
                    className="mb-4"
                    labelName="Name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={state.name}
                    handleChange={onChange}
                />
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
                    className="mb-4"
                    labelName="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
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