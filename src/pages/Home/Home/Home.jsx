import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import Faq from "../Faq/Faq";
import FeatureCard from "../FeaturedCard/FeatureCard";
import HowItWorks from "../HowItWorks/HowItWorks";
import Reviews from "../Reviews/Reviews";
import Services from "../Services/Services";
const reviewsPromise = fetch("/reviews.json").then((res) => res.json());
const Home = () => {
  return (
    <section className="space-y-12 md:space-y-20">
      <Banner />
      <HowItWorks />
      <Services />
      <Brands />
      <FeatureCard />
      <Reviews reviewsPromise={reviewsPromise} />
      <Faq />
    </section>
  );
};

export default Home;
