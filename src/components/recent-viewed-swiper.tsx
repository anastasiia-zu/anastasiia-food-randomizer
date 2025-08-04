"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const RecentViewedSwiper = () => {
   const recipes = useSelector((state: RootState) => state.recentlyViewed.recipes);
   

  return (
   <div>
      {recipes.map((item, index) => (<div key={index}> {index} </div>))}
   </div>
  )
}

export default RecentViewedSwiper;