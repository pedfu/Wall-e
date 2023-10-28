import { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, FormField, Loader } from '../components'

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data?.map((post) => <Card key={post._id} {...post} />)
  }

  return <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
}

RenderCards.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

const HowToUse = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)

  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState(null)

  return (
    <section className="max-w-7xl mx-auto bg-darkGrey text-bgWhite">
    
    </section>
  )
}

export default HowToUse