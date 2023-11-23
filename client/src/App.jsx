import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, GenerateImage, SignUp, Login, HowToUse } from './pages'
import Header from './components/Header'
import { useEffect, useState } from 'react'

const App = () => {
  const [showTooltip, setShowTooltip] = useState(false)
  const showTooltipSelector = true // add selector to this

  useEffect(() => {
    if (showTooltip) {
      setTimeout(() => {
        setShowTooltip(false)
      }, 5000)
    }
  }, [showTooltip])

  useEffect(() => {
    if (showTooltipSelector !== null) {
      setShowTooltip(showTooltipSelector)
    }
  }, [showTooltipSelector])

  return (
    <BrowserRouter>
      <Header />

      <main className='w-full max-w-8xl bg-darkGrey min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/generate-image' element={<GenerateImage />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/how-to-use' element={<HowToUse />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </main>

      {showTooltip && (
        <div></div>
      )}
    </BrowserRouter>
  )
}

export default App