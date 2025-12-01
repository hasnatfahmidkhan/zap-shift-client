import Lottie from "lottie-react";
import loading from "../../animations/loading.json";
const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* <span className="loading loading-bars loading-xl text-primary"></span> */}
      <Lottie animationData={loading} loop />
    </div>
  );
};

export default Spinner;
