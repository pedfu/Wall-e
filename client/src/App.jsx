import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, GenerateImage, SignUp, Login, HowToUse } from './pages'
import Header from './components/Header'
import './App.css'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { tooltipSelector } from './modules/tooltip/selector'

const App = () => {
  const [tooltip, setTooltip] = useState({
    show: false,
    message: '',
    type: 'success'
  })
  const tooltipData = useSelector(tooltipSelector)

  useEffect(() => {
    if (tooltip.show) {
      setTimeout(() => {
        setTooltip(prev => ({ ...prev, show: !prev.show}))
      }, 5000)
    }
  }, [tooltip.show])

  useEffect(() => {
    if (tooltipData.show) {
      setTooltip(prev => ({ ...prev, ...tooltipData }))
    }
  }, [tooltipData])

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

      <div id='tooltip' className={`absolute top-7 w-full flex justify-center ${tooltip.show ? 'show' : ''}`}>
        <p className={`${tooltip.type} py-3 px-8 rounded-md max-w-sm text-sm`}>{tooltip.message}</p>
      </div>
    </BrowserRouter>
  )
}

export default App