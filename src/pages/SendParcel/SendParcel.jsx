import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  //!  explore useMemo and callBack
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const parcelType = useWatch({ control, name: "parcelType" });

  const districsByRegions = (region) => {
    const regionDistrics = serviceCenters.filter((r) => r.region === region);
    const districs = regionDistrics.map((d) => d.district);
    return districs;
  };

  const handleAddParcel = (data) => {
    console.log(data);
    const isDocument = parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight) || 0;

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log(cost);

    Swal.fire({
      title: "Confirm Booking",
      html: `
    <div class="text-center">
      <p class="text-accent mb-2">Please confirm your booking cost: <span class='text-secondary font-medium tracking-wide'>${cost} TK.</span></p>
    </div>
  `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "btn btn-success px-6 rounded-lg text-white font-semibold",
        cancelButton:
          "btn btn-error px-6 rounded-lg text-white font-semibold ml-3",
        popup: "rounded-2xl shadow-xl p-4",
        title: "text-secondary font-bold text-2xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Confirmed!",
          text: "Your booking is successfully placed.",
          icon: "success",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success px-6 rounded-lg text-white",
          },
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-10 bg-base-100 rounded-2xl shadow">
      <h1 className="text-4xl font-bold text-secondary mb-6">Add Parcel</h1>
      <hr className="my-6" />

      <form onSubmit={handleSubmit(handleAddParcel)}>
        {/* Parcel Type */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-secondary">
            Enter your parcel details
          </h2>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                value="document"
                type="radio"
                className="radio radio-success"
                defaultChecked
                {...register("parcelType", {
                  required: "Parcel type is required",
                })}
              />
              <span>Document</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                value="non-document"
                type="radio"
                className="radio radio-success"
                {...register("parcelType", {
                  required: "Parcel type is required",
                })}
              />
              <span>Not-Document</span>
            </label>
          </div>

          {errors.parcelType && (
            <p className="text-error text-sm mt-2">
              {errors.parcelType.message}
            </p>
          )}
        </div>

        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text">Parcel Name</span>
            </label>
            <input
              type="text"
              placeholder="Parcel Name"
              className="input input-bordered w-full"
              {...register("parcelName", {
                required: "Parcel name required",
              })}
            />
            {errors.parcelName && (
              <p className="label-text-alt text-error mt-1">
                {errors.parcelName.message}
              </p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label className="label">
              <span className="label-text">Parcel Weight (KG)</span>
            </label>
            <input
              type="text"
              placeholder="Parcel Weight (KG)"
              className="input input-bordered w-full"
              {...register("parcelWeight", {
                validate: (value) => {
                  if (parcelType === "non-document" && !value) {
                    return "Parcel weight required for non document";
                  }
                  return true;
                },
                pattern: {
                  value: /^-?\d+(\.\d+)?$/,
                  message: "Weight must be a number",
                },
              })}
            />
            {errors.parcelWeight && (
              <p className="label-text-alt text-error mt-1">
                {errors.parcelWeight.message}
              </p>
            )}
          </div>
        </div>

        <div className="divider my-6"></div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Sender */}
          <div>
            <h3 className="text-xl text-secondary font-bold mb-6">
              Sender Details
            </h3>

            <div className="space-y-6">
              {/* Sender Name */}
              <div>
                <label className="label">
                  <span className="label-text">Sender Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Sender Name"
                  className="input input-bordered w-full"
                  {...register("senderName", {
                    required: "Sender name required",
                  })}
                />
                {errors.senderName && (
                  <p className="label-text-alt text-error mt-1">
                    {errors.senderName.message}
                  </p>
                )}
              </div>

              {/* Sender Region and Distric  */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {/* Sender Region */}
                <div>
                  <label className="label">
                    <span className="label-text">Sender Region</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("senderRegion", {
                      required: "Sender region is required",
                    })}
                    defaultValue={""}
                  >
                    <option value={""} disabled>
                      Select Sender Region
                    </option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.senderRegion && (
                    <p className="label-text-alt text-error mt-1">
                      {errors.senderRegion.message}
                    </p>
                  )}
                </div>

                {/* Sender District */}
                <div>
                  <label className="label">
                    <span className="label-text">Sender District</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("senderDistrict", {
                      required: "Sender district is required",
                    })}
                    defaultValue={""}
                  >
                    <option value={""} disabled>
                      Select Your District
                    </option>
                    {districsByRegions(senderRegion).map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.senderDistrict && (
                    <p className="label-text-alt text-error mt-1">
                      {errors.senderDistrict.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Sender Address */}
              <div>
                <label className="label">
                  <span className="label-text">Sender Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered w-full"
                  {...register("senderAddress", {
                    required: "Sender address is required",
                  })}
                />
                {errors.senderAddress && (
                  <p className="label-text-alt text-error mt-1">
                    {errors.senderAddress.message}
                  </p>
                )}
              </div>

              {/* Sender Phone */}
              <div>
                <label className="label">
                  <span className="label-text">Sender Contact No</span>
                </label>
                <input
                  type="text"
                  maxLength={11}
                  placeholder="Sender Contact No"
                  className="input input-bordered w-full"
                  {...register("senderNumber", {
                    required: "Sender contact required",
                    minLength: {
                      value: 11,
                      message: "Phone number must be 11 digits",
                    },
                    maxLength: {
                      value: 11,
                      message: "Phone number must be 11 digits",
                    },
                    pattern: {
                      value: /^01[3-9]\d{8}$/,
                      message: "Enter a valid Bangladeshi phone number",
                    },
                  })}
                />
                {errors.senderNumber && (
                  <p className="label-text-alt text-error mt-1">
                    {errors.senderNumber.message}
                  </p>
                )}
              </div>

              {/* Pickup Instruction */}
              <div>
                <label className="label">
                  <span className="label-text">Pickup Instruction</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Pickup Instruction"
                  {...register("pickUpIns", {
                    required: "Pickup instruction is required",
                  })}
                />
                {errors.pickUpIns && (
                  <p className="label-text-alt text-error mt-1">
                    {errors.pickUpIns.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div>
            <h3 className="text-xl text-secondary font-bold mb-6">
              Receiver Details
            </h3>

            <div className="space-y-6">
              {/* Receiver Name */}
              <div>
                <label className="label">
                  <span className="label-text">Receiver Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Receiver Name"
                  className="input input-bordered w-full"
                  {...register("receiverName", {
                    required: "Receiver name required",
                  })}
                />
                {errors.receiverName && (
                  <p className="label-text-alt text-error mt-1">
                    {errors.receiverName.message}
                  </p>
                )}
              </div>

              {/* Receiver Region and District */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {/* Receiver Region */}
                <div>
                  <label className="label">
                    <span className="label-text">Receiver Region</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("receiverRegion", {
                      required: "Receiver region is required",
                    })}
                    defaultValue={""}
                  >
                    <option value={""} disabled>
                      Select receiver Region
                    </option>

                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.receiverRegion && (
                    <p className="label-text-alt text-error mt-1">
                      {errors.receiverRegion.message}
                    </p>
                  )}
                </div>
                {/* Receiver District */}
                <div>
                  <label className="label">
                    <span className="label-text">Receiver District</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("receiverDistrict", {
                      required: "Receiver district is required",
                    })}
                    defaultValue={""}
                  >
                    <option value={""} disabled>
                      Select receiver district
                    </option>

                    {districsByRegions(receiverRegion).map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.receiverDistrict && (
                    <p className="label-text-alt text-error mt-1">
                      {errors.receiverDistrict.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Receiver Address */}
              <div>
                <label className="label">
                  <span className="label-text">Receiver Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered w-full"
                  {...register("receiverAddress", {
                    required: "Receiver address is required",
                  })}
                />
                {errors.receiverAddress && (
                  <p className="label-text-alt text-error mt-1">
                    {errors.receiverAddress.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="label">
                  <span className="label-text">Receiver Contact No</span>
                </label>
                <input
                  type="text"
                  maxLength={11}
                  placeholder="Receiver Contact No"
                  className="input input-bordered w-full"
                  {...register("receiverNumber", {
                    required: "Receiver contact required",
                    minLength: {
                      value: 11,
                      message: "Phone number must be 11 digits",
                    },
                    maxLength: {
                      value: 11,
                      message: "Phone number must be 11 digits",
                    },
                    pattern: {
                      value: /^01[3-9]\d{8}$/,
                      message: "Enter a valid Bangladeshi phone number",
                    },
                  })}
                />
                {errors.receiverNumber && (
                  <p className="label-text-alt text-error mt-1">
                    {errors.receiverNumber.message}
                  </p>
                )}
              </div>

              {/* Delivery Instruction */}
              <div>
                <label className="label">
                  <span className="label-text">Delivery Instruction</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Delivery Instruction"
                  {...register("deliveryIns", {
                    required: "Delivery instruction is required",
                  })}
                />
                {errors.deliveryIns && (
                  <p className="label-text-alt text-error mt-1">
                    {errors.deliveryIns.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm mt-8 mb-6">* PickUp Time 4pm–7pm Approx.</p>

        <button className="btn btn-success px-10 w-full md:w-fit">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
