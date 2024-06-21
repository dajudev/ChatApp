import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import useLogin from "../../Hooks/useLogin";

const Login = () => {

  const loginSchema = z.object({
    username: z.string().nonempty({ message: "Username required" }),
    password: z.string().nonempty({ message: "Password required" }),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });


  const {loading,login} = useLogin()


  /**
   * Funcion asincrona encargada de hacer la autenticación del usuario
   * @param  data Información de la autenticación
   */
  const onSubmit = async (data) => {
    try {
      const loginRes = await login(data);
      if(loginRes){
        console.log(loginRes);
        setError("root", { message: loginRes });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400  bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-20">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login<span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label">
              {errors.username?.message ? (
                <div className="text-red-600 text-base label-text">
                  {" "}
                  {errors.username.message}{" "}
                </div>
              ) : (
                <span className="text-base label-text text-white">
                  Username
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10 bg-neutral-800 text-white"
              {...register("username")}
            />
          </div>
          <div>
            <label className="label">
              {errors.username?.message ? (
                <div className="text-red-600 text-base label-text">
                  {" "}
                  {errors.password.message}{" "}
                </div>
              ) : (
                <span className="text-base label-text text-white">
                  Password
                </span>
              )}
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10 bg-neutral-800 text-white"
              {...register("password")}
            />
          </div>

          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block  text-white"
          >
            {"Don't"} have an account?
          </Link>
          {errors.root && (
          <div className="text-red-600 text-base label-text text-center"> {errors.root.message} </div>
          )}
          <div>
            <input
              className="btn btn-block btn-sm mt-2 bg-neutral-800 text-white border-none"
              type="submit"
              aria-label="Log In"
              disabled={isSubmitting}
              value={isSubmitting ? "..." : "Log In"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
