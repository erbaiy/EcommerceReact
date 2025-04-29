import React from "react";
import HomeIllustration from "../assets/img/home-illustration.svg";

const HeroSection = () => {
  return (
    <section className="py-10 md:py-20 lg:py-28" id="home">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl">
              Order Products Faster Easier
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-justify text-gray-500 dark:text-gray-300 md:mt-5 md:max-w-2xl">
              Order your favorite foods at any time and we will deliver them right to where you are.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-1 border border-transparent text-base font-normal rounded-full text-white bg-orange-500 hover:bg-orange-600 md:py-3 md:text-lg md:px-6"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <img
              src={HomeIllustration}
              alt="home illustration"
              className="w-full h-[13rem] lg:h-[28rem] lg:max-w-xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;