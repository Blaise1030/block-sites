import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import {AuthenticationContext} from "../contexts/AuthContext";
import LoadingIndicator from "../components/LoadingIndicator";
import {Transition} from "@headlessui/react";

const Login = () => {
  const {login, loadingData, errorMessage, showErrorMessage} = useContext(
    AuthenticationContext
  );

  const loginMethods = [
    {
      img: "https://img.icons8.com/fluency/48/000000/google-logo.png",
      methods: "Google",
    },
    {
      img: "https://img.icons8.com/color/48/000000/facebook-new.png",
      methods: "Facebook",
    },
    {
      img: "https://img.icons8.com/fluency/48/000000/github.png",
      methods: "Github",
    },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center flex-col select-none relative">
      <div className="absolute top-5 w-full flex flex-row justify-center">
        <Transition
          show={showErrorMessage}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-red-200 p-2 text-red-600 rounded border border-red-500">
            {errorMessage}
          </div>
        </Transition>
      </div>

      <div className="flex flex-col w-full items-center">
        <img
          src="https://img.icons8.com/ios/100/000000/black-and-white.png"
          className="w-10 h-10 mb-3"
        />
        <div className="font-bold">Log Into YAWB</div>
        <div className="flex lg:flex-row flex-col relative lg:mr-6 p-5">
          {loadingData && <LoadingIndicator />}
          <LoginForm />
          <div
            className="
          lg:flex-col 
          lg:border-l 
          border-t flex
          justify-center
          border-black                                        
          flex-row items-center 
          "
          >
            <div className="bg-white absolute text-black p-2">OR</div>
          </div>

          <div className="px-2 lg:ml-8 lg:mt-0 mt-8">
            <div className="flex flex-col justify-center h-full">
              {loginMethods.map(({methods, img}) => (
                <div
                  key={methods}
                  className="
                border
                border-black                 
                px-4 py-3 flex 
                duration-200 mb-3
                flex-row items-center 
                justify-between rounded 
                cursor-pointer hover:shadow-md"
                  onClick={() =>
                    login(methods as "Github" | "Facebook" | "Google")
                  }
                >
                  <div>Continue With {methods}</div>
                  <img className="w-6 h-6 ml-4" src={img} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const {loginWithEmail} = useContext(AuthenticationContext);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data: any) => loginWithEmail(data.email, data.password);
  const ErrorMessage = ({message}) => {
    return (
      <>
        {message && (
          <div className="absolute text-xs -mt-2 ml-2 bg-white px-1 text-red-600">
            {message}
          </div>
        )}
      </>
    );
  };

  return (
    <form
      className="flex flex-col lg:p-2 p-2 w-300 lg:mr-8 lg:mb-0  mb-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full relative">
        <ErrorMessage
          message={
            errors.email?.type === "required"
              ? "Email is required"
              : errors.email?.type === "pattern"
              ? "Please a valid email"
              : errors.email
          }
        />
        <input
          placeholder="Email Address"
          type="email"
          {...register("email", {
            required: true,
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          })}
          className={`p-3 border-b rounded-t focus:bg-gray-100 outline-none text-md w-full ${
            errors.email ? "border-red-600" : "border-black"
          }`}
        />
      </div>

      <div className="w-full relative pt-3">
        <ErrorMessage
          message={
            errors.password?.type === "minLength"
              ? "Password is too short"
              : errors.password?.type === "required"
              ? "Password is required"
              : errors.password
          }
        />
        <input
          placeholder="Password"
          type="password"
          {...register("password", {required: true, minLength: 8})}
          className={`border-b rounded-t focus:bg-gray-100 p-3 my-2 border-gray outline-none w-full ${
            errors.password ? "border-red-600" : "border-black"
          }`}
        />
      </div>

      <button
        type="submit"
        aria-label="login"
        disabled={errors.email || errors.password}
        className={`
          uppercase
          mt-1 bg-black       
          rounded  text-xs
          text-white py-4 px-5
          text-center cursor-pointer
          ${errors.email || errors.password ? "opacity-50" : "opacity-100"}`}
      >
        Login
      </button>
      <div className="hover:underline cursor-pointer text-xs duration-300 w-full text-center pt-4">
        Sign up with Email ?
      </div>
    </form>
  );
};

export default Login;
