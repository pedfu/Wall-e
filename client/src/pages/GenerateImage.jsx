import { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types';
import { LeftBar, ImageFromText } from '../components'
import { ComingSoon } from './index';
import { generateNewImage, getUserImages } from '../modules/post/actions' 
import { useDispatch, useSelector } from 'react-redux';
import { errorGenerateImageSelector, loadingGenerateImageSelector, newImageSelector, userImagesSelector } from '../modules/post/selector';
import { usePrevious } from '../hooks/use-previous';
import LikedImages from '../components/LikedImages';
import * as postServices from '../services/post'
import CommunityImages from '../components/CommunityImages';

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
  const isLoadingGeneratePost = useSelector(loadingGenerateImageSelector)
  const wasLoadingGeneratePost = usePrevious(isLoadingGeneratePost)
  const errorGeneratePost = useSelector(errorGenerateImageSelector)
  const newPost = useSelector(newImageSelector)
  const userPosts = useSelector(userImagesSelector)

  const [selectedTab, setSelectedTab] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const checkStatus = useCallback(async id => {
    const response = await postServices.checkNewImageStatus(id)
    if (response?.data?.status === "processing") {
      setTimeout(() => {
        checkStatus(id)
      }, 5000);
    } else {
      dispatch(getUserImages())
    }
  }, [])

  useEffect(() => {
    if (!isLoadingGeneratePost && wasLoadingGeneratePost) {
      if (!errorGeneratePost && newPost) {
        checkStatus(newPost?._id)
      }
    }
  }, [errorGeneratePost, checkStatus, isLoadingGeneratePost, newPost, wasLoadingGeneratePost])

  const options = [
    {
        text: 'Generate Image From Text',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
      </svg>
      
    },
    {
        text: 'Community images',
        icon: <svg className='w-6 h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.75 12C2.75 9.10051 5.10051 6.75 8 6.75C8.41421 6.75 8.75 6.41421 8.75 6C8.75 5.58579 8.41421 5.25 8 5.25C4.27208 5.25 1.25 8.27208 1.25 12C1.25 15.7279 4.27208 18.75 8 18.75C11.7279 18.75 14.75 15.7279 14.75 12C14.75 11.5858 14.4142 11.25 14 11.25C13.5858 11.25 13.25 11.5858 13.25 12C13.25 14.8995 10.8995 17.25 8 17.25C5.10051 17.25 2.75 14.8995 2.75 12Z" fill="#EAEAEA"/>
        <path d="M21.25 12C21.25 14.8995 18.8995 17.25 16 17.25C15.5858 17.25 15.25 17.5858 15.25 18C15.25 18.4142 15.5858 18.75 16 18.75C19.7279 18.75 22.75 15.7279 22.75 12C22.75 8.27208 19.7279 5.25 16 5.25C12.2721 5.25 9.25 8.27208 9.25 12C9.25 12.4142 9.58579 12.75 10 12.75C10.4142 12.75 10.75 12.4142 10.75 12C10.75 9.1005 13.1005 6.75 16 6.75C18.8995 6.75 21.25 9.1005 21.25 12Z" fill="#EAEAEA"/>
        </svg>
    },
    {
        text: 'Liked images',
        icon: <svg className='w-6 h-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title/><g id="Complete"><g id="thumbs-up">
        <path d="M7.3,11.4,10.1,3a.6.6,0,0,1,.8-.3l1,.5a2.6,2.6,0,0,1,1.4,2.3V9.4h6.4a2,2,0,0,1,1.9,2.5l-2,8a2,2,0,0,1-1.9,1.5H4.3a2,2,0,0,1-2-2v-6a2,2,0,0,1,2-2h3v10" fill="none" stroke="#EAEAEA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        </g></g></svg>
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
    dispatch(generateNewImage(body))
  }, [dispatch, generateNewImage])

  const selectedPage = useMemo(() => {
    if (selectedTab === 0) {
      return <ImageFromText generateImage={generateImage} />
    } else if (selectedTab === 1) {
      return <CommunityImages />
    } else if (selectedTab === 2) {
      return <LikedImages />
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