"use client"

import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"

export default function Component() {
  // Model data with full HuggingFace names and links
  const modelData = [
    {
      name: "mistralai/Mistral-7B-Instruct-v0.2",
      displayName: "Mistral-7B-Instruct-v0.2",
      score: 3.17,
      link: "https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2",
      description: "Instruction-tuned Mistral 7B model",
    },
    {
      name: "meta-llama/Llama-3.1-8B-Instruct",
      displayName: "Llama-3.1-8B-Instruct",
      score: 3.07,
      link: "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct",
      description: "Instruction-tuned LLaMA 3.1 (8B)",
    },
    {
      name: "openchat/openchat-3.5-1210",
      displayName: "openchat-3.5-1210",
      score: 2.97,
      link: "https://huggingface.co/openchat/openchat-3.5-1210",
      description: "Strong 7B conversational model",
    },
    {
      name: "Fine-tuned Model",
      displayName: "Fine-tuned",
      score: 2.9,
      link: "#",
      description: "Custom fine-tuned model",
    },
    {
      name: "google/gemma-7b",
      displayName: "gemma-7b",
      score: 2.41,
      link: "https://huggingface.co/google/gemma-7b",
      description: "Official 7B model from Google's Gemma family",
    },
  ]

  const maxScore = 5.0

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-pink-400 rounded-full relative">
                <div className="absolute inset-1 bg-pink-300 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">VetLLM Leaderboard</h1>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            VetLLM evaluates LLMs with veterinary and medical programming tasks.
          </p>
        </div>

        {/* Navigation Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <Badge variant="secondary" className="bg-black text-white hover:bg-gray-800">
            <Github className="w-4 h-4 mr-1" />
            GITHUB
          </Badge>
          <Badge variant="secondary" className="bg-gray-600 text-white">
            🤗 HUGGINGFACE
          </Badge>
        </div>

        {/* Chart Area */}
        <div className="bg-white border rounded-lg p-8 min-h-[500px] relative mb-8">
          {/* Y-axis label */}
          <div className="absolute left-4 top-1/2 -rotate-90 transform -translate-y-1/2 text-sm text-gray-600 whitespace-nowrap">
            Average Quality Score
          </div>

          {/* Y-axis values */}
          <div className="absolute left-12 top-12 bottom-20 flex flex-col justify-between text-sm text-gray-600">
            <span>5</span>
            <span>4</span>
            <span>3</span>
            <span>2</span>
            <span>1</span>
            <span>0</span>
          </div>

          {/* Chart content area */}
          <div className="ml-20 mr-8 mt-8 mb-20 h-96 bg-white border-l-2 border-b-2 border-gray-400 relative">
            {/* Grid lines */}
            {[1, 2, 3, 4, 5].map((value) => (
              <div
                key={value}
                className="absolute w-full border-t border-gray-300"
                style={{ bottom: `${(value / maxScore) * 100}%` }}
              ></div>
            ))}

            {/* Model bars */}
            <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-around px-8">
              {modelData.map((model, index) => {
                const barHeight = (model.score / maxScore) * 100
                const isHighPerformer = model.score >= 3.0

                return (
                  <div key={model.name} className="flex flex-col items-center h-full justify-end">
                    {/* Score label above bar */}
                    <div className="text-sm font-bold text-gray-800 mb-2">{model.score}</div>

                    {/* ACTUAL VISIBLE BAR */}
                    <div
                      className={`w-16 ${isHighPerformer ? "bg-orange-400" : "bg-red-400"} border border-gray-600`}
                      style={{
                        height: `${barHeight}%`,
                        backgroundImage: `repeating-linear-gradient(
                          45deg,
                          rgba(0,0,0,0.15) 0px,
                          rgba(0,0,0,0.15) 4px,
                          transparent 4px,
                          transparent 8px
                        )`,
                      }}
                    ></div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* X-axis labels (rotated) */}
          <div className="absolute bottom-4 left-20 right-8 flex justify-around">
            {modelData.map((model) => (
              <div
                key={model.name}
                className="text-sm text-gray-700 transform -rotate-45 origin-bottom-left"
                style={{ width: "120px", textAlign: "left" }}
              >
                {model.displayName}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pass@1
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {modelData.map((model, index) => (
                <tr key={model.name} className={index % 2 === 0 ? "bg-orange-50" : "bg-white"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-2">🧠</span>
                      {model.link !== "#" ? (
                        <a
                          href={model.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline flex items-center"
                        >
                          {model.name}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      ) : (
                        <span className="text-gray-900">{model.name}</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{model.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                    {model.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
