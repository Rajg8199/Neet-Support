import React from "react";
import { Button, message } from "antd";

// List of Indian States
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep",
  "Puducherry", "Ladakh", "Jammu and Kashmir"
];
// InputField Component
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  disabled,
  error,
}) => (
  <div className="flex flex-col">
    {label && (
      <label className="block mb-1 text-sm text-black" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-2 py-1 rounded text-sm text-gray-900 border border-gray-300"
      required={required}
      disabled={disabled}
    />
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
);

// SelectField Component
const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
  disabled,
}) => (
  <div className="flex flex-col">
    {label && (
      <label className="block mb-1 text-sm text-black" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-2 py-1 rounded text-sm text-gray-900 border border-gray-300"
      required={required}
      disabled={disabled}
    >
      <option value="">Select an option</option>
      {options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// Main FillYourDetails Component
const FillYourDetails = ({
  formData,
  handleChange,
  handleUserDetailsSubmit,
  handleSameAddressChange,
  isSameAddress,
  formErrors,
}) => {
  // Validation logic inside form submission
  const validateForm = () => {
    const errors = {};

    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(formData.mobilePrimary)) {
      errors.mobilePrimary = "Mobile number must be 10 digits";
    }
      // Validate NEET percentile (0 to 100)
  if (formData.neetPercentile < 0 || formData.neetPercentile > 100) {
    errors.neetPercentile = "Percentile must be between 0 and 100";
  }

  // Validate academic percentages (0 to 100)
  if (formData.metricAcademicDetailsPercentage < 0 || formData.metricAcademicDetailsPercentage > 100) {
    errors.metricAcademicDetailsPercentage = "10th percentage must be between 0 and 100";
  }

  if (formData.intermediateAcademicDetailsPercentage < 0 || formData.intermediateAcademicDetailsPercentage > 100) {
    errors.intermediateAcademicDetailsPercentage = "12th percentage must be between 0 and 100";
  }

  // Validate year of passing (must be greater than or equal to 2010)
  if (formData.metricAcademicDetailsYearOfPassing < 2010) {
    errors.metricAcademicDetailsYearOfPassing = "10th year of passing must be 2010 or later";
  }

  if (formData.intermediateAcademicDetailsYearOfPassing < 2010) {
    errors.intermediateAcademicDetailsYearOfPassing = "12th year of passing must be 2010 or later";
  }

    // Validate NEET score (1 to 720)
    if (formData.neetScore < 1 || formData.neetScore > 720) {
      errors.neetScore = "NEET score must be between 1 and 720";
    }

    // Validate age (DOB greater than 16 years)
    const birthDate = new Date(formData.dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 16) {
      errors.dob = "Age must be greater than 16";
    }

    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault(); // Call preventDefault to prevent form from reloading the page
  
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      // Display validation errors using message alerts from antd
      Object.values(errors).forEach((error) => message.error(error));
    } else {
      // Call the actual submit handler passed as a prop
      handleUserDetailsSubmit(e);
      message.success("Form submitted successfully");
    }
  };
  

  return (
    <div className="flex flex-col p-6 rounded-xl shadow-md">
      <h4 className="text-lg font-semibold mb-4 text-[#097F78]">
        Personal Information
      </h4>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
          <InputField
            label="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            required={true}
            error={formErrors.firstName}
          />
          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            required={true}
            error={formErrors.lastName}
          />
          <InputField
            label="NEET Roll Number"
            name="neetRollNumber"
            type="number"
            value={formData.neetRollNumber}
            onChange={handleChange}
            required={true}
            error={formErrors.neetRollNumber}
          />
          <InputField
            label="Father's Name"
            name="fatherName"
            type="text"
            value={formData.fatherName}
            onChange={handleChange}
            required={true}
          />
          <InputField
            label="Mother's Name"
            name="motherName"
            type="text"
            value={formData.motherName}
            onChange={handleChange}
            required={true}
          />
          <InputField
            label="NEET Application Number"
            name="neetApplicationNumber"
            type="number"
            value={formData.neetApplicationNumber}
            onChange={handleChange}
            required={true}
            error={formErrors.neetApplicationNumber}
          />
          <InputField
            label="DOB"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            required={true}
            error={formErrors.dob}
          />
          <SelectField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={["Male", "Female", "Other"]}
            required={true}
          />
          <SelectField
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            options={["Indian", "Other"]}
            required={true}
          />
          <SelectField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={["OBC", "General", "SC/ST"]}
            required={true}
          />
          <SelectField
            label="PwD"
            name="pwd"
            value={formData.pwd}
            onChange={handleChange}
            options={["Yes", "No"]}
            required={true}
          />
        </div>

        {/* Contact Information Section */}
        <div className="p-6 rounded-xl shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-[#097F78]">
            Contact Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Mobile Number (Primary)"
              name="mobilePrimary"
              type="tel"
              value={formData.mobilePrimary}
              onChange={handleChange}
              required={true}
              error={formErrors.mobilePrimary}
            />
            <InputField
              label="Mobile Number (Secondary)"
              name="mobileSecondary"
              type="tel"
              value={formData.mobileSecondary}
              onChange={handleChange}
            />
            <InputField
              label="Email ID (Primary)"
              name="emailPrimary"
              type="email"
              value={formData.emailPrimary}
              onChange={handleChange}
              required={true}
              error={formErrors.emailPrimary}
            />
            <InputField
              label="Email ID (Secondary)"
              name="emailSecondary"
              type="email"
              value={formData.emailSecondary}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Permanent Address Section */}
        <div className="p-6 rounded-xl shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-[#097F78]">
            Permanent Address
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Address Line 1" 
              name="permanentAddressStreet"
              type="text"
              value={formData.permanentAddressStreet}
              onChange={handleChange}
              required={true}
            />
            <InputField
              label="City"
              name="permanentAddressCity"
              type="text"
              value={formData.permanentAddressCity}
              onChange={handleChange}
              required={true}
            />
            <SelectField
            label="State"
            name="permanentAddressState"
            value={formData.permanentAddressState}
            onChange={handleChange}
            options={indianStates}
            required={true}
            error={formErrors.permanentAddressState}
          />
            <InputField
              label="Pin Code"
              name="permanentAddressPostalCode"
              type="number"
              value={formData.permanentAddressPostalCode}
              onChange={handleChange}
              required={true}
            />
          </div>
        </div>

        {/* Correspondence Address Section */}
        <div className="p-6 rounded-xl shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-[#097F78]">
            Correspondence Address
          </h4>
          <div className="flex justify-end mb-2">
            <label className="text-sm mr-2">Same as Permanent Address</label>
            <input
              type="checkbox"
              onChange={handleSameAddressChange}
              checked={isSameAddress}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Address Line 1"
              name="correspondenceAddressStreet"
              type="text"
              value={formData.correspondenceAddressStreet}
              onChange={handleChange}
              disabled={isSameAddress}
            />
            <InputField
              label="City"
              name="correspondenceAddressCity"
              type="text"
              value={formData.correspondenceAddressCity}
              onChange={handleChange}
              disabled={isSameAddress}
            />
            {/* <InputField
              label="State"
              name="correspondenceAddressState"
              type="text"
              value={formData.correspondenceAddressState}
              onChange={handleChange}
              disabled={isSameAddress}
            /> */}
            <SelectField
            label="State"
            name="correspondenceAddressState"
            value={formData.correspondenceAddressState}
            onChange={handleChange}
            options={indianStates}
            disabled={isSameAddress}
            required={true}
            error={formErrors.correspondenceAddressState}
          />
            <InputField
              label="Pin Code"
              name="correspondenceAddressPostalCode"
              type="number"
              value={formData.correspondenceAddressPostalCode}
              onChange={handleChange}
              disabled={isSameAddress}
            />
          </div>
        </div>
        {/* NEET Examination Details Section */}
        <div className="p-6 rounded-xl shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-[#097F78]">
            NEET 2025 Examination Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="NEET Rank"
              name="neetRank"
              type="number"
              value={formData.neetRank}
              onChange={handleChange}
              required={true}
            />
            <InputField
              label="NEET Score"
              name="neetScore"
              type="number"
              value={formData.neetScore}
              onChange={handleChange}
              required={true}
            />
            <InputField
              label="Percentile"
              name="neetPercentile"
              type="number"
              value={formData.neetPercentile}
              onChange={handleChange}
              required={true}
              error={formErrors.neetPercentile}
            />
          </div>
        </div>

        {/* Academic Details Section */}
        <div className="p-6 rounded-xl shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-[#097F78]">
            Academic Details
          </h4>
          <h5 className="font-semibold text-sm mb-2 text-[#097F78]">
            Class 10th Details
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField
              label="Board"
              name="metricAcademicDetailsBoardName"
              value={formData.metricAcademicDetailsBoardName}
              type="text"
              onChange={handleChange}
              options={["CBSE", "ICSE", "State Board"]}
              required={true}
            />
            <InputField
              label="Year of Passing"
              name="metricAcademicDetailsYearOfPassing"
              type="number"
              value={formData.metricAcademicDetailsYearOfPassing}
              onChange={handleChange}
              required={true}
              error={formErrors.metricAcademicDetailsYearOfPassing}
            />
            <InputField
              label="Percentage / CGPA"
              name="metricAcademicDetailsPercentage"
              type="number"
              value={formData.metricAcademicDetailsPercentage}
              onChange={handleChange}
              required={true}
              error={formErrors.metricAcademicDetailsPercentage}
            />
          </div>

          <h5 className="font-semibold text-sm mt-6 mb-2 text-[#097F78]">
            Class 12th Details
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField
              label="Board"
              name="intermediateAcademicDetailsBoardName"
              value={formData.intermediateAcademicDetailsBoardName}
              type="text"
              onChange={handleChange}
              options={["CBSE", "ICSE", "State Board"]}
              required={true}
              error={formErrors.intermediateAcademicDetailsBoardName}
            />
            <InputField
              label="Year of Passing"
              name="intermediateAcademicDetailsYearOfPassing"
              type="number"
              value={formData.intermediateAcademicDetailsYearOfPassing}
              onChange={handleChange}
              required={true}
              error={formErrors.intermediateAcademicDetailsYearOfPassing}
            />
            <InputField
              label="Percentage / CGPA"
              name="intermediateAcademicDetailsPercentage"
              type="number"
              value={formData.intermediateAcademicDetailsPercentage}
              onChange={handleChange}
              required={true}
              error={formErrors.intermediateAcademicDetailsPercentage} 
            />
            <SelectField
              label="Subjects Studied"
              name="class12Subjects"
              value={formData.class12Subjects}
              onChange={handleChange}
              options={["Physics", "Chemistry", "Biology", "Mathematics"]}
              required={true}
            />
          </div>
        </div>

        {/* Reservation Details Section */}
        <div className="p-6 rounded-xl shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-[#097F78]">
            Reservation Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Allotted Quota"
              name="allottedQuota"
              value={formData.allottedQuota}
              onChange={handleChange}
              options={["State Quota", "All India Quota"]}
              required={true}
            />
            <SelectField
              label="Sub-Category"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              options={["General", "SC", "ST", "OBC", "EWS"]}
              required={true}
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <Button
            type="primary"
            className="bg-[#FF9245] px-4 py-2 rounded-3xl text-white font-medium text-sm hover:bg-orange-600 transition"
            htmlType="submit"
          >
            Submit Details
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FillYourDetails;



