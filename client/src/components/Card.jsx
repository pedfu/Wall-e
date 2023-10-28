import PropTypes from 'prop-types'

const Card = ({ src, onClick }) => {
  return (
    <div onClick={onClick} className='shadow-xl w-52 h-52 rounded-md my-4 mx-3 hover:scale-105 transition-all cursor-pointer'>
      <img src={src} className='w-full h-full object-cover rounded-md' />
    </div>
  )
}

Card.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Card