import React from "react";
import Header from "../components/Header";

function Contact() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-16">
        <div className="max-w-6xl w-full grid md:grid-cols-2 bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Left Image Section */}
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              alt="books"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Contact Form */}
          <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Contact Us
            </h2>

            <p className="text-gray-500 mb-8">
              Have questions about our bookstore? Send us a message and we’ll
              respond as soon as possible.
            </p>

            <form className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 mb-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
