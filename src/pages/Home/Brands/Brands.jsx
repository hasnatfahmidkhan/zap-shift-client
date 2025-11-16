import Marquee from "react-fast-marquee";

import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";

const brandsImg = [
  amazon,
  amazon_vector,
  casio,
  moonstar,
  randstad,
  star,
  start_people,
];

const Brands = () => {
  return (
    <section>
      <h2 className="text-3xl mb-10 font-bold text-secondary text-center">
        We've helped thousands of sales teams
      </h2>
      <Marquee autoFill="true" pauseOnHover="true" className="">
        {brandsImg.map((img) => (
          <img className="mx-10" src={img} alt="" />
        ))}
      </Marquee>
    </section>
  );
};

export default Brands;
