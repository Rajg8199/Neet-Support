import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import { dataApi } from "@/store/api/api";
import { toast } from "react-toastify";

export default function LoginForm() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    mobile: "",
    otp: ["", "", "", ""], // Array to store each OTP digit (4 digits now)
  });
  const [showOtp, setShowOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state
  const navigate = useNavigate();

  // Refs for each OTP input
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Limit mobile number to 10 digits
    if (name === "mobile" && value.length > 10) return;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      // Only allow digits
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData((prevData) => ({
        ...prevData,
        otp: newOtp,
      }));

      // Move focus to the next input if a digit is entered
      if (value && index < 3) {
        otpRefs[index + 1].current.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true); // Disable the button
    dataApi({
      endPoint: `${apiUrl}/auth/requestOtp`,
      method: "POST",
      data: {
        mobile: "+91" + formData.mobile,
      },
    })
      .then((res) => {
        setShowOtp(true); // Show OTP input and verify button
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsSubmitting(false); // Re-enable the button
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions

    const otp = formData.otp.join(""); // Combine OTP digits into a single string

    setIsSubmitting(true); // Disable the button
    dataApi({
      endPoint: `${apiUrl}/auth/verifyOtp`,
      method: "POST",
      data: {
        mobile: "+91" + formData.mobile,
        otp: otp,
      },
    })
      .then((res) => {
        sessionStorage.setItem("authToken", res.token);
        toast.success(res.message);
        navigate("/dashboard");
        // Handle successful OTP verification
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsSubmitting(false); // Re-enable the button
      });
  };

  return (
    <div className="form-page__content lg:py-50 ">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9 ">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-2xl rounded-16">
              <h3 className="text-30 lh-13">Login</h3>
              <p className="mt-10">
                Don't have an account yet?{" "}
                <Link to="/signup" className="text-orange-1">
                  Sign up for free
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col">
                  <div className="flex gap-1">
                    <span className="flex items-center px-3 border border-gray-300 rounded-md w-[40px]">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      className="border border-gray-300 p-2 rounded-r-md w-full"
                    />
                  </div>
                </div>

                {showOtp && (
                  <div className="flex justify-between mt-4 gap-3">
                    {formData.otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        ref={otpRefs[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="border border-gray-300 p-2 rounded-md text-center w-6 h-12 text-lg font-semibold"
                      />
                    ))}
                  </div>
                )}

                {showOtp && (
                  <div className="flex flex-col mt-4">
                    <button
                      type="submit"
                      name="verify"
                      id="verify"
                      onClick={handleVerifyOtp}
                      className="button -sm -orange-1 text-white fw-500 w-full py-3"
                      disabled={isSubmitting} // Disable button during submission
                    >
                      {isSubmitting ? "Verifying..." : "Verify OTP"}
                    </button>
                  </div>
                )}

                {!showOtp && (
                  <div className="col-12">
                    <button
                      type="submit"
                      name="submit"
                      id="submit"
                      className="button -sm -orange-1 text-white fw-500 w-full py-3"
                      disabled={isSubmitting} // Disable button during submission
                    >
                      {isSubmitting ? "Requesting OTP..." : "Login"}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
