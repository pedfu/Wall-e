import PropTypes from 'prop-types'

const Button = ({ isLoading, disabled, children }) => {
    
  return (
    <button 
        className='py-4 px-16 mt-4 border rounded-[5rem]' 
        disabled={isLoading == true || disabled}
    >
        {isLoading == true ? 
            (
                <div className='w-full h-full flex items-center justify-center'>
                    <svg className='animate-spin' width="30px" height="30px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path fillRule="evenodd" clipRule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>
                </div>
            ) : 
            children}
    </button>
  )
}

Button.propTypes = {
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.element.isRequired
}

Button.defaultProps = {
    isLoading: null,
    disabled: false,
}

export default Button