import React from "react";
import DeliveryTrackingIllustration from "../assets/img/app-illustration.svg";
import AppStoreIcon from "../assets/img/apple-logo.svg";
import GooglePlayIcon from "../assets/img/google-play.svg";

const DeliveryTracking = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <img
              src={DeliveryTrackingIllustration}
              alt="Delivery tracking illustration"
              className="w-full h-auto max-h-[24rem] object-contain"
            />
          </div>
          <div className="mt-10 lg:mt-0 lg:w-1/2 lg:pl-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Watch Your Delivery At Any Time
            </h2>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-300">
              With our app you can view the route of your order, from our local headquarters to the place where you are. Look for the app now!
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-orange-500 hover:bg-orange-600"
              >
                <img src={AppStoreIcon} alt="App Store" className="w-6 h-6 mr-2" />
                App Store
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-orange-500 hover:bg-orange-600"
              >
                <img src={GooglePlayIcon} alt="Google Play" className="w-6 h-6 mr-2" />
                Google Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryTracking;