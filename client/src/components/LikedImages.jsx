import { useCallback, useEffect, useState } from 'react'
import { Card, ModalDetails } from '.'
import { useDispatch, useSelector } from 'react-redux'
import { errorLikedPostsSelector, likedPostsSelector, newPostSelector } from '../modules/post/selector'
import { getLikedPosts } from '../modules/post/actions'
import { isLoggedSelector } from '../modules/authentication/selector'

const LikedImages = () => {
  const dispatch = useDispatch()
  const likedPosts = useSelector(likedPostsSelector)
  const error = useSelector(errorLikedPostsSelector)
  const isLoggedIn = useSelector(isLoggedSelector)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const openDetails = useCallback((index) => {
    setSelectedIndex(index)
  }, [])
  const closeDetails = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  useEffect(() => {
    dispatch(getLikedPosts())
  }, [dispatch])

  return (
    <>
      {selectedIndex !== null && (
        <ModalDetails closeDetails={closeDetails} details={likedPosts[selectedIndex]} />
      )}
      <div className='flex flex-wrap overflow-y-auto max-h-[calc(100vh-250px)] items-start justify-center sm:justify-start w-full'>
        {!error ? likedPosts?.map((item, index) => (
          <Card key={item.image} src={item.image} onClick={() => openDetails(index)} />
        )) : (
          <div className='flex w-full justify-center text-white mt-5'>
            {isLoggedIn ? 'An unexpected error happened' : 'You are not logged in'}
          </div>
        )}
      </div>
    </>
  )
}

export default LikedImages