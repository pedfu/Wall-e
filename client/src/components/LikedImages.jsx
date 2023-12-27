import { useCallback, useEffect, useState } from 'react'
import { Card, ModalDetails } from '.'
import { useDispatch, useSelector } from 'react-redux'
import { errorLikedImagesSelector, likedImagesSelector } from '../modules/post/selector'
import { GET_LIKED_IMAGES, getLikedImages } from '../modules/post/actions'
import { isLoggedSelector } from '../modules/authentication/selector'
import Pagination from './pagination'
import useListPagination from '../hooks/use-list-pagination'

const INITIAL_STATE = {
  pageSize: 20,
  params: {}
}

const LikedImages = () => {
  const likedImages = useSelector(likedImagesSelector)
  const error = useSelector(errorLikedImagesSelector)
  const isLoggedIn = useSelector(isLoggedSelector)

  const [selectedId, setSelectedId] = useState(null)
  const [state, setState] = useState(INITIAL_STATE)

  const { currentPage, loading, nextPage, previousPage, refresh, resetCurrentPage, setCurrentPage } = useListPagination(getLikedImages, GET_LIKED_IMAGES, state.params) 
 
  const openDetails = useCallback((index) => {
    const image = likedImages?.images[index]
    setSelectedId(image._id)
  }, [likedImages])

  const closeDetails = useCallback(() => {
    setSelectedId(null)
  }, [])

  const onChangePage = useCallback(event => {
    const { name, value } = e.target
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }, [])

  return (
    <>
      <div className='flex flex-wrap overflow-y-auto max-h-[calc(100vh-250px)] items-start justify-center sm:justify-start w-full'>
        {!error ? (
          <Pagination
            totalQnt={likedImages.totalCount}
            listSize={likedImages.images?.length}
            pageSize={state.pageSize}
            onChangePageSize={onChangePage}
            nextPage={nextPage}
            previousPage={previousPage}
            currentPage={currentPage}
            isLoading={loading}
            className={'max-h-[calc(100vh-5.75rem)]'}
          >
            <div className='flex justify-center w-full flex-wrap'>
              {likedImages?.images?.map((item, index) => (
                <Card key={item.image} src={item.image} onClick={() => openDetails(index)} />
              ))}
            </div>
          </Pagination>
        ) : (
          <div className='flex w-full justify-center text-white mt-5'>
            {isLoggedIn ? 'An unexpected error happened' : 'You are not logged in'}
          </div>
        )}
      </div>
      {selectedId !== null && (
        <ModalDetails closeDetails={closeDetails} imageId={selectedId} />
      )}
    </>
  )
}

export default LikedImages