
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";


function App() {
  const [transcript, setTranscript] = useState("");
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [recipients, setRecipients] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => setTranscript(event.target.result);
    reader.readAsText(file);
  };



const handleSummarize = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/summarize", {
      transcript,
      prompt,
    });

    if (res.data.success) {
      setSummary(res.data.summary);
      toast.success(res.data.message);
    } else {
      toast.error("❌ Failed to generate summary.");
    }
  } catch (err) {
    console.error("Error summarizing:", err);
    toast.error.message
  }
};

const handleSendEmail = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/send-email", {
      summary,
      recipients,
    });

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error("❌ Failed to send email.");
    }
  } catch (err) {
    console.error("Error sending email:", err);
    toast.error("⚠️ Server error while sending email.");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white shadow-xl rounded-xl">
        <h2 className="mb-4 text-2xl font-bold text-center">AI Meeting Notes Summarizer</h2>

        {/* File Upload */}
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="w-full p-2 mb-4 border rounded-lg"
        />

        {/* Transcript */}
        <textarea
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Paste transcript here"
          rows="5"
          value={transcript}
          onChange={e => setTranscript(e.target.value)}
        />

        {/* Prompt */}
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Enter custom instruction"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />

        <button
          onClick={handleSummarize}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Generate Summary
        </button>

        {/* Summary */}
        <textarea
          className="w-full p-2 mt-4 border rounded-lg"
          rows="6"
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />

        {/* Email */}
        <input
          type="text"
          className="w-full p-2 mt-4 border rounded-lg"
          placeholder="Enter recipient emails (comma separated)"
          value={recipients}
          onChange={e => setRecipients(e.target.value)}
        />

        <button
          onClick={handleSendEmail}
          className="w-full px-4 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Send via Email
        </button>
      </div>
    </div>
  );
}

export default App;
