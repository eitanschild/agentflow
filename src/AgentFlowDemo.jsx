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
      const response = await fetch("https://github.com/eitanschild/agentflow1.git", {
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
        setError("AI error: " + data.error.message);
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
        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition mb-6"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && (
        <p className="text-red-500 font-medium mb-4 whitespace-pre-wrap">{error}</p>
      )}

      {output && (
        <div className="text-left bg-white p-6 rounded-xl shadow-md space-y-4 text-gray-800 whitespace-pre-wrap">
          {output}
        </div>
      )}
    </section>
  );
}
