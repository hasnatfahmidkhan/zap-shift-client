import { FaArrowRight } from "react-icons/fa";

const PrimaryBtn = ({ children, className, onClick }) => {
  return (
    <div onClick={() => onClick} className="flex items-center justify-center">
      <button
        className={`btn btn-primary text-black font-bold text-xl rounded-xl py-6 px-8 ${className}`}
      >
        {children}
      </button>
      <div className="p-4 rounded-full bg-secondary -rotate-45 flex items-center justify-center">
        <FaArrowRight color="#caeb66" size={18} />
      </div>
    </div>
  );
};

export default PrimaryBtn;
