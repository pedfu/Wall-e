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

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)

  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState(null)

  return (
    <section className="max-w-7xl mx-auto bg-darkGrey text-bgWhite">
      <div className='flex flex-wrap justify-center home_card'>
        <img className='object-cover grow-[4] w-[400px] max-w-[600px] h-[400px] rounded-3xl m-2' src='https://cdn.openart.ai/uploads/image_KAT2nHKs_1689507669951_512.webp' />
        <div className='grow-[8] w-[800px] max-w-[800px] h-[400px] rounded-3xl m-2 content-1'>
          <h3>AI Artistry</h3>
          <p>Discover the magic of AI-powered creativity with our "AI Artistry" feature. Our cutting-edge AI algorithms can transform your ideas into stunning visual art. Whether you're an aspiring artist or just looking to add a unique touch to your photos, AI Artistry is your digital canvas. Explore a world of endless possibilities and see your imagination come to life.</p>
        </div>
        <img className='object-cover grow-[4] w-[300px] max-w-[400px] h-[400px] object-cover rounded-3xl m-2' src='https://cdn.openart.ai/uploads/image_kZ_F82Pb_1693994021525_512.webp' />
        <div className='grow-[6] w-[500px] max-w-[400px] h-[400px] bg-fontGrey rounded-3xl m-2 content-2'>
          <h3>Pixel Perfection</h3>
          <p>Unleash the power of "Pixel Perfection" with our AI image generator. Transform ordinary photos into extraordinary works of art. Our AI technology analyzes and enhances every pixel, ensuring your images are crisp, vibrant, and picture-perfect. Experience the future of image editing and give your visuals the professional touch they deserve.</p>
        </div>
        <img className='object-cover grow-[4] w-[400px] max-w-[600px] h-[400px] rounded-3xl m-2' src='https://cdn.openart.ai/uploads/image_OdkgIXBk_1692293290558_512.webp' />
        <img className='object-cover grow-[4] w-[400px] max-w-[600px] h-[400px] rounded-3xl m-2' src='https://cdn.openart.ai/uploads/image_ftIYGul7_1685559804074_512.webp' />
      </div>
    </section>
  )
}

export default Home