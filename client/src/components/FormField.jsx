import PropTypes from 'prop-types'

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
  className,
}) => (
  <div className={`${className} relative`}>
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
    {error && <p className='absolute text-sm text-red'>{error}</p>}
  </div>
);

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
}

FormField.defaultProps = {
  error: null
}

export default FormField;