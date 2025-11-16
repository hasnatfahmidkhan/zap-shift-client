import { FaArrowRight } from "react-icons/fa";

const PrimaryArrow = () => {
  return (
    <div className="p-4 rounded-full bg-secondary -rotate-45 flex items-center justify-center">
      <FaArrowRight color="#caeb66" size={18} />
    </div>
  );
};

export default PrimaryArrow;
