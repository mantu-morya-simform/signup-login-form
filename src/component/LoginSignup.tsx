import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  state: string;
  address: string;
  age: number;
  gender: string;
  contactNumber: string;
  profileImage: FileList;
  birthDate: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
};

const LoginSignup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const form = useForm<FormValues>({
    shouldUnregister: true,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      state: "",
      address: "",
      age: 0,
      gender: "",
      contactNumber: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
      agreed: false,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = form;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
      <div className="max-w-4xl rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold">
          {isLoggedIn ? "Login" : "Signup"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          {!isLoggedIn && (
            <div className="grid grid-cols-2 gap-4">
              {/* first name */}
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                <p className="text-sm text-red-500">
                  {errors.firstName?.message}
                </p>
              </div>

              {/* last name */}
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                />
                <p className="text-sm text-red-500">
                  {errors.lastName?.message}
                </p>
              </div>

              {/* city */}
              <div>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("city", {
                    required: "City is required",
                  })}
                />
                <p className="text-sm text-red-500">{errors.city?.message}</p>
              </div>

              {/* state */}
              <div>
                <input
                  type="text"
                  placeholder="State"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("state", {
                    required: "State is required",
                  })}
                />
                <p className="text-sm text-red-500">{errors.state?.message}</p>
              </div>

              {/* address */}
              <div className="col-span-2">
                <textarea
                  placeholder="Address"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                <p className="text-sm text-red-500">
                  {errors.address?.message}
                </p>
              </div>

              {/* age */}
              <div>
                <div className="flex gap-2 align-middle justify-center">
                  <label htmlFor="age" className="self-center">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="Age"
                    className="w-7/4 rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("age", {
                      required: "Age is required",
                      min: {
                        value: 18,
                        message: "Age must be 18+",
                      },
                    })}
                  />
                </div>
                <p className="text-sm text-red-500">{errors.age?.message}</p>
              </div>

              {/* gender */}
              <div>
                <select
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <p className="text-sm text-red-500">{errors.gender?.message}</p>
              </div>

              {/* contact number */}
              <div>
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("contactNumber", {
                    required: "Contact number required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Must be 10 digits",
                    },
                  })}
                />
                <p className="text-sm text-red-500">
                  {errors.contactNumber?.message}
                </p>
              </div>

              {/* birth date */}
              <div>
                <input
                  type="date"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("birthDate", {
                    required: "Birth date required",
                  })}
                />
                <p className="text-sm text-red-500">
                  {errors.birthDate?.message}
                </p>
              </div>

              {/* profile image */}
              <div className="col-span-2">
                <input
                  type="file"
                  className="w-full rounded-md border p-3"
                  {...register("profileImage", {
                    required: "Profile image required",
                  })}
                />
                <p className="text-sm text-red-500">
                  {errors.profileImage?.message}
                </p>
              </div>
            </div>
          )}

          {/* email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email", {
                required: "Email is Required",
              })}
            />
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          </div>

          {/* password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password", {
                required: "Password is Required",
              })}
            />
            <p className="text-sm text-red-500">{errors.password?.message}</p>
          </div>

          {!isLoggedIn && (
            <>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("confirmPassword", {
                    required: "Confirm password required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                />
                <p className="text-sm text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("agreed", {
                    required: "You must accept privacy policy",
                  })}
                />
                I agree to privacy policy
              </label>

              <p className="text-sm text-red-500">{errors.agreed?.message}</p>
            </>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 p-3 text-white transition hover:bg-blue-600"
          >
            {isLoggedIn ? "Login" : "Signup"}
          </button>
        </form>

        <DevTool control={control} />

        <p className="mt-4 text-center text-sm">
          {isLoggedIn ? "Don't have an account?" : "Already have an account?"}

          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="ml-2 font-semibold text-blue-500 hover:underline"
          >
            {isLoggedIn ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
