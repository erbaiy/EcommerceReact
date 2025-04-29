import React from "react";
import AboutIllustration from "../assets/img/about-illustration.svg";
import SecurityIllustration from "../assets/img/security-illustration.svg";

const AboutSection = () => {
  return (
    <section className="py-10 md:py-20 lg:pt-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 items-center lg:gap-24">
          <div className="space-y-32">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-14">
              <img
                src={AboutIllustration}
                alt="about illustration"
                className="w-full lg:w-1/2 h-[24rem] object-contain"
              />
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Find Out A Little More About Us
                </h2>
                <p className="mt-4 text-base w-full max-w-md text-gray-500 dark:text-gray-300">
                  We are a company dedicated to the distribution of products by delivery to your home or to the place where you are, with the best quality of delivery.
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-14">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Your Safety Is Important
                </h2>
                <p className="mt-4 text-base w-full max-w-md text-gray-500 dark:text-gray-300">
                  When your order reaches you, we have the health safety protocols, so that you are protected from any disease. Watch the video of how the delivery is made.
                </p>
              </div>
              <img
                src={SecurityIllustration}
                alt="security illustration"
                className="w-full lg:w-1/2 h-[24rem] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;