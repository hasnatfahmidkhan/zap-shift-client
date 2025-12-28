import Logo from "../../components/Logo/Logo";
import authImage from "../../assets/authImage.png";
import { Outlet } from "react-router";
const AuthLayout = () => {
  return (
    <section className="h-screen auth-font">
      <div className="relative bg-base-200 flex justify-center items-center h-full">
        <div className="flex-1 flex flex-col items-center justify-center h-full w-full">
          <div className="absolute top-5 md:top-10 left-8 md:left-15">
            <Logo />
          </div>
          <Outlet />
        </div>
        <div className="hidden flex-1 md:flex items-center justify-center bg-[#fafdf0] h-full">
          <img src={authImage} alt="" />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
