import React, { useState } from "react";
import jsPDF from "jspdf";

const RFPApplication: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    contactEmail: "",
    projectDescription: "",
    budget: "",
    deadline: "",
  });

  const [errors, setErrors] = useState({
    contactEmail: "",
    budget: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Basic validation
    if (name === "contactEmail") {
      setErrors({
        ...errors,
        contactEmail: /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email format",
      });
    }
    if (name === "budget") {
      setErrors({
        ...errors,
        budget: /^\d+(\.\d{1,2})?$/.test(value) ? "" : "Invalid budget format",
      });
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("RFP Application", 10, 10);
    Object.entries(formData).forEach(([key, value], index) => {
      doc.text(`${key}: ${value}`, 10, 20 + index * 10);
    });
    doc.save("RFP_Application.pdf");
  };

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  return (
    <div className="bg-mybrown rounded-lg text-left w-full">
      <h2 className="text-myoffwhite mb-6 font-[Montserrat] font-bold text-center text-2xl">
        Request for Proposal Application
      </h2>
      <div className="bg-mylightgray rounded-lg">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 pr-4">
            <label className="block font-bold text-myoffwhite text-lg mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="mb-4 p-3 rounded w-full text-lg"
            />
            <label className="block font-bold text-myoffwhite text-lg mb-2">
              Contact Name
            </label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="mb-4 p-3 rounded w-full text-lg"
            />
            <label className="block font-bold text-myoffwhite text-lg mb-2">
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="mb-4 p-3 rounded w-full text-lg"
            />
            {errors.contactEmail && (
              <span className="text-red-500">{errors.contactEmail}</span>
            )}
          </div>
          <div className="w-full md:w-1/2 pl-4">
            <label className="block font-bold text-myoffwhite text-lg mb-2">
              Project Description
            </label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              className="mb-4 p-3 rounded w-full h-40 text-lg"
            />
            <label className="block font-bold text-myoffwhite text-lg mb-2">
              Budget
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="mb-4 p-3 rounded w-full text-lg"
            />
            {errors.budget && (
              <span className="text-red-500">{errors.budget}</span>
            )}
            <label className="block font-bold text-myoffwhite text-lg mb-2">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="mb-4 p-3 rounded w-full text-lg"
            />
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={handleDownload}
            className={`bg-myoffwhite text-mybrown p-3 rounded text-lg font-bold transition ${
              !isFormValid
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-mydarkgray"
            }`}
            disabled={!isFormValid}
          >
            Download
          </button>
          <p className="text-myoffwhite mt-2 text-sm font-[Outfit]">
            *All fields are required before downloading.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RFPApplication;
