import React from 'react';
import PaymentIcon from '../assets/img/services1-illustration.svg';
import ProductIcon from '../assets/img/services2-illustration.svg';
import ReceivedIcon from '../assets/img/services3-illustration.svg';

const ServiceCard = ({ title, description, icon, altText }) => (
  <div className="bg-slate-50 dark:bg-slate-800 w-full max-w-xs border border-slate-200 dark:border-slate-700 rounded-2xl shadow-md shadow-slate-500/10 p-6 flex flex-col items-center text-center">
    <h3 className="text-xl w-full dark:text-slate-50 font-semibold mb-4">{title}</h3>
    <img src={icon} alt={altText} className="w-full h-32 mb-4" />
    <p className="text-gray-600 dark:text-slate-400 mb-4">{description}</p>
    <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">Learn more</a>
  </div>
);

const ServiceCards = () => {
  const services = [
    {
      title: "Payment Done",
      description: "Pay with a Visa or PayPal card and without much ado.",
      icon: PaymentIcon,
      altText: "Payment illustration"
    },
    {
      title: "Find Your Product",
      description: "We offer sale of products through the Internet.",
      icon: ProductIcon,
      altText: "Product search illustration"
    },
    {
      title: "Product Received",
      description: "In our app you can see the delay time of your order.",
      icon: ReceivedIcon,
      altText: "Product received illustration"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-slate-900 dark:text-slate-50 font-bold text-center mb-12">Some Services We Offer</h2>
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6 items-center">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;