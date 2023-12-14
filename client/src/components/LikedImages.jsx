import { useCallback, useEffect, useState } from 'react'
import { Card, ModalDetails } from '.'
import { useDispatch, useSelector } from 'react-redux'
import { errorLikedImagesSelector, likedImagesSelector } from '../modules/post/selector'
import { getLikedImages } from '../modules/post/actions'
import { isLoggedSelector } from '../modules/authentication/selector'

const LikedImages = () => {
  const dispatch = useDispatch()
  const likedImages = useSelector(likedImagesSelector)
  const error = useSelector(errorLikedImagesSelector)
  const isLoggedIn = useSelector(isLoggedSelector)
  const [selectedId, setSelectedId] = useState(null)

  const openDetails = useCallback((index) => {
    const image = likedImages?.images[index]
    setSelectedId(image._id)
  }, [likedImages])
  const closeDetails = useCallback(() => {
    setSelectedId(null)
  }, [])

  useEffect(() => {
    dispatch(getLikedImages())
  }, [dispatch])

  return (
    <>
      {selectedId !== null && (
        <ModalDetails closeDetails={closeDetails} imageId={selectedId} />
      )}
      <div className='flex flex-wrap overflow-y-auto max-h-[calc(100vh-250px)] items-start justify-center sm:justify-start w-full'>
        {!error ? likedImages?.images?.map((item, index) => (
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