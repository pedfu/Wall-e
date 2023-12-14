import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, ModalDetails } from '.'
import ModalPost from './ModalPost'
import { useDispatch, useSelector } from 'react-redux'
import { errorUserImagesSelector, loadingUserImagesSelector, newImageSelector, userImagesSelector } from '../modules/post/selector'
import { isLoggedSelector } from '../modules/authentication/selector'
import { publicImage } from '../modules/post/actions'

const ImageFromText = ({ generateImage }) => {
  const dispatch = useDispatch()
  const userPosts = useSelector(userImagesSelector)
  const error = useSelector(errorUserImagesSelector)
  const isLoggedIn = useSelector(isLoggedSelector)

  const [selectedPostId, setSelectedPostId] = useState(null)
  const [text, setText] = useState('')
  const [modalPost, setModalPost] = useState(false)

  const newImage = useSelector(newImageSelector)
  const loadingNewImage = useSelector(loadingUserImagesSelector) // MIGHT BE WRONG

  const openDetails = useCallback((postId) => {
    setSelectedPostId(postId)
  }, [])
  const closeDetails = useCallback(() => {
    setSelectedPostId(null)
  }, [])

  const onChange = useCallback((e) => {
    const { value } = e.target
    setText(value)
  }, [])

  const onGenerateClick = useCallback(() => {
    generateImage(text)
    // setModalPost(true)
  }, [generateImage, text])

  const onCreatePost = useCallback(text => {
    dispatch(publicImage(newImage._id, { description: text, isPublic: true }))
    setModalPost(false)
  }, [])

  const onCloseModalPost = useCallback(() => {
    setModalPost(false)
  }, [])

  return (
    <>
      {modalPost && <ModalPost onSubmit={onCreatePost} onClose={() => onCloseModalPost()} prompt={`${text}`} image={newImage?.image} isLoading={loadingNewImage} />}
      {selectedPostId !== null && (
        <ModalDetails closeDetails={closeDetails} details={userPosts.images.find(p => p._id === selectedPostId)} />
      )}
      <div className='w-full mb-2'>
          <textarea placeholder='A realistic photograph of a young guy with red hair in space' className='w-[calc(100%-48px)] h-24 mx-4 mt-3 focus:outline-none text-white p-2 bg-grey rounded-md resize-none' rows={4} value={text} onChange={onChange} />
          <div className='w-[calc(100%-32px)] mt-2 flex justify-end'>
            <button onClick={onGenerateClick} disabled={!text || !isLoggedIn} className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md disabled:opacity-50'>Generate</button>
          </div>
        </div>

        <div className='flex flex-wrap overflow-y-auto max-h-[calc(100vh-250px)] items-start justify-center sm:justify-start w-full'>
          {!error ? [...userPosts.images].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item, index) => (
            <Card key={item.image} src={item.image} onClick={() => openDetails(item._id)} isLoading={!item.image && Math.abs(new Date() - new Date(item.createdAt)) < 600000} />
          )) : (
            <div className='flex w-full justify-center text-white mt-5'>
              {isLoggedIn ? 'An unexpected error happened' : 'You are not logged in'}
            </div>
          )}
      </div>
    </>
  )
}

ImageFromText.propTypes = {
  generateImage: PropTypes.func.isRequired
}

export default ImageFromText