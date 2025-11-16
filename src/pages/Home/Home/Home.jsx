import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import FeatureCard from "../FeaturedCard/FeatureCard";
import HowItWorks from "../HowItWorks/HowItWorks";
import Services from "../Services/Services";

const Home = () => {
  return (
    <section className="space-y-12 md:space-y-20">
      <Banner />
      <HowItWorks />
      <Services />
      <Brands />
      <FeatureCard />
    </section>
  );
};

export default Home;
