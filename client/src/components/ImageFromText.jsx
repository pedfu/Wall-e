import { memo, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, ModalDetails } from '.'
import { images } from '../constants'
import ModalPost from './ModalPost'

const ImageFromText = ({ generateImage }) => {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [text, setText] = useState('')
  const [modalPost, setModalPost] = useState(false)

  const openDetails = useCallback((index) => {
    setSelectedIndex(index)
  }, [])
  const closeDetails = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  const onChange = useCallback((e) => {
    const { value } = e.target
    setText(value)
  }, [])

  const onGenerateClick = useCallback(() => {
    generateImage(text)
    setModalPost(true)
  }, [generateImage, text])

  const onCreatePost = useCallback(text => {
    const data = {
      prompt: `${text}`,
      image: 'generated-image',
      text: text
    }
    // send data
    // close modal

    setModalPost(false)
  }, [])

  const onCloseModalPost = useCallback(() => {
    console.log('clicado')
    setModalPost(false)
  }, [])

  return (
    <>
      {modalPost && <ModalPost onClose={() => onCloseModalPost()} prompt={`${text}`} image='https://cdn.openart.ai/published/shfjBm5qNSUIwGFbjPZ2/2CkoED7Q_WizW_raw.jpg' />}
      {selectedIndex !== null && (
        <ModalDetails closeDetails={closeDetails} details={images[selectedIndex]} />
      )}
      <div className='w-full mb-2'>
          <textarea placeholder='A realistic photograph of a young guy with red hair in space' className='w-[calc(100%-48px)] h-24 mx-4 mt-3 focus:outline-none text-white p-2 bg-grey rounded-md resize-none' rows={4} value={text} onChange={onChange} />
          <div className='w-[calc(100%-32px)] mt-2 flex justify-end'>
            <button onClick={onGenerateClick} disabled={!text} className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md disabled:opacity-50'>Generate</button>
          </div>
        </div>

        <div className='flex flex-wrap overflow-y-auto max-h-[calc(100vh-250px)] items-start justify-center sm:justify-start w-full'>
          {images.map((item, index) => (
            <Card key={item.src} src={item.src} onClick={() => openDetails(index)} />
          ))}
      </div>
    </>
  )
}

ImageFromText.propTypes = {
  generateImage: PropTypes.func.isRequired
}

export default memo(ImageFromText)