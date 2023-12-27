import { useCallback, useState } from 'react'
import { Card, ModalDetails } from '.'
import { useSelector } from 'react-redux'
import { allImagesSelector, errorAllImageSelector } from '../modules/post/selector'
import { isLoggedSelector } from '../modules/authentication/selector'
import { GET_ALL_IMAGES, getAllImages } from '../modules/post/actions'
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
      {selectedPostId !== null && (
        <ModalDetails closeDetails={closeDetails} imageId={selectedPostId} />
      )}
    </>
  )
}

export default CommunityImages