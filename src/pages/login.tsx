import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import router from "next/router";
import { toast } from "sonner";

type loginFields = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<loginFields>();
  const { status } = useSession();

  if (status === "authenticated") {
    void router.push("/protectedLogin");
  }

  const onSubmit: SubmitHandler<loginFields> = async (data, event) => {
    event?.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!res) {
      toast.error("Something went wrong");
      return;
    }

    if (res.error === "CredentialsSignin") {
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Successfully logged in!");
    void router.push("protectedLogin");
  };

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 py-2 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-md bg-neutral-900 px-4 py-8 shadow-md sm:px-10">
          <div>
            <h1 className="my-6 text-center text-4xl font-extrabold text-amber-500">
              Open Fuel
            </h1>
            <h2 className="text-center text-3xl font-medium text-neutral-300">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-100"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                      className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-100"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      {...register("password", { required: true })}
                      className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="mt-6 flex w-full justify-center rounded-md border border-transparent bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
