// import logo from "/Plagarism-Guard.svg"
import { useState } from "react";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import brushIcon from "/brush.svg";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url,
).toString();

const supportedFileTypes = [
  ".txt",
  ".md",
  ".csv",
  ".json",
  ".html",
  ".htm",
  ".xml",
  ".rtf",
  ".log",
  ".yaml",
  ".yml",
  ".pdf",
  ".docx",
];

const emptyResults = {
  plagiarism_percentage: 0,
  ai_generated_likelihood: 0,
  writing_quality: 0,
  readability: 0,
  sources_attribution: 0,
  citations: 0,
  feedback: "",
};

const normalizeScanResults = (data) => {
  const response = Array.isArray(data) ? data[0] : data;
  const output = response?.output ?? response ?? {};

  return {
    plagiarism_percentage: output.plagiarism_percentage ?? 0,
    ai_generated_likelihood: output.ai_generated_likelihood ?? 0,
    writing_quality: output.writing_quality ?? 0,
    readability: output.readability ?? 0,
    sources_attribution: output.sources_attribution ?? 0,
    citations: output.citations ?? 0,
    feedback: output.feedback ?? "",
  };
};

function App() {
  const [activeTab, setActiveTab] = useState("result");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [text, setText] = useState("");
  const [results, setResults] = useState(emptyResults);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [scanWarning, setScanWarning] = useState("");

  const extractPdfText = async (file) => {
    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(await file.arrayBuffer()),
    }).promise;
    const pageTexts = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      pageTexts.push(content.items.map((item) => item.str).join(" "));
    }

    return pageTexts.join("\n\n");
  };

  const extractFileText = async (file) => {
    const extension = `.${file.name.split(".").pop().toLowerCase()}`;
    const isPlainTextFile = file.type.startsWith("text/");

    if (!supportedFileTypes.includes(extension) && !isPlainTextFile) {
      throw new Error(
        "Please choose a TXT, MD, CSV, JSON, PDF, DOCX, or other text file.",
      );
    }

    if (extension === ".pdf") {
      return extractPdfText(file);
    }

    if (extension === ".docx") {
      const result = await mammoth.extractRawText({
        arrayBuffer: await file.arrayBuffer(),
      });
      return result.value;
    }

    return file.text();
  };

  const handleFileChange = async (event) => {
    const [file] = event.target.files;
    event.target.value = "";

    if (!file) return;

    setFileError("");
    setScanWarning("");

    try {
      const extractedText = await extractFileText(file);

      if (!extractedText.trim()) {
        throw new Error("This file does not contain readable text.");
      }

      setText(extractedText);
    } catch (error) {
      setFileError(error.message || "The file could not be read.");
    }
  };

  const handleClear = () => {
    setText("");
    setFileError("");
    setScanWarning("");
  };

  const handleScan = async () => {
    if (!text.trim()) {
      setScanWarning("Enter an essay before starting the scan.");
      return;
    }

    setScanWarning("");

    setLoading(true);
    const scanStartedAt = Date.now();

    try {
      const scanEndpoint = import.meta.env.DEV
        ? "/api/plagiarism-scan"
        : "https://preface-wildness-elves.ngrok-free.dev/webhook-test/plagiarism-scan";
      const response = await fetch(scanEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`Scan request failed with status ${response.status}.`);
      }

      const data = await response.json();
      setResults(normalizeScanResults(data));
    } catch (error) {
      console.error("Scan request failed:", error);
      setResults(emptyResults);
    } finally {
      const remainingAnimationTime = Math.max(
        0,
        3000 - (Date.now() - scanStartedAt),
      );
      await new Promise((resolve) =>
        setTimeout(resolve, remainingAnimationTime),
      );
      setLoading(false);
    }
  };
  return (
    <div className={`min-h-screen main ${isDarkMode ? "dark" : ""}`}>
      {loading && (
        <div className="scan-overlay" role="status" aria-live="polite">
          <div className="scan-loader">
            <span className="scan-ring scan-ring-one" />
            <span className="scan-ring scan-ring-two" />
            <span className="scan-line" />
            <svg
              className="scan-logo"
              width="84"
              height="100"
              viewBox="0 0 42 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="20" cy="20" r="20" fill="#3F59FF" />
              <path
                d="M8.3 47.7L7.45 13.55L5 13.9L4 9.5C4.93333 9.3 6.16667 9.1 7.7 8.9C9.26667 8.66666 10.9667 8.45 12.8 8.25C14.6333 8.01666 16.4333 7.83333 18.2 7.7C19.9667 7.56667 21.5333 7.5 22.9 7.5C25.4333 7.5 27.7667 8.01667 29.9 9.05C32.0333 10.0833 33.75 11.5333 35.05 13.4C36.35 15.2667 37 17.4333 37 19.9C37 22.9333 36.35 25.4667 35.05 27.5C33.75 29.5 32.0167 31 29.85 32C27.7167 33 25.3333 33.5 22.7 33.5C21.6 33.5 20.35 33.3667 18.95 33.1C17.55 32.8333 16.0667 32.35 14.5 31.65V47L8.3 47.7ZM14.5 26.9C15.2333 27.1667 16.05 27.4167 16.95 27.65C17.85 27.85 18.7167 28 19.55 28.1C20.4167 28.2 21.1 28.25 21.6 28.25C24.0333 28.25 26.0333 27.6 27.6 26.3C29.2 24.9667 30 22.9333 30 20.2C30 18.6667 29.6333 17.35 28.9 16.25C28.1667 15.15 27.2167 14.3 26.05 13.7C24.8833 13.1 23.65 12.8 22.35 12.8C21.1833 12.8 19.8833 12.8167 18.45 12.85C17.0167 12.85 15.7 12.9 14.5 13V26.9Z"
                fill="white"
              />
            </svg>
            <p className="scan-label">Analyzing your text</p>
          </div>
        </div>
      )}
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50 theme-nav">
        <div className="container mx-auto px-12 py-2 flex justify-center md:justify-between items-center">
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
          <div className="hidden md:flex space-x-8 items-center">
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
          <button
            type="button"
            aria-label={
              isDarkMode ? "Switch to light theme" : "Switch to dark theme"
            }
            aria-pressed={isDarkMode}
            className={`theme-toggle ${isDarkMode ? "is-dark" : ""}`}
            onClick={() => setIsDarkMode((currentMode) => !currentMode)}
          >
            <span className="theme-toggle-thumb">
              <svg className="sun-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="3.5" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
              </svg>
              <svg className="moon-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z" />
              </svg>
            </span>
          </button>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="pt-28 pb-16 px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Textarea and Buttons Section */}
          <div className="w-full">
            <textarea
              value={text} // Add this
              onChange={(e) => {
                setText(e.target.value);
                setScanWarning("");
              }}
              className="w-full placeholder:text-xl h-[450px] p-4 border rounded-lg shadow-[rgba(6,_24,_44,_0.2)_0px_0px_0px_1px,_rgba(6,_24,_44,_0.3)_0px_2px_4px_-1px,_rgba(255,_255,_255,_0.05)_0px_1px_0px_inset] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter your text here..."
            />
            {scanWarning && (
              <p className="scan-warning" role="alert">
                {scanWarning}
              </p>
            )}
            <div className="mt-4 flex items-center space-x-4">
              {/* Button 1 */}
              <div className="rounded-full shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                <label
                  htmlFor="file-upload"
                  className="editor-icon-button p-2 rounded-full border hover:bg-gray-200"
                  title="Upload a text document"
                >
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
                  <input
                    type="file"
                    id="file-upload"
                    accept={["text/*", ...supportedFileTypes].join(",")}
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* Button 2 */}
              <div className="rounded-full shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                <button
                  type="button"
                  aria-label="Clear text with brush"
                  title="Clear text"
                  onClick={handleClear}
                  className="editor-icon-button p-2 rounded-full border hover:bg-gray-200"
                >
                  <img src={brushIcon} alt="Brush" width="24" height="24" />
                </button>
              </div>

              {/* Scan Button */}
              <button
                type="button"
                onClick={handleScan} // Add this
                disabled={loading} // Add this
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
              >
                {loading ? "Scanning..." : "Scan"}
              </button>
            </div>
            {fileError && <p className="file-error">{fileError}</p>}
          </div>

          {/* Result and Feedback Section */}
          <div className="bg-white h-[450px] box-border p-6 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] theme-panel">
            {/* Tab Buttons */}
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 text-gray-700 font-medium rounded-lg border-2  hover:text-blue-600 cursor-pointer ${
                  activeTab === "result" ? "text-blue-600 bg-slate-100" : ""
                }`}
                onClick={() => setActiveTab("result")}
              >
                Result
              </button>
              <button
                className={`px-4 py-2 text-gray-700 font-medium rounded-lg border-2 hover:text-blue-600 cursor-pointer ${
                  activeTab === "feedback" ? "text-blue-600 bg-slate-100" : ""
                }`}
                onClick={() => setActiveTab("feedback")}
              >
                Feedback
              </button>
            </div>

            {/* Results section */}
            {activeTab === "result" ? (
              <div>
                <div className="flex justify-center items-center mb-5">
                  <div className="relative w-32 h-32">
                    <div className="text-center">
                      <span className="text-5xl font-bold">
                        {results.plagiarism_percentage + "%"}
                      </span>
                      <p className="text-gray-500 mt-4">Plagiarism Score</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    This score reflects the uniqueness of your text. Improve it
                    by addressing flagged content.
                  </div>

                  <div className="space-y-5 flex-col justify-center w-full">
                    <div className="flex justify-between items-center">
                      <span>AI-Generated Likelihood</span>
                      <span>{results.ai_generated_likelihood || "0"}/100%</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Writing Quality</span>
                      <span>{results.writing_quality}/100%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Readability</span>
                      <span>{results.readability}/100%</span>
                    </div>
                    <div className="flex justify-between items-center pr-3.5">
                      <span>Citations</span>
                      <span>{results.citations}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <h2 className="text-2xl font-semibold md:mb-5">
                  Here is some feedback:
                </h2>
                <p
                  className={`text-center text-lg ${
                    results.feedback?.trim()
                      ? "feedback-text"
                      : "text-gray-600"
                  }`}
                >
                  {results.feedback ||
                    "No feedback available yet. Scan your text to get detailed feedback."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 bg-white theme-section">
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
                Whether you are a professor verifying submissions or a student
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
      <section id="contact" className="py-16 bg-gray-50 theme-contact">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
            Contact Us
          </h2>
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
            </form>
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
              Send Message
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
