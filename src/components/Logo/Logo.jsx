import logo from "../../assets/logo.png";

const Logo = ({ className }) => {
  return (
    <div className="flex items-end ">
      <img src={logo} alt="zap shift logo" />
      <h3
        className={`text-3xl -ms-2.5 font-extrabold text-[#303030] translate-y-1 ${className}`}
      >
        ZapShift
      </h3>
    </div>
  );
};

export default Logo;
