import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { usePrevious } from "./use-previous"
import { openTooltip } from "../modules/tooltip/actions"

const useListPagination = (action, actionName, params) => {
    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1)

    const error = useSelector(state => state.error.get(actionName.ACTION))
    const loading = useSelector(state => !!state.loading.get(actionName.ACTION))
    const wasLoading = usePrevious(loading)

    const refresh = useCallback(() => {
        dispatch(action(params))
    }, [dispatch, action, params])

    useEffect(() => {
        refresh()
    }, [params])

    useEffect(() => {
        if (!loading && wasLoading) {
            if (error && Object.keys(error)?.size > 0) {
                dispatch(openTooltip({ message: error?.first(), type: 'error' }))
            }
        }
    }, [loading, wasLoading, error, dispatch])

    const previousPage = useCallback(() => {
        dispatch(action({ ...params, page: currentPage - 1 }))
        setCurrentPage(prevState => prevState - 1)
    }, [action, currentPage, params, dispatch])

    const nextPage = useCallback(() => {
        dispatch(action({ ...params, page: currentPage + 1 }))
        setCurrentPage(prevState => prevState + 1)
    }, [action, currentPage, params, dispatch])

    const resetCurrentPage = useCallback(() => {
        setCurrentPage(1)
    }, [])

    return {
        currentPage,
        resetCurrentPage,
        setCurrentPage,
        nextPage,
        previousPage,
        refresh,
        loading,
    }
}

export default useListPagination