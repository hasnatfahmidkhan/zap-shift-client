const PrimaryBtn = ({ children, className, onClick }) => {
  return (
    <button
      onClick={() => onClick}
      className={`btn btn-primary text-black font-bold text-xl rounded-xl py-6 px-8 ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
