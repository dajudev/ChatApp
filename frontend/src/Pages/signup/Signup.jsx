import RoleCheckbox from "./RoleCheckbox";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400  bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-20">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up<span className="text-blue-500"> ChatApp</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Full name"
              className="w-full input input-bordered h-10 bg-neutral-800 text-white"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full input input-bordered h-10 bg-neutral-800 text-white"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="text"
              placeholder="Password"
              className="w-full input input-bordered h-10 bg-neutral-800 text-white"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Confirm Password
              </span>
            </label>
            <input
              type="text"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10 bg-neutral-800 text-white"
            />

            <RoleCheckbox/>

            <a
              href="#"
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block  text-white"
            >
              Already have an account?
            </a>
            <div>
              <button className="btn btn-block btn-sm mt-2 bg-neutral-800 text-white border-none">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
