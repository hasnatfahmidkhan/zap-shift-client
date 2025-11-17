import { Link, useNavigate } from "react-router";
import imageUpload from "../../assets/image-upload.png";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import SocialBtn from "../shared/SocialBtn/SocialBtn";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
const Register = () => {
  const {
    GoogleLoginFunc,
    setUser,
    setAuthLoading,
    registerEmailPassFunc,
    authLoading,
  } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  // watch the photo input value changes
  const photoInput = watch("photo");

  const handleRegister = async (data) => {
    console.log(data);
    try {
      const { email, password, photo, name } = data;
      const result = await registerEmailPassFunc(email, password);
      const currentUser = result.user;
      setUser(currentUser);
      navigate("/");
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
      setUser(currentUser);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <section>
      <div className="mb-5 space-y-2">
        <h2 className="text-5xl font-bold">Create an Account</h2>
        <p className="text-[#000000] font-medium tracking-wide">
          Register with ZapShift
        </p>
      </div>
      <div className="card w-full max-w-sm shrink-0 border border-gray-100 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset space-y-2">
              {/* photo  */}
              <div>
                <label className="label mb-2">
                  Profile Photo <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="photo"
                  control={control}
                  rules={{
                    required: "Your photo required",
                    validate: (value) => {
                      if (!value || value.length === 0) {
                        return "Your photo required";
                      }
                      const file = value[0];
                      if (!file.type.startsWith("image/")) {
                        return "Please select an image file";
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        disabled={authLoading}
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => field.onChange(e.target.files)}
                        name={field.name}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer flex flex-col items-center justify-center"
                        title="upload photo"
                      >
                        <img src={imageUpload} alt="" />
                      </button>
                      {/* show file name when selected  */}
                      {photoInput && photoInput.length > 0 && (
                        <p className="text-accent tracking-wide">
                          ✓ {photoInput[0]?.name}
                        </p>
                      )}
                    </>
                  )}
                />
                {errors.photo && (
                  <p className="text-red-600 mt-1 tracking-wide">
                    {errors.photo.message}
                  </p>
                )}
              </div>

              {/* Name  */}
              <div>
                <label className="label">
                  Name<span className="text-red-500">*</span>
                </label>

                <input
                  disabled={authLoading}
                  {...register("name", {
                    required: "Your name is required",
                    minLength: {
                      value: 3,
                      message: "Your name at least 3 char",
                    },
                    maxLength: {
                      value: 20,
                      message: "Your name at most 20 char",
                    },
                  })}
                  type="text"
                  className="input-style"
                  placeholder="Name"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-600 mt-1 tracking-wide">
                    {errors.name?.message}
                  </p>
                )}
                {errors.name?.type === "minLength" && (
                  <p className="text-red-600 mt-1 tracking-wide">
                    {errors.name?.message}
                  </p>
                )}
                {errors.name?.type === "maxLength" && (
                  <p className="text-red-600 mt-1 tracking-wide">
                    {errors.name?.message}
                  </p>
                )}
              </div>

              {/* Email  */}
              <div>
                <label className="label">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  disabled={authLoading}
                  {...register("email", { required: "Your email is required" })}
                  type="email"
                  className="input-style"
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
                <input
                  disabled={authLoading}
                  type="password"
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
                {errors.password?.type === "required" && (
                  <p className="text-red-600 mt-1 tracking-wide">
                    {errors.password?.message}
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600 mt-1 tracking-wide">
                    {errors.password?.message}
                  </p>
                )}
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
                    "Register"
                  )}
                </button>
                <p className="text-base text-accent mt-1 tracking-wide">
                  Already have an account?{" "}
                  <Link
                    className="text-[#8FA748] hover:underline"
                    to={"/login"}
                  >
                    Login
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

export default Register;
