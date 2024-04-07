import React from "react";

const Login = () => {
  return (
    <div>
      <div class="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div class="flex items-center justify-center w-full lg:p-12">
            <div class="flex items-center xl:p-10">
              <form class="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
                <h3 class="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  Sign In
                </h3>

                <label
                  for="username"
                  class="mb-2 text-sm text-start text-grey-900"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="username"
                  placeholder="Username"
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
                  Not registered yet?{" "}
                  <a href="javascript:void(0)" class="font-bold text-grey-700">
                    Create an Account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
