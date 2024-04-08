import React from "react";
import {useNavigate} from "react-router-dom"
const SignUp = () => {
  const navigate = useNavigate()
  const handleLoginAndSignUp = () => {
    navigate("/login")
  }
  return (
    <div>
      <div class="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div class="flex items-center justify-center w-full lg:p-12">
            <div class="flex items-center xl:p-10">
              <form class="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
                <h3 class="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  SignUp
                </h3>

                <label
                  for="username"
                  class="mb-2 text-sm text-start text-grey-900"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="enter username"
                  class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                />
                <label
                  for="email"
                  class="mb-2 text-sm text-start text-grey-900"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="enter email"
                  class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                />
                <label
                  for="password"
                  class="mb-2 text-sm text-start text-grey-900"
                >
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  class="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                />

                <button class="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                  Sign In
                </button>
                <p class="text-sm leading-relaxed text-grey-900">
                   Registered Already?{" "}
                  <button onClick={handleLoginAndSignUp} class="font-bold text-grey-700">
                    Login Here!
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
