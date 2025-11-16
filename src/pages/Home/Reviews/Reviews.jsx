import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import required modules
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import reviewQuote from "../../../assets/reviewQuote.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { use, useRef } from "react";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise) || [];
  const swiperRef = useRef(null);

  return (
    <div className="px-12">
      <Swiper
        ref={swiperRef}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={20}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
            768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            {({ isActive }) => (
              <div
                className={`transition-all duration-300 ${
                  isActive
                    ? "scale-100 opacity-100 z-10"
                    : "scale-90 opacity-50 z-0"
                }`}
              >
                <div className="bg-white rounded-xl shadow-lg p-8 h-full flex flex-col">
                  <img className="w-fit" src={reviewQuote} alt="" />
                  {/* Review Text */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-8 ">
                    {review.review}
                  </p>

                  {/* Divider */}
                  <div className="border-b border-dashed border-secondary mb-6"></div>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={review.user_photoURL}
                      alt={review.userName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-teal-700"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review.userName}
                      </h4>
                      <p className="text-accent tracking-wide text-sm">
                        {review.role}, {review.company}
                      </p>
                      <p className="text-accent tracking-wide text-sm"></p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation and pagination  */}
      <div className="relative flex items-center justify-center gap-5 mt-12">
        {/* Navigation Buttons */}
        <button
          onClick={() => swiperRef?.current.swiper.slidePrev()}
          className="swipper_pagination_arrow"
        >
          <FaArrowLeft />
        </button>
        {/* custom pagination */}
        <div className="flex justify-center">
          <div className="custom-pagination flex justify-center "></div>
        </div>
        <button
          onClick={() => swiperRef?.current.swiper.slideNext()}
          className="swipper_pagination_arrow"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Reviews;
