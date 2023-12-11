import PropTypes from 'prop-types'
import Loader from './Loader'

const Card = ({ src, onClick, isLoading }) => {
  return (
    <div onClick={onClick} className='shadow-xl w-52 h-52 rounded-md my-4 mx-3 hover:scale-105 transition-all cursor-pointer'>
      {!isLoading ? 
        src ? <img src={src} className='w-full h-full object-cover rounded-md' /> : (
          <div className='w-full h-full rounded-md flex items-center justify-center border border-grey'>
            <p className='text-red'>Error</p>
          </div>
        )
      : (
        <div className='w-full h-full rounded-md flex items-center justify-center border border-grey'>
          <svg className='animate-spin' width="30px" height="30px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><path fillRule="evenodd" clipRule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>
        </div>
      )}      
    </div>
  )
}

Card.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

Card.defaultProps = {
  isLoading: false
}

export default Card