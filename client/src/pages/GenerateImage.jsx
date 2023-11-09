import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types';
import { LeftBar, ImageFromText } from '../components'
import { ComingSoon } from './index';
import { images } from '../constants';
import { generateImage as generateImageAction } from '../modules/post/actions' 
import { useDispatch, useSelector } from 'react-redux';
import { errorGeneratePostSelector, loadingGeneratePostSelector, newPostSelector } from '../modules/post/selector';

const Image = ({ src }) => {
    return (
        <img className='w-7' src={src} />
    )
}

Image.propTypes = {
    src: PropTypes.string.isRequired
}

const GenerateImage = () => {
  const dispatch = useDispatch()
  const loadingGeneratePost = useSelector(loadingGeneratePostSelector)
  const errorGeneratePost = useSelector(errorGeneratePostSelector)
  const newPost = useSelector(newPostSelector)

  const [selectedTab, setSelectedTab] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const options = [
    {
        text: 'Generate Image From Text',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
      </svg>
      
    },
    {
        text: 'Coming Soon',
        icon: <svg className='w-6 h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z" fill="#EAEAEA"/>
        <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#EAEAEA"/>
        <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" fill="#EAEAEA"/>
        </svg>
    },
  ]

  const onTabSelect = useCallback((value) => {
    setSelectedTab(Number(value))
  }, [])

  const generateImage = useCallback(async (prompt) => {
    if (!prompt) return

    const body = {
      prompt: prompt
    }
    dispatch(generateImageAction(body))

    // const result = await fetch('https://localhost:8080/api/v1/post', {
    //   method: 'POST',
    //   body: {
    //     prompt: prompt
    //   }
    // })

    // images.push({
    //   prompt: prompt,
    //   src: result?.photo
    // })
  }, [])

  const selectedPage = useMemo(() => {
    if (selectedTab === 0) {
      return <ImageFromText generateImage={generateImage} />
    } else {
      return <ComingSoon />
    }
  }, [generateImage, selectedTab])

  return (
    <div className='flex overflow-y-hidden bg-darkGrey relative w-screen h-[calc(100vh-73px)]'>
        <LeftBar 
          options={options}
          selectedTab={selectedTab}
          onTabSelect={onTabSelect} 
          expanded={expanded}
          setExpanded={setExpanded}
        />

        <div className={`flex flex-wrap h-0 items-start justify-center sm:justify-start sm:w-[calc(100vw-300px)] w-[calc(100vw-56px)] ${expanded ? 'ml-[63px] sm:ml-0' : ''}`}>
          {selectedPage}
        </div>
    </div>
  )
}

export default GenerateImage