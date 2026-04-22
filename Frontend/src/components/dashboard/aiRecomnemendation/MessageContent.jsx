import React from 'react'
import HabitSuggestionCard from './HabitSuggestionCard'

// Parses **bold** and *italic* inline markdown
const parseInline = (text, keyPrefix = '') => {
  const parts = []
  const regex = /(\*\*.*?\*\*|\*.*?\*)/g
  let last = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    if (match[0].startsWith('**')) {
      parts.push(<strong key={`${keyPrefix}-${match.index}`}>{match[0].slice(2, -2)}</strong>)
    } else {
      parts.push(<em key={`${keyPrefix}-${match.index}`}>{match[0].slice(1, -1)}</em>)
    }
    last = match.index + match[0].length
  }

  if (last < text.length) parts.push(text.slice(last))
  return parts.length ? parts : text
}

// Renders plain markdown text
const renderText = (text) => {
  const lines = text.split('\n')
  const elements = []

  lines.forEach((line, i) => {
    if (!line.trim()) return

    if (line.startsWith('### ') || line.startsWith('## ')) {
      elements.push(
        <p key={i} className="font-bold text-gray-900 mt-3 mb-1 text-sm">
          {parseInline(line.replace(/^#{2,3} /, ''), i)}
        </p>
      )
    } else if (line.trim() === '---') {
      elements.push(<hr key={i} className="border-gray-200 my-2" />)
    } else if (line.startsWith('* ') || line.startsWith('- ')) {
      elements.push(
        <div key={i} className="flex gap-2 items-start my-0.5">
          <span className="text-blue-500 mt-0.5 flex-shrink-0 text-xs">●</span>
          <span className="text-sm">{parseInline(line.replace(/^[*-] /, ''), i)}</span>
        </div>
      )
    } else {
      elements.push(
        <p key={i} className="text-sm my-1">{parseInline(line, i)}</p>
      )
    }
  })

  return <div className="space-y-0.5 leading-relaxed">{elements}</div>
}

function MessageContent({ content }) {
  const messageMatch = content.match(/<message>([\s\S]*?)<\/message>/)
  const habitsMatch = content.match(/<habits>([\s\S]*?)<\/habits>/)

  // Extract message text — if no <message> tag, strip <habits> block and use remaining text
  const messageText = messageMatch
    ? messageMatch[1].trim()
    : content.replace(/<habits>[\s\S]*?<\/habits>/, '').trim()

  let habits = []
  if (habitsMatch) {
    try { habits = JSON.parse(habitsMatch[1].trim()) } catch (_) { habits = [] }
  }

  return (
    <div className='space-y-3'>
      <div className='bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 rounded-2xl rounded-bl-sm px-5 py-4 leading-relaxed shadow-sm border border-gray-100'>
        {renderText(messageText)}
      </div>
      {habits.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide px-1">Suggested Habits</p>
          {habits.map((habit, i) => (
            <HabitSuggestionCard key={i} habit={habit} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MessageContent
