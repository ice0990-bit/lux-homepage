'use client'

import { useState } from 'react'

export default function AIChat() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')

  const handleAsk = () => {
    if (!input.trim()) return
    // 模擬 AI 回答，可改成串接真實 API
    setResponse(`AI 回覆：「${input}」這個問題真是個好問題！`)
    setInput('')
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        🤖 AI 房產助理
      </h2>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="問我任何房產問題"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-base"
        />
        <button
          onClick={handleAsk}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          詢問 AI
        </button>
      </div>
      {response && (
        <div className="mt-4 text-gray-800">
          <p className="font-semibold">AI 回覆：</p>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}
