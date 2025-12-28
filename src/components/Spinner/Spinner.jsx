import Lottie from "lottie-react";
import loading from "../../animations/loading.json";
const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Lottie animationData={loading} loop />
    </div>
  );
};

export default Spinner;
