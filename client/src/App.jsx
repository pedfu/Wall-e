import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, GenerateImage, SignUp, Login, HowToUse } from './pages'
import Header from './components/Header'

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <main className='w-full max-w-8xl bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/generate-image' element={<GenerateImage />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/how-to-use' element={<HowToUse />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App