import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Home, GenerateImage, SignUp, Login, HowToUse } from './pages'

const App = () => {
  return (
    <BrowserRouter>
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
        <Link to='/sign-up' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
          Sign up
        </Link>
      </header>

      <main className='w-full max-w-8xl bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/generate-image' element={<GenerateImage />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/how-to-use' element={<HowToUse />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App