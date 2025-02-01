// import logo from "/Plagarism-Guard.svg"
import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("result");
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-12 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-4 pt-2">
              <svg
                width="42"
                height="50"
                viewBox="0 0 42 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20" r="20" fill="#3F59FF" />
                <path
                  d="M8.3 47.7L7.45 13.55L5 13.9L4 9.5C4.93333 9.3 6.16667 9.1 7.7 8.9C9.26667 8.66666 10.9667 8.45 12.8 8.25C14.6333 8.01666 16.4333 7.83333 18.2 7.7C19.9667 7.56667 21.5333 7.5 22.9 7.5C25.4333 7.5 27.7667 8.01666 29.9 9.05C32.0333 10.0833 33.75 11.5333 35.05 13.4C36.35 15.2667 37 17.4333 37 19.9C37 22.9333 36.35 25.4667 35.05 27.5C33.75 29.5 32.0167 31 29.85 32C27.7167 33 25.3333 33.5 22.7 33.5C21.6 33.5 20.35 33.3667 18.95 33.1C17.55 32.8333 16.0667 32.35 14.5 31.65V47L8.3 47.7ZM14.5 26.9C15.2333 27.1667 16.05 27.4167 16.95 27.65C17.85 27.85 18.7167 28 19.55 28.1C20.4167 28.2 21.1 28.25 21.6 28.25C24.0333 28.25 26.0333 27.6 27.6 26.3C29.2 24.9667 30 22.9333 30 20.2C30 18.6667 29.6333 17.35 28.9 16.25C28.1667 15.15 27.2167 14.3 26.05 13.7C24.8833 13.1 23.65 12.8 22.35 12.8C21.1833 12.8 19.8833 12.8167 18.45 12.85C17.0167 12.85 15.7 12.9 14.5 13V26.9Z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-blue-600 cursor-pointer relative group">
              Plagiarism Guard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </span>
          </div>
          <div className="flex space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-600 relative group transition-colors duration-300"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 relative group transition-colors duration-300"
            >
              About
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 relative group transition-colors duration-300"
            >
              Contact Us
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </a>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="pt-28 pb-16 px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full">
            <textarea
              className="w-full h-[500px] p-4 border rounded-lg shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none "
              placeholder="Enter your text here..."
            />
            <div className="mt-4 flex items-center space-x-4 ">
              <button className="p-2 rounded-full border hover:bg-gray-300 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-full border hover:bg-gray-300 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                Scan
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 text-gray-700 font-medium rounded-lg hover:text-blue-600  cursor-pointer ${
                  activeTab === "result" ? "text-blue-600  bg-slate-200" : ""
                }`}
                onClick={() => setActiveTab("result")}
              >
                Result
              </button>
              <button
                className={`px-4 py-2 text-gray-700 font-medium rounded-lg hover:text-blue-600  cursor-pointer ${
                  activeTab === "feedback" ? "text-blue-600 bg-slate-200 " : ""
                }`}
                onClick={() => setActiveTab("feedback")}
              >
                Feedback
              </button>
            </div>

            <div className="flex justify-center items-center mb-6">
              <div className="relative w-32 h-32">
                <div className="text-center">
                  <span className="text-5xl font-bold">0</span>
                  <p className="text-sm text-gray-500">Plagiarized</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                This score reflects the uniqueness of your text. Improve it by
                addressing flagged content
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>AI Generated</span>
                  <span>0/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sources attribution</span>
                  <span>0/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Similar Words</span>
                  <span>0/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Citations</span>
                  <span>0/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">
            About The Project
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 space-y-6 animate-fade-in">
              <h3 className="text-2xl font-semibold text-gray-800 relative">
                Advanced Plagiarism Detection
                <span className="absolute -left-4 top-0 w-1 h-full bg-blue-500"></span>
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Plagiarism Guard is an AI-powered tool designed to help
                educators and students maintain academic integrity. It provides
                real-time analysis, cross-language checking, and detailed
                feedback to ensure originality in content.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                For professors, the platform detects sophisticated plagiarism,
                including translations and paraphrasing, streamlining the
                grading process while upholding academic standards. Students
                benefit from real-time feedback, improving writing habits and
                learning proper citation practices.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you're a professor verifying submissions or a student
                aiming to improve, Plagiarism Guard offers the tools and support
                to achieve academic integrity and excellence.
              </p>
              <div className="pt-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                  Learn More
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <img
                src="/stock.jpg"
                alt="Plagiarism Detection Illustration"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <div className="max-w-md mx-auto">
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-3 border rounded-lg h-32"
              />
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
