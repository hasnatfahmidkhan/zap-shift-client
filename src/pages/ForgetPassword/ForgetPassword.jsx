import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const { resetPassFunc } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleForget = async ({ email }) => {
    try {
      await resetPassFunc(email);
      toast.success("Check your email!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section>
      {/* Heading  */}
      <div className="mb-5 space-y-2 w-full max-w-sm">
        <h2 className="text-5xl font-bold">Forget Password</h2>
        <p className="text-[#000000] tracking-wide">
          Enter your email address and we’ll send you a reset link.
        </p>
      </div>
      <div className="card w-full max-w-sm shrink-0 border border-gray-100 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleForget)}>
            <fieldset className="fieldset space-y-2">
              {/* Email  */}
              <div>
                <label className="label">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
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

              <div>
                <button className="btn btn-primary text-[#000000] my-2 w-full">
                  Send
                </button>
                <p className="text-base text-accent mt-1 tracking-wide">
                  Remember your password?{" "}
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
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
