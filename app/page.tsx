"use client";
import React, { useState } from "react";

interface ClientInformation {
  FullName: string;
  DateOfBirth: string;
  Gender: string;
  DateOfAssessment: string;
  ReferralSource: string;
  NextSessionDateTime: string;
  SessionNumber: string;
}

interface DAPNote {
  Data: string;
  Assessment: string;
  Plan: string;
}

interface AssessmentData {
  ClientInformation: ClientInformation;
  DAPNote: DAPNote;
}

export default function DAPNoteGenerator() {
  // Define state for each input field
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    dateOfAssessment: "",
    referralSource: "",
    nextSessionDateTime: "",
    sessionNumber: "",
    data: "",
    assessment: "",
    plan: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(
    null
  ); // State for storing response

  // Handle input changes for all form fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch("/api/generate-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      const data = await response.json();
      setAssessmentData(data); // Store response data
      console.log("data", data);

      // Navigate to results page if needed
      // router.push("/assessment-results");
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl my-4 opacity-55 font-bold text-center text-white mb-4">
          DAP Note Generator
        </h1>
        <div className="bg-[#1B263B] shadow-lg rounded-lg p-10">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Information Section */}
            <div>
              <label className="block text-gray-300 opacity-55 font-semibold text-lg mb-4">
                Client Information
              </label>
              <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
                <div>
                  <label className="block text-gray-300 opacity-55 font-semibold">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-[#112B3C] text-white border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 opacity-55 font-semibold">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full bg-[#112B3C] text-white border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 opacity-55 font-semibold">
                    Gender:
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-[#112B3C] text-white border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 opacity-55 font-semibold">
                    Date of Assessment:
                  </label>
                  <input
                    type="date"
                    name="dateOfAssessment"
                    value={formData.dateOfAssessment}
                    onChange={handleChange}
                    className="w-full bg-[#112B3C] text-white border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-gray-300 opacity-55 font-semibold">
                    Referral Source:
                  </label>
                  <input
                    type="text"
                    name="referralSource"
                    placeholder="Referral Source"
                    value={formData.referralSource}
                    onChange={handleChange}
                    className="w-full bg-[#112B3C] text-white border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 opacity-55 font-semibold">
                    Next Session Date and Time:
                  </label>
                  <input
                    type="datetime-local"
                    name="nextSessionDateTime"
                    value={formData.nextSessionDateTime}
                    onChange={handleChange}
                    className="w-full bg-[#112B3C] text-white border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 opacity-55 font-semibold">
                    Session Number:
                  </label>
                  <input
                    type="number"
                    name="sessionNumber"
                    placeholder="Session Number"
                    value={formData.sessionNumber}
                    onChange={handleChange}
                    className="w-full bg-[#112B3C] text-white border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>
            </div>

            {/* DAP Sections */}
            <div className="space-y-4">
              <label className="block text-gray-300 opacity-55 font-semibold">
                Data:
              </label>
              <textarea
                name="data"
                placeholder="Enter data here..."
                value={formData.data}
                onChange={handleChange}
                className="w-full bg-[#112B3C] text-white border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              ></textarea>

              <label className="block text-gray-300 opacity-55 font-semibold">
                Assessment:
              </label>
              <textarea
                name="assessment"
                placeholder="Enter assessment here..."
                value={formData.assessment}
                onChange={handleChange}
                className="w-full bg-[#112B3C] text-white border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              ></textarea>

              <label className="block text-gray-300 opacity-55 font-semibold">
                Plan:
              </label>
              <textarea
                name="plan"
                placeholder="Enter plan here..."
                value={formData.plan}
                onChange={handleChange}
                className="w-full bg-[#112B3C] text-white border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-500 to-gray-500 text-white font-semibold py-3 rounded-md shadow-md hover:from-gray-500 hover:to-gray-500 transition duration-300"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Generating..." : "Generate DAP Note"}
            </button>
          </form>

          {assessmentData && (
            <div className="bg-[#1B263B] mt-10 shadow-lg rounded-lg  text-white">
              <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-600 py-3 text-center">
                Assessment Results
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold my-3">Client Information</h3>
                  <p className="mb-2">
                    <span className=" font-extrabold">Full Name:</span>{" "}
                    {assessmentData.ClientInformation.FullName}
                  </p>
                  <p className="mb-2">
                    <span className=" font-extrabold">Date of Birth: </span>
                    {assessmentData.ClientInformation.DateOfBirth}
                  </p>
                  <p className="mb-2">
                    <span className=" font-extrabold">Gender: </span>{" "}
                    {assessmentData.ClientInformation.Gender}
                  </p>
                  <p className="mb-2">
                    <span className=" font-extrabold">
                      Date of Assessment:{" "}
                    </span>
                    {assessmentData.ClientInformation.DateOfAssessment}
                  </p>
                  <p className="mb-2">
                    <span className=" font-extrabold">Referral Source: </span>{" "}
                    {assessmentData.ClientInformation.ReferralSource}
                  </p>
                  <p className="mb-2">
                    <span className=" font-extrabold">Next Session Date: </span>
                    {assessmentData.ClientInformation.NextSessionDateTime}
                  </p>
                  <p className="mb-2">
                    <span className=" font-extrabold">Session Number: </span>
                    {assessmentData.ClientInformation.SessionNumber}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold border-b-2 border-gray-600 py-3 mb-3">
                    DAP Note
                  </h3>
                  <p>
                    <strong className=" font-extrabold text-xl">Data:</strong>
                    <br /> {assessmentData.DAPNote.Data}
                  </p>
                  <p>
                    <strong className=" font-extrabold text-xl">
                      Assessment:
                    </strong>{" "}
                    <br />
                    {assessmentData.DAPNote.Assessment}
                  </p>
                  <p>
                    <strong className=" font-extrabold text-xl">Plan:</strong>{" "} <br />
                    {assessmentData.DAPNote.Plan}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
