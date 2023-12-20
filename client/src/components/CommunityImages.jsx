import { useCallback, useEffect, useState } from 'react'
import { Card, Loader, ModalDetails } from '.'
import { useDispatch, useSelector } from 'react-redux'
import { allImagesSelector, errorAllImageSelector, loadingAllImageSelector } from '../modules/post/selector'
import { isLoggedSelector } from '../modules/authentication/selector'
import { GET_ALL_IMAGES, getAllImages } from '../modules/post/actions'
import { usePrevious } from '../hooks/use-previous'
import InfiniteScroll from 'react-infinite-scroller'
import Pagination from './pagination'
import useListPagination from '../hooks/use-list-pagination'

const INITIAL_STATE = {
  totalCount: 0,
  page: 1,
  pageSize: 20,
  params: {}
}

const CommunityImages = () => {
  const allImages = useSelector(allImagesSelector)
  const error = useSelector(errorAllImageSelector)
  const isLoggedIn = useSelector(isLoggedSelector)

  const [state, setState] = useState(INITIAL_STATE)
  const [selectedPostId, setSelectedPostId] = useState(null)

  const { currentPage, loading, nextPage, previousPage, refresh, resetCurrentPage, setCurrentPage} = useListPagination(getAllImages, GET_ALL_IMAGES, state.params)

  // const fetchNextItems = useCallback(() => {
  //   if (isLoading) return

  //   dispatch(getAllImages(allImages.nextPage || 1, state.pageSize))
  // }, [state.pageSize, allImages.nextPage, isLoading, dispatch])

  // useEffect(() => {
  //   fetchNextItems()
  // }, [])

  // useEffect(() => {
  //   setState({
  //     totalCount: allImages.totalCount,
  //     page: allImages.page || 1
  //   })
  // }, [allImages])

  const onChangePage = useCallback((event) => {
    const { name, value } = event.target
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  })

  const openDetails = useCallback((postId) => {
    setSelectedPostId(postId)
  }, [])

  const closeDetails = useCallback(() => {
    setSelectedPostId(null)
  }, [])

  return (
    <>
      {selectedPostId !== null && (
        <ModalDetails closeDetails={closeDetails} imageId={selectedPostId} />
      )}
      {!error ? 
        (
          <Pagination
            totalQnt={allImages.totalCount}
            listSize={allImages.images?.length}
            pageSize={state.pageSize}
            onChangePageSize={onChangePage}
            nextPage={nextPage}
            previousPage={previousPage}
            currentPage={currentPage}
            isLoading={loading}
            className={'max-h-[calc(100vh-5.75rem)]'}
          >
            <div className='flex justify-center w-full flex-wrap'>
              {allImages.images.map((item, index) => (
                <Card key={item.image} src={item.image} onClick={() => openDetails(item._id)} isLoading={!item.image && Math.abs(new Date() - new Date(item.createdAt)) < 600000} />
              ))}
            </div>
          </Pagination>
        ) : (
        <div className='flex w-full justify-center text-white mt-5'>
          {isLoggedIn ? 'An unexpected error happened' : 'You are not logged in'}
        </div>
      )}
    </>
  )
}

export default CommunityImages