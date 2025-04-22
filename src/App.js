import { motion } from "framer-motion";
import { CheckCircle, Users, Mail } from "lucide-react";

export default function AgentFlowLandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-900 p-6 md:p-12 flex flex-col items-center">
      <motion.section
        className="w-full max-w-5xl text-center mb-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl font-extrabold mb-4 tracking-tight">AgentFlow</h1>
        <p className="text-2xl text-gray-600 font-medium">
          Your AI Assistant for Real Estate — No Tech Skills Needed
        </p>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          AgentFlow builds smart, custom AI tools for real estate agents. We help you write listings, create content, and respond to clients faster — without lifting a finger.
        </p>
        <a href="#get-started" className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition">
          Get Started
        </a>
      </motion.section>

      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">What You Get</h2>
          <ul className="space-y-4 text-left text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-blue-600 mt-1" /> Custom-trained GPT assistant
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-blue-600 mt-1" /> Listing + caption generators
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-blue-600 mt-1" /> Social + email content packs monthly
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-blue-600 mt-1" /> Done-for-you setup, async delivery
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-blue-600 mt-1" /> Time-saving tools you’ll actually use
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Who It’s For</h2>
          <ul className="space-y-4 text-left text-gray-700">
            <li className="flex items-start gap-3">
              <Users className="text-blue-600 mt-1" /> Solo agents juggling 50 things a day
            </li>
            <li className="flex items-start gap-3">
              <Users className="text-blue-600 mt-1" /> Teams who need systems, not extra hires
            </li>
            <li className="flex items-start gap-3">
              <Users className="text-blue-600 mt-1" /> Anyone tired of writing the same content over and over
            </li>
          </ul>
        </motion.div>
      </section>

      <motion.section
        id="get-started"
        className="w-full max-w-xl text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4">Start With a Free Demo</h2>
        <p className="text-lg text-gray-600 mb-6">
          We’ll show you how AgentFlow works in under 10 minutes. No pressure, just magic.
        </p>
        <a href="mailto:hello@agentflow.ai" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition">
          <Mail size={20} /> Book a Free Demo
        </a>
      </motion.section>

      <footer className="mt-32 text-center text-gray-400 text-sm">
        © 2025 AgentFlow. Built by Mo & Tantan with 🖤
      </footer>
    </main>
  );
}
