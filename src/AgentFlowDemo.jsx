import { useState } from "react";

export default function AgentFlowDemo() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  async function generateCopy() {
    if (!input.trim()) return;

    setLoading(true);
    setOutput(null);
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
              role: "system",
              content:
                "You are a real estate AI assistant. When given a short property description, return:\n\n1. Listing Description\n2. Instagram Caption\n3. Email Subject Line",
            },
            {
              role: "user",
              content: input,
            },
          ],
        }),
      });

      const data = await response.json();
      console.log("Backend GPT response:", data);

      if (data.error) {
        setError("AI error: " + (data.error.message || data.error));
      } else if (data?.content) {
        setOutput(data.content);
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

  return (
    <section className="w-full max-w-2xl text-center py-12">
      <h2 className="text-3xl font-bold mb-4">Try the AgentFlow Demo</h2>
      <p className="text-gray-600 mb-6">
        Describe a property and let AI write the listing, caption, and subject line.
      </p>

      <textarea
        rows={4}
        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none mb-4"
        placeholder="e.g. 3BR modern apartment in Tel Aviv with rooftop and sea views"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={generateCopy}
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
          "Generate"
        )}
      </button>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 shadow">
          ⚠️ {error}
        </div>
      )}

      {output && (
        <div className="text-left bg-white p-6 rounded-xl shadow-md space-y-4 text-gray-800 whitespace-pre-wrap">
          {output}
        </div>
      )}
    </section>
  );
}
