import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const OtpConfirmationModal = ({ isOpen, onClose, onConfirm, orderId }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (isOpen) {
      inputRefs[0].current.focus();
    }
  }, [isOpen]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === 6) {
      onConfirm(otpString);
      setOtp(['', '', '', '', '', '']);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-slate-50 dark:bg-slate-800 rounded-md shadow border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <X size={14} />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg className="mx-auto mb-4 text-primary w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-slate-500 dark:text-slate-400">Confirm Delivery</h3>
            <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
              Please enter the 6-digit OTP provided by the customer to confirm the delivery of order #{orderId}.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center space-x-2 mb-5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-12 text-center text-xl text-slate-900 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:text-white"
                    required
                  />
                ))}
              </div>
              <button
                type="submit"
                className="text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-700 font-medium rounded-md text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
              >
                Confirm Delivery
              </button>
              <button
                onClick={onClose}
                type="button"
                className="text-slate-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-slate-200 rounded-md border border-slate-200 text-sm font-medium px-5 py-2.5 hover:text-slate-900 focus:z-10 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-500 dark:hover:text-white dark:hover:bg-slate-600 dark:focus:ring-slate-600"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpConfirmationModal;