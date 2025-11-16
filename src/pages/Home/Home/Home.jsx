import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import HowItWorks from "../HowItWorks/HowItWorks";
import Services from "../Services/Services";

const Home = () => {
  return (
    <section className="space-y-8 md:space-y-20">
      <Banner />
      <HowItWorks />
      <Services />
      <Brands />
    </section>
  );
};

export default Home;
