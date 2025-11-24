import React, { useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import api from '../../axios'
import ProductCard from '../../components/ProductCard'
import FeaturedSection from './FeaturedSection'
import EmailSubscription from './EmailSubscription'
import { Link } from 'react-router-dom'
import { LuMoveRight } from "react-icons/lu";


export default function Home() {
  const [products, setProducts] = useState([])
  const [trending, setTrending] = useState([])
  
  useEffect(() => {
    const fetchHomeProducts = async () => {
      const res = await api.get("/api/products/home")
      setProducts(res.data.products)
    }
    fetchHomeProducts()
  }, [])


  useEffect(() => {
    const fetchTrendingProducts = async () => {
      const res = await api.get("/api/products/home/trending")
      setTrending(res.data.products)
    }

    fetchTrendingProducts()
  }, [])

  return (
    <div>
      <HeroSection />

      <div className='mt-10 mb-10'>
           <div className='flex justify-between items-center mb-10'>
         <div className='flex flex-col'>
           <h1 className='text-2xl font-semibold'>Popular Products</h1>
          <div className='w-30 h-1 mt-2 rounded-full bg-orange-500'></div>
         </div>
           <Link to={"/products"} className='flex items-center text-sm bg-gray-200 px-3 py-1 rounded-lg'>
           View All
           <span><LuMoveRight /></span>
           </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
          {
            products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))
          }
        </div>
      </div>


      <div className='mb-10'>
        <div className='flex justify-between items-center mb-10'>
         <div className='flex flex-col'>
           <h1 className='text-2xl font-semibold'>Trending Products</h1>
          <div className='w-30 h-1 mt-2 rounded-full bg-orange-500'></div>
         </div>
           <Link to={"/products"} className='flex items-center text-sm bg-gray-200 px-3 py-1 rounded-lg'>
           View All
           <span><LuMoveRight /></span>
           </Link>
        </div>


        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
          {
            trending.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))
          }

        </div>

      </div>

      <FeaturedSection />
      <EmailSubscription />

    </div>
  )
}
