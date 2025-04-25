import { useState } from "react";

export default function AgentFlowDemo() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [outputs, setOutputs] = useState({
    listing: "",
    caption: "",
    subject: "",
  });

  async function fetchAIResult(customInput = input, targetField = null) {
    if (!customInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://agentflow1-production.up.railway.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: customInput,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError("AI error: " + (data.error.message || data.error));
      } else if (data?.content) {
        const parsed = JSON.parse(data.content); // assumes GPT returns JSON
        setOutputs((prev) => ({
          ...prev,
          ...(targetField
            ? { [targetField]: parsed[targetField] }
            : parsed),
        }));
      } else {
        setError("Unexpected AI response.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  }

  const handleRegenerate = (field) => {
    fetchAIResult(input, field);
  };

  return (
    <section className="w-full max-w-2xl text-center py-12">
      <h2 className="text-3xl font-bold mb-4">Try the AgentFlow Demo</h2>
      <p className="text-gray-600 mb-6">
        Describe a property and let AI generate editable content for you.
      </p>

      <textarea
        rows={4}
        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none mb-4"
        placeholder="e.g. 3BR modern apartment in Tel Aviv with rooftop and sea views"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={() => fetchAIResult()}
        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition mb-6 flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              />
            </svg>
            Generating...
          </>
        ) : (
          "Generate All"
        )}
      </button>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 shadow">
          ⚠️ {error}
        </div>
      )}

      {["listing", "caption", "subject"].map((field) => (
        <div key={field} className="mb-6 text-left">
          <label className="block font-semibold capitalize mb-1">
            {field === "caption" ? "Instagram Caption" : field === "subject" ? "Email Subject Line" : "Listing Description"}
          </label>
          <textarea
            rows={field === "listing" ? 5 : 2}
            className="w-full p-4 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            value={outputs[field]}
            onChange={(e) =>
              setOutputs((prev) => ({ ...prev, [field]: e.target.value }))
            }
          />
          <button
            onClick={() => handleRegenerate(field)}
            className="mt-2 text-sm text-blue-600 hover:underline"
            disabled={loading}
          >
            Regenerate
          </button>
        </div>
      ))}
    </section>
  );
}
