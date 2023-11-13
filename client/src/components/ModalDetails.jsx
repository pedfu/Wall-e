import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { loadingPostDetailsSelector, postDetailsSelector } from '../modules/post/selector'
import { usePrevious } from '../hooks/use-previous';
import { commentOnImage, getPostDetails } from '../modules/post/actions'

const ModalDetails = ({ details, closeDetails }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const postDetails = useSelector(postDetailsSelector)
  const isPostDetailsLoading = useSelector(loadingPostDetailsSelector)
  const wasPostDetailsLoading = usePrevious(isPostDetailsLoading)

  useEffect(() => {
    dispatch(getPostDetails(details._id))
  }, [details._id, dispatch])

  const handleComment = useCallback(() => {
    if (!comment) return

    // send new comment
    dispatch(commentOnImage(details?._id, { comment }))
    setComment('')
  }, [comment, details?._id, dispatch])

  const onChange = useCallback(event => {
    const { value } = event.target
    setComment(value)
  }, [])

  if (isPostDetailsLoading) {
    return 'loading'
  }

  if (!postDetails) {
    return 'nada'
  }

  // lg - 810px
  // height: 550px;
  // width: 770px;

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 w-[770px] h-[560px] pb-2 relative rounded-lg shadow-lg relative flex flex-col justify-start sm:flex-row w-full bg-darkGrey outline-none focus:outline-none">
            <div onClick={closeDetails} className='absolute top-1 right-3 text-fontGrey text-xl font-bold cursor-pointer'>
                x
            </div>

            <div className='px-4 w-[calc(100%-300px)] flex items-center'>
                <img className='' src={postDetails?.image} />
            </div>

            <div className='w-[300px] h-[560px] text-fontGrey flex items-start flex-col justify-between'>
              <div className='pr-2'>
                <p className='text-white mb-2 mt-8'>Prompt</p>
                <p className='text-center bg-grey rounded-md p-1'>{postDetails?.prompt}</p>

                <div className='w-full mt-3 text-white max-h-[350px] overflow-y-auto'>
                  <h4 className='mb-2'>Comments</h4>
                  <div>
                    {postDetails.comments?.map((c, index) => (
                      <div key={`${c.username}-${index}`} className='flex items-center my-2'>
                        <img className='w-8 h-8 rounded-full mr-1' src={c.src} />
                        <p className='font-medium text-sm mr-2 text-fontGrey'>{c.username}</p>
                        <p className='text-sm font-light'>{c.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='w-[300px] pr-4 mb-2 my-4 mr-3 justify-center mt-2 flex items-center'>
                <textarea onChange={onChange} value={comment} className='mt-1 p-2 rounded-md w-[calc(100%-30px)] text-sm text-white font-light bg-grey resize-none' rows={2} placeholder='Comment something...' />
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
      <div className="w-screen h-screen opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

ModalDetails.propTypes = {
  details: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      createdBy: PropTypes.shape({
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }),
      comment: PropTypes.string.isRequired,
    }),
  )}),
  closeDetails: PropTypes.func.isRequired
}

export default ModalDetails