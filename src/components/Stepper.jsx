import PropTypes from 'prop-types';

const Stepper = ({ steps, activeStep }) => (
    <ol className="flex items-center w-full text-sm text-gray-500 font-medium sm:text-base m-2">
      {steps.map((step, index) => (
        <li
          key={step}
          className={`flex md:w-full items-center ${
            index <= activeStep ? "text-primary" : "text-slate-400"
          } ${
            index < steps.length - 1
              ? "sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-8"
              : ""
          }`}
        >
          <div className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2">
            <span
              className={`w-6 h-6 ${
                index <= activeStep ? "bg-primary text-white" : "bg-slate-200"
              } border ${
                index <= activeStep ? "border-primary" : "border-gray-200"
              } rounded-full flex justify-center items-center mr-3 text-sm lg:w-10 lg:h-10`}
            >
              {index + 1}
            </span>
            {step}
          </div>
        </li>
      ))}
    </ol>
  );

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default Stepper;