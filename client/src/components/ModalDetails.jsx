import PropTypes from 'prop-types'
import { mockComments } from '../constants'
import { useCallback, useState } from 'react'

const ModalDetails = ({ details, closeDetails }) => {
  const [comment, setComment] = useState('')

  const handleComment = useCallback(() => {
    // send new comment
  }, [])

  const onChange = useCallback(event => {
    const { value } = event.target
    setComment(value)
  }, [])

  return (
    <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative sm:w-[800px] w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col justify-start sm:flex-row w-full bg-darkGrey outline-none focus:outline-none">
                <div onClick={closeDetails} className='absolute top-1 right-3 text-fontGrey text-xl font-bold cursor-pointer'>
                    x
                </div>

                <div className='px-4 flex items-center'>
                    <img className='' src={details?.src} />
                </div>

                <div className='sm:w-[50%] w-full text-fontGrey sm:my-8 my-4 mr-6 h-full min-w-[200px] flex items-start flex-col justify-center'>
                    <p className='text-white mb-2'>Prompt</p>
                    <p className='text-center bg-grey rounded-md p-1'>{details?.prompt}</p>

                    <div className='w-full mt-3 text-white max-h-[350px] overflow-y-auto'>
                      <h4 className='mb-2'>Comments</h4>
                      <div>
                        {mockComments.map((c, index) => (
                          <div key={`${c.username}-${index}`} className='flex items-center my-2'>
                            <img className='w-8 h-8 rounded-full mr-1' src={c.src} />
                            <p className='font-medium text-sm mr-2 text-fontGrey'>{c.username}</p>
                            <p className='text-sm font-light'>{c.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='w-full mt-2 flex items-center'>
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
    prompt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }),
  closeDetails: PropTypes.func.isRequired
}

export default ModalDetails