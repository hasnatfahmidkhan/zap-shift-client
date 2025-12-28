import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import SocialBtn from "../shared/SocialBtn/SocialBtn";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
const Login = () => {
  const axiosSecure = useAxiosSecure();
  const {
    GoogleLoginFunc,
    setUser,
    setAuthLoading,
    signInEmailPassFunc,
    authLoading,
  } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async ({ email, password }) => {
    try {
      const result = await signInEmailPassFunc(email, password);
      const currentUser = result.user;
      setUser(currentUser);
      navigate(state || "/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  // google login
  const handleGoogleLogin = async () => {
    try {
      const result = await GoogleLoginFunc();
      const currentUser = result.user;
      //* store user in DB
      const userInfo = {
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        displayName: currentUser.displayName,
      };

      axiosSecure.post("/users", userInfo).then(({ data }) => {
        if (data.message === "User already exits") {
          navigate(state || "/");
        }

        if (data.insertedId) {
          setUser(currentUser);
          navigate(state || "/");
        }
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <section>
      {/* Heading  */}
      <div className="mb-5 space-y-2 w-full">
        <h2 className="text-5xl font-bold">Welcome Back</h2>
        <p className="text-[#000000] font-medium tracking-wide">
          Login at DoorKnock
        </p>
      </div>
      <div className="card w-full max-w-sm shrink-0 bg-gray-100 border border-gray-100 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset space-y-2">
              {/* Email  */}
              <div>
                <label className="label">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  disabled={authLoading}
                  {...register("email", { required: "Your email is required" })}
                  type="email"
                  className="input-style border"
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-600 mt-1 tracking-wide">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              {/* Password  */}
              <div>
                <label className="label">
                  Password<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center relative">
                  <input
                    disabled={authLoading}
                    type={showPassword ? "text" : "password"}
                    className="input-style"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{6,}$/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long",
                      },
                    })}
                  />
                  <div className="absolute right-3 top-0 z-50">
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-[-30px] cursor-pointer"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </span>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-600 mt-1 tracking-wide">
                    {errors.password?.message}
                  </p>
                )}

                <div>
                  <Link
                    to={"/forget-password"}
                    className="link link-hover text-accent"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  disabled={authLoading}
                  className="btn btn-primary text-[#000000] my-2 w-full disabled:bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {authLoading ? (
                    <div className="flex items-center gap-2">
                      <span className="loading loading-spinner text-blue-400"></span>
                      Loading...
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
                <p className="text-base text-accent mt-1 tracking-wide">
                  Don't have any account?{" "}
                  <Link
                    className="text-[#8FA748] hover:underline"
                    to={"/register"}
                  >
                    Register
                  </Link>
                </p>
              </div>
            </fieldset>
          </form>
          <div className="divider font-medium">OR</div>
          <SocialBtn onClick={handleGoogleLogin} />
        </div>
      </div>
    </section>
  );
};

export default Login;
