import customerTop from "../../../assets/customer-top.png";
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
    <section className="bg-secondary py-16 px-6 rounded-xl">
      <div className="flex flex-col justify-center items-center text-center gap-8 mb-10">
        <img className="h-full" src={customerTop} alt="" />
        <div className="space-y-4">
          <h3 className="heading">What our customers are sayings</h3>
          <p className="max-w-2xl text-accent-content tracking-wide font-medium">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>
      </div>

      <div className="md:px-12">
        <Swiper
          ref={swiperRef}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={10}
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
            640: {
              slidesPerView: 1.2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          className="h-full"
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
                  <div className="bg-white rounded-xl shadow-lg p-8 h-72 flex flex-col ">
                    <img className="w-fit" src={reviewQuote} alt="" />
                    {/* Review Text */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-8 ">
                      {review.review}
                    </p>

                    {/* Divider */}
                    <div className="border-b border-dashed border-secondary mb-6"></div>

                    {/* User Info */}
                    <div className="flex items-center gap-4 h-full">
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
        <div className="relative flex items-center justify-center gap-5 mt-8">
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
    </section>
  );
};

export default Reviews;
