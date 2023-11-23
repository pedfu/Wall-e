import { useCallback, useEffect, useState } from 'react'
import { Card, ModalDetails } from '.'
import { useDispatch, useSelector } from 'react-redux'
import { likedPostsSelector, newPostSelector } from '../modules/post/selector'
import { getLikedPosts } from '../modules/post/actions'

const LikedImages = () => {
  const dispatch = useDispatch()
  const likedPosts = useSelector(likedPostsSelector)
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
        {likedPosts?.map((item, index) => (
          <Card key={item.image} src={item.image} onClick={() => openDetails(index)} />
        ))}
      </div>
    </>
  )
}

export default LikedImages