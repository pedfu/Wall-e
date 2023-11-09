import PropTypes from 'prop-types'
import { useCallback } from 'react'

const Modal = ({ className, onClose, children }) => {
  const onClickContent = useCallback(event => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  return (
    <>
      <div
        onClick={() => onClose()}
        className="bg-[rgba(0,0,0,.25)] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
      >
        <div onClick={onClickContent} className={`absolute z-50 ${className}`}>
            {children}
        </div>
      </div>
    </>
  )
}

Modal.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}

Modal.defaultProps = {
    className: "w-auto my-6 mx-auto max-w-3xl",
}

export default Modal