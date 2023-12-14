import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'
import Button from './Button'
import { useSelector } from 'react-redux'
import { loadingImageDetailsSelector, newImageSelector } from '../modules/post/selector'
import { usePrevious } from '../hooks/use-previous'

const ModalPost = ({ onSubmit, onClose, prompt, isLoading }) => {
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const newImage = useSelector(newImageSelector)
    const isGeneratingLoading = useSelector(loadingImageDetailsSelector) // POSSIBLI WRONG LOADING SELECTOR -> ADD IMAGE + CHECK STATUS MIGHT BE THE CORRECT ONE
    const wasGeneratingLoading = usePrevious(isGeneratingLoading)

    const onTextChange = useCallback(event => {
        const { value } = event.target
        setText(value)
    }, [])

    useEffect(() => {
        if (!isGeneratingLoading && wasGeneratingLoading) {
            if (!error) {
                setImage(newImage.image)
            } else {
                setImage(null)
            }
        }
    }, [isGeneratingLoading, wasGeneratingLoading, newImage])

  return (
    <Modal onClose={() => onClose()} className='bg-darkGrey rounded-xl min-w-[600px] max-w-[1000px] text-white'>
        <div onClick={onClose} className='absolute top-1 right-3 text-fontGrey text-xl font-bold cursor-pointer'>
            x
        </div>
        {isLoading || isGeneratingLoading ? (
            <div className='w-full h-full min-h-[400px] flex items-center justify-center'>
                <svg className='animate-spin' width="30px" height="30px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><path fillRule="evenodd" clipRule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>
            </div>
        ) : (
            <>
                <h1 className='text-lg m-2'>Create post</h1>
                <div className='mt-1 min-h-[400px] flex justify-between'>
                    {isGeneratingLoading ? (
                        <div className='w-[50%] m-2 flex items-center justify-center'>
                            <svg className='animate-spin' width="30px" height="30px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><path fillRule="evenodd" clipRule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>
                        </div>
                    ) : (
                        <img src={image} className='w-[50%] m-2' />
                    )}
                    <div className='w-[50%] m-2'>
                        <label>
                            <p className='w-[calc(100%-8px)] font-light'>Prompt</p>
                            <input className='w-[calc(100%-8px)] text-fontGrey bg-grey rounded-md p-1 text-sm font-light mt-1 mb-4' disabled value={prompt} />
                        </label>

                        <textarea className='mt-1 rounded-md w-[calc(100%-8px)] text-sm font-light bg-grey p-1 resize-none' rows={8} onChange={onTextChange} value={text} placeholder='Share something with others' />

                        <p className='font-light text-sm mt-4 w-[calc(100%-8px)] text-center'>The comments wills be shown here</p>

                        <div className='flex justify-end w-[calc(100%-8px)] items-end'>
                            <Button onClick={() => onSubmit(text)}>Post</Button>                    
                        </div>
                    </div>
                </div>
            </>
            )}
    </Modal>
  )
}

ModalPost.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    prompt: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
}

ModalPost.defaultProps = {
    isLoading: false
}

export default ModalPost