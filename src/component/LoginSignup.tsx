import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const LoginSignup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-[350px] rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-5 text-center text-2xl font-bold">
          {isLoggedIn ? "Login" : "Signup"}
        </h2>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {!isLoggedIn && (
            <input
              type="text"
              placeholder="Full Name"
              className="rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
              {...register("username", {
                required: "User Name is Required",
              })}
            />
          )}

          <p className="text-red-500 text-sm">{errors.username?.message}</p>

          <input
            type="email"
            placeholder="Email"
            className="rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid Email Format",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <input
            type="password"
            placeholder="Password"
            className="rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-400"
            {...register("password", {
              required: "Password is Required",
            })}
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <button
            type="submit"
            className="rounded-md bg-blue-500 p-3 text-white hover:bg-blue-600"
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
