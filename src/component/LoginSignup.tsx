import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import {
  loginSchema,
  signupSchema,
  type FormValues,
  type SignupFormValues,
} from "../schema/formSchema";

const LoginSignup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [formMessage, setFormMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(isLoggedIn ? loginSchema : signupSchema),
    shouldUnregister: true,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      state: "",
      address: "",
      age: 18,
      gender: "",
      contactNumber: "",
      birthDate: "",
      profileImage: undefined,
      password: "",
      confirmPassword: "",
      agreed: false,
    },
  });

  const getErrorText = (message: unknown) =>
    typeof message === "string" ? message : "";

  const onSubmit = (data: Record<string, unknown>) => {
    const formData = data;
    setFormMessage("");

    if (isLoggedIn) {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        setFormMessage("No account found. Please signup first.");
        return;
      }

      const parsedUser: SignupFormValues = JSON.parse(savedUser);
      const email = String(formData.email || "");
      const password = String(formData.password || "");

      if (
        String(parsedUser.email) !== email ||
        String(parsedUser.password) !== password
      ) {
        setFormMessage("Email or password is incorrect.");
        return;
      }

      localStorage.setItem("loggedIn", "true");
      navigate("/profile");
      return;
    }

    const profileImage = formData.profileImage;

    const profileImageName =
      profileImage instanceof FileList && profileImage.length > 0
        ? profileImage[0]?.name || ""
        : "";

    const { confirmPassword, ...rest } = formData;
    void confirmPassword;

    const userToSave = {
      ...rest,
      agreed: Boolean(rest.agreed),
      profileImage: profileImageName,
      password: formData.password,
    };

    localStorage.setItem("user", JSON.stringify(userToSave));
    setFormMessage("Registration complete. You can now login.");
    setIsLoggedIn(true);
    reset();
  };

  const toggleMode = () => {
    setFormMessage("");
    setIsLoggedIn((prev) => !prev);
    reset();
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("firstName")}
                />
                <p className="text-sm text-red-500">
                  {getErrorText(errors.firstName?.message)}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("lastName")}
                />
                <p className="text-sm text-red-500">
                  {getErrorText(errors.lastName?.message)}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("city")}
                />
                <p className="text-sm text-red-500">
                  {getErrorText(errors.city?.message)}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="State"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("state")}
                />
                <p className="text-sm text-red-500">
                  {getErrorText(errors.state?.message)}
                </p>
              </div>

              <div className="md:col-span-2">
                <textarea
                  placeholder="Address"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("address")}
                />
                <p className="text-sm text-red-500">
                  {getErrorText(errors.address?.message)}
                </p>
              </div>

              <div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="text-sm font-medium sm:w-20">Age</label>
                  <input
                    type="number"
                    placeholder="Age"
                    className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("age", { valueAsNumber: true })}
                  />
                </div>
                <p className="text-sm text-red-500">
                  {getErrorText(errors.age?.message)}
                </p>
              </div>

              <div>
                <select
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("gender")}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <p className="text-sm text-red-500">
                  {getErrorText(errors.gender?.message)}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("contactNumber")}
                />
                <p className="text-sm text-red-500">
                  {getErrorText(errors.contactNumber?.message)}
                </p>
              </div>

              <div>
                <input
                  type="date"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("birthDate")}
                />
                <p className="text-sm text-red-500">
                  {getErrorText(errors.birthDate?.message)}
                </p>
              </div>

              <div className="md:col-span-2">
                <input
                  type="file"
                  className="w-full rounded-md border p-3"
                  {...register("profileImage")}
                />
                <p className="text-sm text-red-500">
                  {getErrorText(errors.profileImage?.message)}
                </p>
              </div>
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email")}
            />
            <p className="text-sm text-red-500">
              {getErrorText(errors.email?.message)}
            </p>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password")}
            />
            <p className="text-sm text-red-500">
              {getErrorText(errors.password?.message)}
            </p>
          </div>

          {!isLoggedIn && (
            <>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("confirmPassword")}
                />
                <p className="text-sm text-red-500">
                  {getErrorText(errors.confirmPassword?.message)}
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" {...register("agreed")} />I agree to
                  privacy policy
                </label>
                <p className="text-sm text-red-500">
                  {getErrorText(errors.agreed?.message)}
                </p>
              </div>
            </>
          )}

          {formMessage && (
            <p className="text-center text-sm text-red-600">{formMessage}</p>
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
            type="button"
            onClick={toggleMode}
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
