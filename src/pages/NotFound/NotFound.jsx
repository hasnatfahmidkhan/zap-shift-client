import {
  Home,
  Check,
  AlertCircle,
  HelpCircle,
  Cloud,
  ArrowBigLeft,
} from "lucide-react";

import { Link, useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 dark:bg-gray-900 font-sans antialiased min-h-screen flex flex-col transition-colors duration-300">
      {/* Main Content */}
      <main className="grow flex items-center justify-center px-4 py-12 md:py-20 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-lime-400/20 dark:bg-lime-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-teal-900/10 dark:bg-teal-900/20 rounded-full blur-3xl"></div>

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-lime-400/20 dark:bg-lime-400/10 text-teal-900 dark:text-lime-400 font-semibold text-sm tracking-wide uppercase mb-2 border border-lime-400/20">
              Error 404
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-teal-900 dark:text-white leading-tight">
              Oops! Looks like this delivery got{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-green-400">
                lost.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              We can't seem to find the page you're looking for. It might have
              been moved, deleted, or taken a wrong turn on the delivery route.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-teal-900 dark:bg-white text-white dark:text-teal-900 font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                Back to Homepage
              </Link>

              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center cursor-pointer justify-center gap-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-teal-900 dark:text-white font-bold py-3.5 px-8 rounded-full hover:border-lime-400 hover:text-lime-500 dark:hover:border-lime-400 dark:hover:text-lime-400 transition-colors duration-300"
              >
                <ArrowBigLeft className="w-5 h-5" />
                Back to Previous Page
              </button>
            </div>
          </div>

          {/* Illustration */}
          <div className="order-1 lg:order-2 flex justify-center items-center relative">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-linear-to-tr from-lime-400/30 to-green-100/30 dark:from-lime-400/10 dark:to-green-900/10 rounded-full animate-pulse blur-2xl transform scale-90"></div>

              {/* Card */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 w-full max-w-md transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  {/* Package Illustration Area */}
                  <div className="relative overflow-hidden rounded-2xl bg-linear-to-b from-blue-50 to-white dark:from-gray-700 dark:to-gray-800 h-64 flex flex-col items-center justify-center border-b-4 border-lime-400">
                    {/* Pinging Question Mark */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                      <HelpCircle className="w-24 h-24 text-teal-900 dark:text-gray-400 opacity-20 absolute top-0 left-0 animate-ping" />

                      {/* Package Box */}
                      <div className="relative z-10">
                        <div className="w-24 h-24 bg-lime-400 rounded-xl mx-auto flex items-center justify-center shadow-lg relative overflow-hidden">
                          {/* Package Tape Lines */}
                          <div className="absolute w-full h-4 bg-lime-500/40 top-1/2 left-0 transform -translate-y-1/2"></div>
                          <div className="absolute h-full w-4 bg-lime-500/40 top-0 left-1/2 transform -translate-x-1/2"></div>

                          {/* Package Face */}
                          <div className="relative z-10 flex flex-col items-center">
                            <div className="flex gap-4">
                              <div className="w-2 h-2 bg-teal-900 rounded-full"></div>
                              <div className="w-2 h-2 bg-teal-900 rounded-full"></div>
                            </div>
                            <div className="w-8 h-1 bg-teal-900 rounded-full mt-4"></div>
                          </div>
                        </div>
                        {/* Shadow */}
                        <div className="w-20 h-2 bg-black/10 rounded-full mx-auto mt-4 blur-sm"></div>
                      </div>
                    </div>

                    {/* Decorative Lines */}
                    <div className="absolute bottom-0 w-full flex justify-center gap-4 py-2">
                      <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                      <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                      <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    </div>

                    {/* Clouds */}
                    <div className="absolute top-4 left-4 text-gray-200 dark:text-gray-600">
                      <Cloud className="w-10 h-10" />
                    </div>
                    <div className="absolute top-8 right-8 text-gray-200 dark:text-gray-600">
                      <Cloud className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Tracking Steps */}
                  <div className="mt-6 space-y-4">
                    {/* Step 1 - Complete */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
                        <Check className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-1"></div>
                        <div className="h-2 w-16 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                      </div>
                    </div>

                    {/* Step 2 - Complete */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
                        <Check className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded-full mb-1"></div>
                        <div className="h-2 w-12 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                      </div>
                    </div>

                    {/* Step 3 - Error */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 animate-bounce">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="h-3 w-32 bg-red-100 dark:bg-red-900/40 rounded-full mb-1"></div>
                        <div className="text-xs text-red-500 font-medium">
                          Location Unknown
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
