import React, { useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import api from '../../axios'
import ProductCard from '../../components/ProductCard'
import FeaturedSection from './FeaturedSection'
import EmailSubscription from './EmailSubscription'
import { Link } from 'react-router-dom'
import { LuMoveRight } from "react-icons/lu";
import Loader from '../../components/Loader'
import FAQSection from '../../components/Accordion'
import Testimonials from '../../components/Testimonials'
import WhyChooseUs from '../../components/WhyChoose'


export default function Home() {
  const [products, setProducts] = useState([])
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)

      const [homeRes, trendingRes] = await Promise.all([
        api.get("/api/products/home"),
      ])

      setProducts(homeRes.data.products)

      setLoading(false)
    }

    fetchAll()
  }, [])



  if (loading) return <Loader />

  return (
    <div>
      <HeroSection />

      <div className='mb-10 flex flex-col px-15 '>
        <div className='flex flex-col justify-between items-center mb-10'>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            New Arrivals
          </h2>
          <div className='w-30 h-1 mt-2 rounded-full bg-orange-500'></div>

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
          {
            products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))
          }
        </div>

        <div className='max-w-2xl mx-auto mt-10'>
          <button className="px-6 py-3 bg-white text-gray-600 font-semibold rounded-full border-2 border-orange-600 shadow-md hover:bg-orange-600 hover:text-white transition duration-300 transform hover:-translate-y-1 active:scale-95">
            View All Products
          </button>
        </div>


      </div>


      <FeaturedSection />
      <WhyChooseUs />
      <EmailSubscription />
      <Testimonials />
      <FAQSection />

    </div>
  )
}
