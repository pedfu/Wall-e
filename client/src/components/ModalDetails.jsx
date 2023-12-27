import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { loadingImageDetailsSelector, imageDetailsSelector } from '../modules/post/selector'
import { commentOnImage, getImageDetails, likeImage } from '../modules/post/actions'
import { isLoggedSelector, userSelector } from '../modules/authentication/selector';

const ModalDetails = ({ imageId, closeDetails }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const user = useSelector(userSelector)
  const imageDetails = useSelector(imageDetailsSelector)
  const isImageDetailsLoading = useSelector(loadingImageDetailsSelector)
  const isLoggedIn = useSelector(isLoggedSelector)

  useEffect(() => {
    dispatch(getImageDetails(imageId))
  }, [imageId, dispatch])

  const handleComment = useCallback(() => {
    if (!comment || !isLoggedIn) return

    // send new comment
    dispatch(commentOnImage(imageId, { comment }))
    setComment('')
  }, [comment, isLoggedIn, imageId, dispatch])

  const handleLike = useCallback(() => {
    dispatch(likeImage(imageId, {}))
  }, [imageId, dispatch])

  const onChange = useCallback(event => {
    const { value } = event.target
    setComment(value)
  }, [])

  const renderLike = useMemo(() => {
    if (!user || !isLoggedIn) return
    if (imageDetails.likes?.some(x => x.userId === user._id.toString())) {
      return (
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#FF0000"/>
        </svg>
      )
    }

    return (
      <svg className='not-liked' width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className='hover:fill-red' fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }, [imageDetails, user])

  if (isImageDetailsLoading) {
    return 'loading'
  }

  if (!imageDetails) {
    return 'nada'
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 w-[770px] h-[560px] pb-2 relative rounded-lg shadow-lg flex flex-col justify-start sm:flex-row w-full bg-darkGrey outline-none focus:outline-none">
            <div onClick={closeDetails} className='absolute top-1 right-3 text-fontGrey text-xl font-bold cursor-pointer'>
                x
            </div>

            <div className='px-4 w-[calc(100%-300px)] flex items-center'>
              {imageDetails?.image ? (
                <img className='min-w-[400px]' src={imageDetails?.image} />
              ) : (
                <div className='w-full h-full min-h-[400px] min-w-[400px] flex items-center justify-center'>
                  <svg className='animate-spin' width="30px" height="30px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><path fillRule="evenodd" clipRule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>
                </div>
              )}
            </div>

            <div className='w-[300px] h-[560px] text-fontGrey flex items-start flex-col justify-between'>
              <div className='pr-2 max-h-[calc(560px-110px)]'>
                <p className='text-white mb-2 mt-8'>Prompt</p>
                <p className='text-center bg-grey rounded-md p-1'>{imageDetails?.prompt}</p>

                <div className='w-full mt-3 text-white max-h-[calc(560px-235px)] overflow-y-auto'>
                  <h4 className='mb-2'>Comments</h4>
                  <div>
                    {imageDetails.comments?.map((c, index) => (
                      <div key={`${c.createdBy.username}-${index}`} className='flex items-center my-2'>
                        <p className='font-medium text-sm mr-2 text-fontGrey'>{c.createdBy.username}</p>
                        <p className='text-sm font-light'>{c.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='w-[300px] pr-4 mb-2 my-4 mr-3 justify-center mt-2 flex flex-col items-start'>
                <div className='cursor-pointer' onClick={handleLike}>
                  {renderLike}
                </div>
                <div className='flex w-full items-center justify-center'>
                  <textarea disabled={!isLoggedIn} onChange={onChange} value={comment} className='mt-1 p-2 rounded-md w-[calc(100%-30px)] text-sm text-white font-light bg-grey resize-none' rows={2} placeholder='Comment something...' />
                  <div className='ml-2 cursor-pointer' onClick={handleComment}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#767675" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen h-screen opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

ModalDetails.propTypes = {
  imageId: PropTypes.string.isRequired,
  closeDetails: PropTypes.func.isRequired
}

export default ModalDetails