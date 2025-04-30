import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginType } from "../../../common/schemas/schema";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: loginType) => {
    setIsLoading(true);
    try {
      await login(data);
      console.log("Login successful !");
      
      navigate("/articles");
    } catch (error: any) {
      console.error("Login failed", error);
      navigate("/error", {
        state: {
          message: "Login failed! Please try again.",
          redirectTo: "/login",
          redirectLabel: "Try Again",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f6f1] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-100 shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <div className="flex items-center border px-3 py-2 rounded-lg bg-gray-50">
              <Mail className="w-4 h-4 text-gray-500 mr-2" />
              <input
                id="email"
                type="email"
                className="w-full bg-transparent outline-none"
                placeholder="you@example.com"
                {...register("body.email")}
              />
            </div>
            {errors.body?.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.body.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="flex items-center border px-3 py-2 rounded-lg bg-gray-50">
              <Lock className="w-4 h-4 text-gray-500 mr-2" />
              <input
                id="password"
                type="password"
                className="w-full bg-transparent outline-none"
                placeholder="Your password"
                {...register("body.password")}
              />
            </div>
            {errors.body?.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.body.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full font-bold bg-[#FF8205]  text-white py-2 rounded-lg hover:bg-[#D16900] transition"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-center gap-3 mt-6 text-gray-600">
          Don't have an account?
          <Link
            to={"/signup"}
            className="text-black text-md underline font-semibold"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};
