import PropTypes from 'prop-types'

const Details = ({ details, closeDetails }) => {
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

                <div className='p-8'>
                    <img className='' src={details?.src} />
                </div>

                <div className='sm:w-[20%] w-full text-fontGrey sm:my-8 my-4 mr-6 h-auto min-w-[200px] flex items-center flex-col justify-center'>
                    <p className='text-center bg-grey rounded-md p-1'>{details?.prompt}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-screen h-screen opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
  )
}

Details.propTypes = {
  details: PropTypes.shape({
    prompt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }),
  closeDetails: PropTypes.func.isRequired
}

export default Details