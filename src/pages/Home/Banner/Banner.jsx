import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
const images = [banner1, banner2, banner3];
const Banner = () => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      loop={true}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 3000,
      }}
      className="rounded-xl md:rounded-3xl overflow-hidden xl:h-[580px] w-full"
    >
      {images.map((img) => (
        <SwiperSlide>
          <img src={img} alt="" className="h-full w-full object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
