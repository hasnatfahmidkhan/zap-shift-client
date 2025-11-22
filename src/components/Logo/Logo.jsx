import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Logo = ({ className }) => {
  return (
    <Link to={"/"}>
      <div className={` flex items-end cursor-pointer`}>
        <img className="w-8 md:w-full" src={logo} alt="zap shift logo" />
        <h3
          className={`text-2xl md:text-3xl -ms-2.5 font-extrabold text-[#303030] translate-y-1 ${className}`}
        >
          ZapShift
        </h3>
      </div>
    </Link>
  );
};

export default Logo;
