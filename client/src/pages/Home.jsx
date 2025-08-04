import React from 'react'
import HeroBanner from '../components/HeroBanner'
import PopularInWomans from '../components/PopularInWomans'
import ExclusiveBanner from '../components/ExclusiveBanner'
import NewCollections from '../components/NewCollections'
import NewsLetter from '../components/NewsLetter'

export const Home = () => {
  return (
    <div>
      <HeroBanner />
      <PopularInWomans />
      <ExclusiveBanner />
      <NewCollections />
      <NewsLetter />
    </div>
  )
}
