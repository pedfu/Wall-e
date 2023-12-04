import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, GenerateImage, SignUp, Login, HowToUse, ForgotPassword } from './pages'
import Header from './components/Header'
import './App.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tooltipSelector } from './modules/tooltip/selector'
import { modalSelector } from './modules/modal/selector'
import { closeModal as closeModalAction } from './modules/modal/actions'

const App = () => {
  const dispatch = useDispatch()
  const [tooltip, setTooltip] = useState({
    show: false,
    message: '',
    type: 'success'
  })
  const tooltipData = useSelector(tooltipSelector)
  const modalData = useSelector(modalSelector)

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

  const closeModal = useCallback(() => {
    dispatch(closeModalAction())
  }, [dispatch, closeModalAction])

  const onConfirmModal = useCallback(() => {
    modalData?.onConfirm()
    closeModal()
  }, [modalData?.onConfirm])

  return (
    <BrowserRouter>
      <Header />

      <main className='w-full max-w-8xl bg-darkGrey min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/generate-image' element={<GenerateImage />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/how-to-use' element={<HowToUse />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </main>

      {modalData?.show && (
        <div id='modal' className={`absolute top-0 left-0 w-[calc(100vw-10px)] h-screen flex items-center justify-center`}>
          <div id='modal-background' className='absolute top-0 left-0 w-full h-full bg-darkGrey opacity-75 z-0'></div>
          <div id='modal-content' className='w-[450px] h-[190px] flex flex-col justify-between bg-grey rounded-md text-white z-10'>
            <div className='m-6'>
              <h3 className='text-start text-xl font-bold'>{modalData?.title}</h3>
              <p className='mt-3 text-start text-sm'>{modalData?.description}</p>
            </div>
            <div className='flex w-full justify-end pb-6 pr-6'>
              <button className='mr-6' onClick={closeModal}>Cancel</button>
              <button className='bg-[#6469ff] px-4 py-2 rounded-md' onClick={onConfirmModal}>Confirm</button>
            </div>  
          </div>      
        </div>
      )}

      <div id='tooltip' className={`absolute top-7 w-full flex justify-center ${tooltip.show ? 'show' : ''}`}>
        <p className={`${tooltip.type} py-3 px-8 rounded-md max-w-sm text-sm`}>{tooltip.message}</p>
      </div>
    </BrowserRouter>
  )
}

export default App