import { useLoaderData } from "react-router";
import riderImg from "../../../assets/rider.png";
import { useForm, useWatch } from "react-hook-form";
import { districsByRegions, regionsFunc } from "../../../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const Rider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName,
      drivingLicense: "",
      email: user?.email,
      riderRegion: "",
      riderDistrict: "",
      nid: "",
      phone: "",
      bikeBrand: "",
      bikeRegistration: "",
      aboutYourself: "",
    },
  });
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending,
    isError,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosSecure.post("/riders", payload);
      return data;
    },
    onSuccess: (result) => {
      console.log("After Rider save", result);

      if (result.insertedId) {
        toast.success("Your request has been sent.");
      } else {
        toast.error(result.message);
      }

      mutationReset(); // reset mutation state
      reset(); // reset form
      // refetch the data after data update
      queryClient.invalidateQueries({ queryKey: ["riders"] });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
    retry: 3,
  });

  const selectedRegion = useWatch({ control, name: "riderRegion" });
  const regions = regionsFunc(serviceCenters);

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
    mutate(data);
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading-spinner"></span>
        <span className="text-red-500">Something is wrong!</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-2xl bg-base-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Form */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Be a Rider
            </h1>
            <p className="text-gray-600 mb-8">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="label">
                  <span className="label-text font-semibold text-gray-800">
                    Your Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full bg-white"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold text-gray-800">
                    Driving License Number
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Driving License Number"
                  className="input input-bordered w-full bg-white"
                  {...register("drivingLicense", {
                    required: "Driving License is required",
                  })}
                />
                {errors.drivingLicense && (
                  <span className="text-red-500 text-sm">
                    {errors.drivingLicense.message}
                  </span>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold text-gray-800">
                    Your Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full bg-white"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold text-gray-800">
                    Your Region
                  </span>
                </label>
                <select
                  className="select select-bordered w-full bg-white"
                  {...register("riderRegion", {
                    required: "Region is required",
                  })}
                >
                  <option value="">Select your Region</option>
                  {regions?.map((region, i) => (
                    <option key={i} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.riderRegion && (
                  <span className="text-red-500 text-sm">
                    {errors.riderRegion.message}
                  </span>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold text-gray-800">
                    Your District
                  </span>
                </label>
                <select
                  className="select select-bordered w-full bg-white"
                  {...register("riderDistrict", {
                    required: "District is required",
                  })}
                >
                  <option value="">Select your District</option>
                  {districsByRegions(selectedRegion, serviceCenters)?.map(
                    (district, i) => (
                      <option value={district} key={i}>
                        {district}
                      </option>
                    )
                  )}
                </select>
                {errors.riderDistrict && (
                  <span className="text-red-500 text-sm">
                    {errors.riderDistrict.message}
                  </span>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold text-gray-800">
                    NID No
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="NID"
                  className="input input-bordered w-full bg-white"
                  {...register("nid", { required: "NID is required" })}
                />
                {errors.nid && (
                  <span className="text-red-500 text-sm">
                    {errors.nid.message}
                  </span>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold text-gray-800">
                    Phone Number
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input input-bordered w-full bg-white"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold text-gray-800">
                    Bike Brand Model and Year
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Bike Brand Model and Year"
                  className="input input-bordered w-full bg-white"
                  {...register("bikeBrand", {
                    required: "Bike details are required",
                  })}
                />
                {errors.bikeBrand && (
                  <span className="text-red-500 text-sm">
                    {errors.bikeBrand.message}
                  </span>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold text-gray-800">
                    Bike Registration Number
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Bike Registration Number"
                  className="input input-bordered w-full bg-white"
                  {...register("bikeRegistration", {
                    required: "Registration number is required",
                  })}
                />
                {errors.bikeRegistration && (
                  <span className="text-red-500 text-sm">
                    {errors.bikeRegistration.message}
                  </span>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold text-gray-800">
                    Tell Us About Yourself
                  </span>
                </label>
                <textarea
                  placeholder="Tell Us About Yourself"
                  className="textarea textarea-bordered w-full bg-white"
                  rows="4"
                  {...register("aboutYourself", {
                    required: "Please tell us about yourself",
                  })}
                ></textarea>
                {errors.aboutYourself && (
                  <span className="text-red-500 text-sm">
                    {errors.aboutYourself.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-success w-full text-white font-bold"
              >
                {isPending ? (
                  <span className="loading-spinner">
                    <span>loading...</span>
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="hidden lg:flex items-center justify-center">
            {/* Replace with your image */}
            <div className="w-full h-full flex items-center justify-center rounded-lg">
              {/* Your rider image component goes here */}
              <img
                src={riderImg}
                alt="Rider with delivery"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;
