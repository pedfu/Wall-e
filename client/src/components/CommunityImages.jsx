import { useCallback, useEffect, useState } from 'react'
import { Card, Loader, ModalDetails } from '.'
import { useDispatch, useSelector } from 'react-redux'
import { allImagesSelector, errorAllImageSelector, loadingAllImageSelector } from '../modules/post/selector'
import { isLoggedSelector } from '../modules/authentication/selector'
import { getAllImages } from '../modules/post/actions'
import { usePrevious } from '../hooks/use-previous'
import InfiniteScroll from 'react-infinite-scroller'

const INITIAL_STATE = {
  totalCount: 0,
  page: 1,
  pageSize: 20
}

const CommunityImages = () => {
  const dispatch = useDispatch()
  const allImages = useSelector(allImagesSelector)
  const error = useSelector(errorAllImageSelector)
  const isLoading = useSelector(loadingAllImageSelector)
  const wasLoading = usePrevious(isLoading)
  const isLoggedIn = useSelector(isLoggedSelector)

  const [state, setState] = useState(INITIAL_STATE)
  const [selectedPostId, setSelectedPostId] = useState(null)

  const fetchNextItems = useCallback(() => {
    if (isLoading) return
    if (!allImages.nextPage) return

    dispatch(getAllImages(allImages.nextPage || 1, state.pageSize))
  }, [state.pageSize, allImages.nextPage, isLoading, dispatch])

  useEffect(() => {
    fetchNextItems()
  }, [])

  const openDetails = useCallback((postId) => {
    setSelectedPostId(postId)
  }, [])

  const closeDetails = useCallback(() => {
    setSelectedPostId(null)
  }, [])

  return (
    <>
      {selectedPostId !== null && (
        <ModalDetails closeDetails={closeDetails} details={posts.find(p => p._id === selectedPostId)} />
      )}
      <div className='flex flex-wrap overflow-y-auto max-h-[calc(100vh-250px)] items-start justify-center sm:justify-start w-full'>
        {!error ? 
          (
            <InfiniteScroll
              loadMore={fetchNextItems}
              hasMore={state.pageSize * state.page < state.totalCount}
              loader={<Loader />}
            >
              {allImages.images.map((item, index) => (
                <Card key={item.image} src={item.image} onClick={() => openDetails(item._id)} isLoading={!item.image && Math.abs(new Date() - new Date(item.createdAt)) < 600000} />
              ))}
            </InfiniteScroll>
          ) : (
          <div className='flex w-full justify-center text-white mt-5'>
            {isLoggedIn ? 'An unexpected error happened' : 'You are not logged in'}
          </div>
        )}
      </div>
    </>
  )
}

export default CommunityImages