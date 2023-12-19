import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, ModalDetails } from '.'
import ModalPost from './ModalPost'
import { useDispatch, useSelector } from 'react-redux'
import { errorUserImagesSelector, loadingUserImagesSelector, newImageSelector, userImagesSelector } from '../modules/post/selector'
import { isLoggedSelector } from '../modules/authentication/selector'
import { GET_USER_IMAGES, getUserImages, publicImage } from '../modules/post/actions'
import Pagination from './pagination'
import useListPagination from '../hooks/use-list-pagination'

const INITIAL_STATE = {
  pageSize: 20,
  currentPage: 1,
  params: {}
}

const ImageFromText = ({ generateImage }) => {
  const dispatch = useDispatch()
  const userPosts = useSelector(userImagesSelector)
  const error = useSelector(errorUserImagesSelector)
  const isLoggedIn = useSelector(isLoggedSelector)

  const [state, setState] = useState(INITIAL_STATE)
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [text, setText] = useState('')
  const [modalPost, setModalPost] = useState(false)

  const newImage = useSelector(newImageSelector)
  const loadingNewImage = useSelector(loadingUserImagesSelector) // MIGHT BE WRONG

  const { currentPage, loading, nextPage, previousPage, refresh, resetCurrentPage, setCurrentPage } = useListPagination(getUserImages, GET_USER_IMAGES, state.params)

  useEffect(() => {
    // refresh()
  }, [])

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

  const onChangePage = useCallback((event) => {
    const { name, value } = event.target
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  })

  console.log(userPosts.images)

  return (
    <>
      {modalPost && <ModalPost onSubmit={onCreatePost} onClose={() => onCloseModalPost()} prompt={`${text}`} image={newImage?.image} isLoading={loadingNewImage} />}
      {selectedPostId !== null && (
        <ModalDetails closeDetails={closeDetails} imageId={selectedPostId} />
      )}
      <div className='w-full mb-2'>
        <textarea placeholder='A realistic photograph of a young guy with red hair in space' className='w-[calc(100%-48px)] h-24 mx-4 mt-3 focus:outline-none text-white p-2 bg-grey rounded-md resize-none' rows={4} value={text} onChange={onChange} />
        <div className='w-[calc(100%-32px)] mt-2 flex justify-end'>
          <button onClick={onGenerateClick} disabled={!text || !isLoggedIn} className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md disabled:opacity-50'>Generate</button>
        </div>
      </div>
      

      <Pagination
        totalQnt={userPosts.totalCount}
        listSize={userPosts.images?.length}
        pageSize={state.pageSize}
        onChangePageSize={onChangePage}
        nextPage={nextPage}
        previousPage={previousPage}
        currentPage={currentPage}
        isLoading={loading}
      >
        <div className='flex justify-center w-full flex-wrap'>
          {userPosts.images.map((item, index) => (
            <Card key={item.image} src={item.image} onClick={() => openDetails(item._id)} isLoading={!item.image && Math.abs(new Date() - new Date(item.createdAt)) < 600000} />
          ))}
        </div>
      </Pagination>
    </>
  )
}

ImageFromText.propTypes = {
  generateImage: PropTypes.func.isRequired
}

export default ImageFromText


