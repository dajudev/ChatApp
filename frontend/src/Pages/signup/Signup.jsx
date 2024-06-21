import { Link } from "react-router-dom";
import RoleCheckbox from "./RoleCheckbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm} from "react-hook-form";
import z from "zod";
import useSignup from "../../Hooks/useSignup";

const Signup = () => {
  //USER SIGNUP SCHEMA
  const signupSchema = z.object({
    fullName: z.string().nonempty({ message: "Full name required" }),
    username: z
      .string()
      .nonempty({ message: "Username required" })
      .min(4, { message: "Must contain 4 characters" }),
    password: z
      .string()
      .nonempty({ message: "Password required" })
      .min(8, { message: "Password must be 8 characters long" }),
      confirmPassword: z
      .string()
      .nonempty({ message: "Confirm required" })
      .refine((val) => password === val, {
        message: "Password aren´t the same",
      }),
    role: z.enum(['Admin','Player'],{
      errorMap: (issue, ctx) =>{
        if(issue.code === 'invalid_enum_value'){
          return { message: 'You must select exactly one role' };
        }
        return { message: ctx.defaultError}
      }
    })
  });

  const {
    register,
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupSchema) });
  const password = watch("password");


  const {loading,signup} = useSignup()

  /**
   * Funcion asincrona encargada de hacer la autenticación del usuario
   * @param  data Información de la autenticación
   */
  const onSubmit = async (data) => {
    try {
      const submitRes = await signup(data);
      if(submitRes){
        console.log(submitRes);
        setError("root", { message: submitRes });
      }
    } catch (error) {
      setError("root", {
        message: "Signup Error",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400  bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-20">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up<span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label p-2">
              {errors.fullName?.message ? (
                <div className="text-red-600 text-base label-text">
                  {" "}
                  {errors.fullName.message}{" "}
                </div>
              ) : (
                <span className="text-base label-text text-white">
                  Full Name
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder="Full name"
              className="w-full input input-bordered h-10 bg-neutral-800 text-white"
              {...register("fullName")}
            />
          </div>
          <div>
            <label className="label p-2">
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
              placeholder="Username"
              className="w-full input input-bordered h-10 bg-neutral-800 text-white"
              {...register("username")}
            />
          </div>
          <div>
            <label className="label p-2">
              {errors.password?.message ? (
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
              placeholder="Password"
              className="w-full input input-bordered h-10 bg-neutral-800 text-white"
              {...register("password")}
            />
          </div>
          <div>
            <label className="label p-2">
              {errors.confirm?.message ? (
                <div className="text-red-600 text-base label-text">
                  {" "}
                  {errors.confirm.message}{" "}
                </div>
              ) : (
                <span className="text-base label-text text-white">
                  Confirm Password
                </span>
              )}
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10 bg-neutral-800 text-white"
              {...register("confirmPassword")}
            />
      
            <RoleCheckbox control={control} errors={errors} />

            <Link
              to="/login"
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block  text-white"
            >
              Already have an account?
            </Link>
            {errors.root && (
            <div className="text-red-600 text-base label-text text-center"> {errors.root.message} </div>
            )}
            <div>
              <input
                className="btn btn-block btn-sm mt-2 bg-neutral-800 text-white border-none"
                type="submit"
                aria-label="Sign Up"
                disabled={isSubmitting}
                value={isSubmitting ? "..." : "Sign Up"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
