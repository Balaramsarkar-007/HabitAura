import React, { useState, useRef, useEffect } from 'react'
import { Send, Brain, UserRound } from 'lucide-react'
import axios from 'axios'
import MessageContent from './MessageContent'
import HabitSuggestionCard from './HabitSuggestionCard'
import {toast} from 'react-toastify'

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const SUGGESTION_CHIPS = [
  'What habits should I add?',
  'How can I improve my streaks?',
  'Analyze my patterns',
  'Give me motivation tips',
]

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: "Hello! I'm your AI-powered habit coach. I'm here to help you build better habits and improve your streaks. What would you like to explore?",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  isWelcome: true,
}

function AIChart() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    getChartHistory()
  }, [])

  const userMessageCount = messages.filter(m => m.role === 'user').length
  const showChips = userMessageCount === 0

  const getChartHistory = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/ai-chart/history`, { withCredentials: true })
      const history = response.data.history || []
      const formattedHistory = history.map(msg => ({
        id: msg._id,
        role: msg.role,
        content: msg.message,
        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }))
      setMessages(formattedHistory.length > 0 ? formattedHistory : [WELCOME_MESSAGE])
    } catch (error) {
      console.error("Error fetching chat history:", error)
    }
  }

  const handleSend = async (text) => {
    const messageText = (text || inputValue).trim()
    if (!messageText || isLoading) return
    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => prev.map(m => ({ ...m, isWelcome: false })).concat(userMsg))

    setIsLoading(true)

    try {
      const sendMessage = await axios.post(`${baseUrl}/api/ai-chart/suggestions`, { prompt: messageText }, { withCredentials: true })
      const aiReply = sendMessage.data.message
      setMessages(prev => [...prev, {
        id: aiReply._id,
        role: aiReply.role,
        content: aiReply.message, // raw response with <message> and <habits> tags
        time: new Date(aiReply.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error(error?.response?.statusText || "Failed to get AI suggestions. Please try again.");
    } finally{
      setIsLoading(false)
    }

    setInputValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm flex flex-col h-[600px]">

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {messages.map((msg, idx) => (
          <div key={msg.id || idx}>
            <div className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

              {/* Avatar */}
              {msg.role === 'assistant' && (
                <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                  <Brain size={18} className="text-white" />
                </div>
              )}
              {msg.role === 'user' && (
                <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 text-xs font-bold text-white">
                  <UserRound size={18} className="text-white" />
                </div>
              )}

              {/* Bubble */}
              <div className={`max-w-[100%] md:max-w-[60%] px-4 py-2.5 rounded-2xl leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white text-sm rounded-br-sm'
                  : ''
              }`}>
                {msg.role === 'user'
                  ? msg.content
                  : <MessageContent content={msg.content} />
                }
              </div>
            </div>

            {/* Timestamp */}
            <p className={`text-xs text-gray-400 mt-1 ${msg.role === 'user' ? 'text-right mr-11' : 'ml-11'}`}>
              {msg.time}
            </p>

            {/* Suggestion chips — only below first message if no user messages yet */}
            {showChips && idx === 0 && msg.role === 'assistant' && (
              <div className="flex flex-wrap gap-2 mt-3 ml-11">
                {SUGGESTION_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    className="text-xs px-3 py-1.5 bg-white text-blue-600 border border-blue-200 rounded-full hover:bg-blue-50 transition-colors duration-150 font-medium"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Loading dots */}
        {isLoading && (
          <div className="flex items-end gap-2">
            <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Brain size={18} className="text-white" />
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1 items-center h-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your habits..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputValue.trim()}
            className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send size={14} className="text-white" />
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-1.5">Press Enter to send or click the button</p>
      </div>
    </div>
  )
}

export default AIChart
