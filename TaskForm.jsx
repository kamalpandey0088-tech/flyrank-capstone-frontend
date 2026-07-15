import React, { useEffect, useState } from 'react'

export default function TaskForm({ mode = 'create', initialTask = null, onCreate, onUpdate, onClose }) {
  const [title, setTitle] = useState(initialTask ? initialTask.title : '')
  const [description, setDescription] = useState(initialTask ? initialTask.description : '')
  const [error, setError] = useState('')

  useEffect(() => {
    setTitle(initialTask ? initialTask.title : '')
    setDescription(initialTask ? initialTask.description : '')
    setError('')
  }, [initialTask])

  const maxLen = 80

  const validate = () => {
    const trimmed = title.trim()
    if (trimmed.length === 0) return 'Title is required.'
    if (trimmed.length > maxLen) return `Title must be under ${maxLen} characters.`
    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const v = validate()
    setError(v)
    if (v) return

    const payload = { title: title.trim(), description: description.trim() }
    if (mode === 'create') {
      onCreate(payload)
      setTitle('')
      setDescription('')
    } else if (mode === 'edit' && initialTask) {
      onUpdate(initialTask.id, payload)
      onClose && onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          aria-label={mode === 'create' ? 'New task title' : `Edit title for ${initialTask?.title || ''}`}
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, maxLen))}
          maxLength={maxLen}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-yellow-400"
        />
        <p className="text-xs text-gray-500 mt-1">{title.trim().length}/{maxLen}</p>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
        <textarea
          aria-label={mode === 'create' ? 'New task description' : `Edit description for ${initialTask?.title || ''}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-yellow-400"
        />
      </div>

      {error ? <p className="text-sm text-red-600 mb-2" role="alert">{error}</p> : null}

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-600"
          aria-label={mode === 'create' ? 'Create task' : 'Save task'}
        >
          {mode === 'create' ? 'Add Task' : 'Save'}
        </button>
        {mode === 'edit' && (
          <button
            type="button"
            onClick={() => onClose && onClose()}
            className="px-4 py-2 bg-white border rounded focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-gray-400"
            aria-label="Cancel edit"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
