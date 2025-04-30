// src/components/SignupForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, signupType } from "../../../common/schemas/schema";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {signup} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: signupType) => {
    setIsLoading(true);
    try {
      console.log("Signup data:", data);
      const response = await signup(data);
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Signup failed", err);
      navigate("/error", {
        state: {
          message: "Signup failed! Please try again.",
          redirectTo: "/signup",
          redirectLabel: "Try Again",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center">Create an account</h2>

      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          {...register("body.name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Your name"
        />
        {errors.body?.name && (
          <p className="text-sm text-red-500">{errors.body.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          {...register("body.email")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="you@example.com"
        />
        {errors.body?.email && (
          <p className="text-sm text-red-500">{errors.body.email.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          {...register("body.password")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="********"
        />
        {errors.body?.password && (
          <p className="text-sm text-red-500">{errors.body.password.message}</p>
        )}
      </div>
      {/* Confirm Password */}
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("body.confirmPassword")}
          className="border border-gray-300 rounded px-3 py-2"
        />
        {errors.body?.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.body.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#FF8205] font-bold text-white py-2 rounded-md hover:bg-[#D16900] transition-all"
      >
        {isLoading ? "Creating..." : "Sign Up"}
      </button>
      <div className="flex justify-center items-center gap-3 text-gray-700">
        <p>Already have and account?</p>
        <Link
          to={"/login"}
          className="underline cursor-pointer font-semibold text-black text-md"
        >
          Login
        </Link>
      </div>
    </form>
  );
};
