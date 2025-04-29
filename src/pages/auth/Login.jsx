import { Link, useNavigate } from "react-router-dom";
import IconInstagram from "../../components/icons/IconInstagram";
import IconX from "../../components/icons/IconX.jsx";
import IconGoogle from "../../components/icons/IconGoogle";
import IconFacebook from "../../components/icons/IconFacebook";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import InputField from "../../components/InputField";
import SpinnerIcon from "../../components/SpinnerIcon";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast("Email and password are required");
      setLoading(false);
      return;
    }
    setLoading(false);
    if (result.success) navigate("/");
    else if (result.error === "EMAIL_NOT_VERIFIED")
      toast.error("Please verify your email address");
    else if (result.error === "INVALID_CREDENTIALS")
      toast.error("Invalid credentials");
    else toast.error("An error occurred. Please try again later.");
    // else if (result.error === 'OTP_REQUIRED') navigate('/verify-otp');
  };

  return (
    <div>
      <div className="absolute inset-0">
        <img
          src="/assets/images/auth/bg-gradient.png"
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative flex min-h-screen bg-slate-50 items-center justify-center px-6 py-10 dark:bg-slate-900 sm:px-16">
        <div className="relative w-full max-w-[750px] rounded-md bg-[linear-gradient(45deg,#f97316_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#f97316_100%)] p-2 dark:bg-[linear-gradient(45deg,#f97316_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#f97316_100%)]">
          <div className="relative flex flex-col justify-center rounded-md bg-white/80 backdrop-blur-lg dark:bg-slate-900/80 px-6 lg:min-h-[500px] py-10">
            <div className="mx-auto w-full max-w-[500px]">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">
                  Sign in
                </h1>
                <p className="text-base font-semibold leading-normal text-slate-500 dark:text-slate-400">
                  Enter your email and password to login
                </p>
              </div>
              <form
                className="space-y-5 dark:text-white"
                onSubmit={handleSubmit}
              >
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                />
                <InputField
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={Lock}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
                <div className="flex items-center justify-between">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="relative flex items-center bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 justify-center rounded-md px-5 py-2 font-semibold outline-none transition duration-300 hover:shadow-none text-white !mt-6 w-full border-0 shadow-[0_10px_20px_-10px_rgba(249,115,22,1)]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <SpinnerIcon className="w-4 h-4 me-3 text-white" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
              <div className="relative my-7 text-center md:mb-9">
                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-slate-400 dark:bg-white-dark"></span>
                <span className="relative text-sm bg-orange-500 dark:bg-slate-700 rounded-full px-2 font-bold uppercase text-white">
                  or
                </span>
              </div>
              <div className="mb-10 md:mb-[30px]">
                <ul className="flex justify-center gap-3.5 text-white">
                  <li>
                    <Link
                      to="#"
                      className="inline-flex bg-gradient-to-r from-orange-500 to-orange-600 h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                    >
                      <IconInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="inline-flex bg-gradient-to-r from-orange-500 to-orange-600 h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                    >
                      <IconFacebook />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="inline-flex bg-gradient-to-r from-orange-500 to-orange-600 h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                    >
                      <IconX />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="inline-flex bg-gradient-to-r from-orange-500 to-orange-600 h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                    >
                      <IconGoogle />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="text-center text-slate-500 dark:text-white">
                Don't have an account?&nbsp;
                <Link
                  to="/register"
                  className="uppercase text-primary underline transition hover:text-orange-600 dark:hover:text-white"
                >
                  SIGN UP
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
