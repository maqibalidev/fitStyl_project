import React from 'react'
import CustomHeader from '../../customHeader/CustomHeader'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import {CategoryIcon1 } from '../../../assets/icons/icons'
import "./category_section.css"
const CategorySection = () => {
  return (
    <div className='custom-container mx-auto  pb-2 border border-bottom-1 border-muted border-top-0 border-start-0 border-end-0'>
      <CustomHeader smallHeading="This Month" largeHeading="Browse By Category" navBtnClass="category-sec" showNav={true}/>
      <Swiper
          spaceBetween={20}
          slidesPerView={2}
             pagination={{
            el: ".custom-pagination", 
            bulletClass: "my-bullet", 
            bulletActiveClass: "my-bullet-active",
            clickable: true,
          }}
          modules={[Navigation,Pagination]}
          breakpoints={{
            480:{
              slidesPerView:3,
            },
            576:{
              slidesPerView:4,
            },
            992:{
              slidesPerView: 6,
            },
          }}
          className='my-4 my-sm-5 '
          navigation={{
            prevEl: ".category-sec-prev",
            nextEl: ".category-sec-next",
          }}
        >
          {[...Array(10)].map((item, key) => (
            <SwiperSlide key={key}>
              <div className='category-item w-100 p-4 d-flex flex-column align-items-center justify-content-center gap-3 rounded-3'>
                <CategoryIcon1/>
                <span className='title fw-medium color-dark'>Phones</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="d-flex d-sm-none custom-pagination justify-content-center my-3"></div>
    </div>
  )
}

export default CategorySection
