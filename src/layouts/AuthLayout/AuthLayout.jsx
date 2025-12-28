import Logo from "../../components/Logo/Logo";
import authImage from "../../assets/authImage.png";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <section className="min-h-screen auth-font">
      <div className="flex min-h-screen">
        {/* Left Side - Auth Form */}
        <div className="flex-1 flex flex-col bg-base-200">
          {/* Logo - In normal flow, not absolute */}
          <div className="p-4 sm:p-6 lg:p-8">
            <Logo />
          </div>

          {/* Form Container */}
          <div className="flex-1 flex items-center justify-center px-4 pb-16 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-[#fafdf0] p-8">
          <img
            src={authImage}
            alt="Authentication"
            className="max-w-full max-h-[80vh] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
