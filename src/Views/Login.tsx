import {useContext} from "react";
import LoginIcon from "@heroicons/react/solid/LoginIcon";
import {AuthenticationContext} from "../contexts/AuthContext";

const Login = () => {
  const {login} = useContext(AuthenticationContext);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div className="font-bold text-xl pb-2">YAWB</div>
      <div className="border p-5 rounded-md border-black shadow flex flex-col items-center m-2 bg-white select-none">
        <div className="pb-5 text-center flex-col items-center justify-center flex">
          <div className="text-gray-700 text-xl">Welcome Back</div>
          <div className="text-gray-400 w-2/3">
            It is obvious you need to click the button below. So do it.
          </div>
        </div>

        <div
          onClick={login}
          className="bg-blue-500 text-white hover:bg-blue-400 duration-200 py-3 px-4 rounded cursor-pointer flex flex-row items-center justify-center w-full"
        >
          <LoginIcon className="w-6 h-6 mr-2" />
          <div>Login</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
