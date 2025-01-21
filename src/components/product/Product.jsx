import React, { memo, useEffect, useState } from "react";
import "./product.css";
import {
  EyeIcon,
  FavoriteIcon,
  RatingIcon,
  Image,
  CancelIcon,
} from "../includes/imports";
import { Link, useNavigate } from "react-router-dom";
import SpinnerLoader from "../includes/SpinnerLoader";

export const Product = memo(
  ({
    id,
    offSale,
    title,
    price,
    img,
    rating,
    isNew,
    exist=false,
    isFavProduct = false,
    existInCart= false,
    onAddToCart,
     loadingState,
    onToggleFavorite,

  }) => {
    const navigate = useNavigate();
    const originalPrice = price / (1 - offSale / 100);
    const ratingStar = Math.ceil(rating / 20);
    const remainingRatingStar = 5 - ratingStar;
const [loading,setLoading] = useState(loadingState);


useEffect(()=>{
setLoading(false)
},[existInCart])


const handleAddToCart = ()=>{
setLoading(true)
  onAddToCart(id)

}


    return (
      <div className="product-item position-relative w-100">
           <div className="position-relative">
 {loading &&   <div  className="cart-item-loader position-absolute top-0 left-0 pb-5 w-100 h-100  d-flex align-items-center justify-content-center">
     <div className="relative w-100 h-100 d-flex align-items-center justify-content-center pb-5">
     <SpinnerLoader/>
     </div>
      </div>}
        {offSale > 0 && (
          <span className="sale z-1 top-0 left-0 m-2 bg-color-orange color-light rounded-1 position-absolute">
            -{offSale}%
          </span>
        )}
        {isNew && !offSale && (
          <span className="sale color-light bg-color-green z-1 newLabel top-0 left-0 m-2 rounded-1 position-absolute">
            New
          </span>
        )}
       <span className="z-1 action-btns end-0 m-2 position-absolute top-0 d-flex flex-column gap-2">
       {
        !isFavProduct ?  <button onClick={()=>onToggleFavorite(id,title,img,price,rating)} className={`bg-color-light ${exist && "product-fav-icon-active "} product-fav-icon rounded-circle border-0 d-flex align-items-center justify-content-center`}>
        <FavoriteIcon />
      </button>

      :
      <button onClick={()=>onToggleFavorite(id,title,img,price,rating)} className={`bg-color-light fav-remove-icon rounded-circle border-0 d-flex align-items-center justify-content-center`}>
      <CancelIcon />
    </button>
       }
        <Link
          to={`/product?id=${id}`}
          className="bg-color-light  rounded-circle border-0 d-flex align-items-center justify-content-center"
        >
          <EyeIcon />
        </Link>
      </span>
        <div className="item-top p-4 rounded-1 overflow-hidden bg-color-lightgrey d-flex justify-content-center align-items-center position-relative">
          <Image url={img} />
          {existInCart ?
          <button
          onClick={()=>navigate("/cart")}
          className="text-light position-absolute product-item-btn bg-color-dark-orange w-100 p-2 border-0"
        >
          View In Cart
        </button>:
        <button
        onClick={handleAddToCart}
        className="text-light position-absolute product-item-btn bg-color-dark-orange w-100 p-2 border-0"
      >
        Add To Cart
      </button>}
        </div>
        <div className="item-body py-3">
          <span className="title d-block mb-1 fw-medium">{title}</span>
          <span className="prices color-primary fw-medium">
          Rs.{price.toFixed(2)}
            {offSale && (
              <span className="ms-2 text-decoration-line-through color-lightgrey fw-medium">
                Rs.{originalPrice.toFixed(2)}
              </span>
            )}
          </span>
          <div className="rating d-flex gap-2 align-items-center mt-1">
            {[...Array(ratingStar)].map((_, index) => (
              <RatingIcon key={index} color={"var(--primary-color)"} />
            ))}
            {ratingStar < 5 &&
              [...Array(remainingRatingStar)].map((_, index) => (
                <RatingIcon key={index} color={"var(--light-grey-color)"} />
              ))}
            <span className="color-lightgrey ms-2">({rating})</span>
          </div>
        </div>
      </div>
      </div>
    );
  }
);
