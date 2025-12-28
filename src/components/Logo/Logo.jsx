import { Link } from "react-router";

const Logo = ({ className }) => {
  return (
    <Link to={"/"}>
      <div className={`flex items-end cursor-pointer`}>
        <img className="w-12 ml-2" src={"/logo.png"} alt="zap shift logo" />
        <h3
          className={`text-2xl logo-font uppercase md:text-3xl ms-1 font-extrabold font-serif text-[#303030] translate-y-1 ${className}`}
        >oorKnock</h3>
      </div>
    </Link>
  );
};

export default Logo;
