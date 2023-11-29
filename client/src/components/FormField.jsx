import PropTypes from 'prop-types'
import { useMemo } from 'react'

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  error,
  message,
  className,
  icon,
  handleIconClick,
}) => {
  const renderMessageOrError = useMemo(() => {
    if (error) {
      return <p className={`absolute text-sm text-red ${message ? '' : null}`}>{error}</p>
    }
    if (message) {
      return <p className='absolute text-sm text-brown'>{message}</p>
    }
  }, [error, message])

  return (
    <div className={`${className} relative ${message ? 'mb-12' : null}`}>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black"
          >
            Surprise me
          </button>
        )}
        {icon && (
          <button
            type="button"
            name={name}
            onClick={handleIconClick}
            className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black"
          >
            {icon}
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
      {renderMessageOrError}
    </div>
  )
}

FormField.propTypes = {
  labelName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSurpriseMe: PropTypes.bool.isRequired,
  handleSurpriseMe: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  error: PropTypes.string,
  message: PropTypes.string,
  icon: PropTypes.element,
  handleIconClick: PropTypes.func,
}

FormField.defaultProps = {
  error: null,
  message: null,
}

export default FormField;