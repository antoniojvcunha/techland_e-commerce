import { Link } from "wouter";
import { useState } from "react";
import sendContactMessage from "../services/contactUsService";

function ContactUsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    city: "",
    topic: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendContactMessage(formData);
      setStatus("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        country: "",
        city: "",
        topic: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending contact message:", error);
      setStatus("Message sent successfully!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
          <div onSubmit={handleSubmit} className="relative mb-6">
            <input
              type="text"
              className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900  border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required=""
            ></input>
          </div>
          <div className="relative mb-6">
            <input
              type="text"
              className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900  border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required=""
            ></input>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
          <div className="relative mb-6">
            <input
              type="text"
              className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900  border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Country"
              required=""
            ></input>
          </div>
          <div className="relative mb-6">
            <input
              type="text"
              className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900  border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              required=""
            ></input>
          </div>
        </div>
        <div className="relative mb-6">
          <input
            type="text"
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900  border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            placeholder="Topic"
            required=""
          ></input>
        </div>
        <div className="relative mb-6">
          <textarea
            type="text"
            id="default-search"
            className="block w-full h-40 px-5 py-2.5 bg-white leading-7 resize-none text-base font-normal shadow-xs text-gray-900  border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none "
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message..."
            required=""
          ></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="py-2.5 px-6 text-base bg-red-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-300 hover:bg-red-800 w-fit"
          >
            Send Message
          </button>
        </div>
        {status && (
          <p className="text-center mt-4 text-sm text-gray-700">{status}</p>
        )}
      </form>
    </>
  );
}

export default ContactUsForm;
