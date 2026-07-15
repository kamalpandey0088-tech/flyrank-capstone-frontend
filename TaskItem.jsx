import React from 'react'

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? `Mark ${task.title} as pending` : `Mark ${task.title} as completed`}
          className={`w-8 h-8 flex items-center justify-center rounded ${task.completed ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
        >
          {task.completed ? '✓' : '○'}
        </button>

        <div>
          <div className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>{task.title}</div>
          {task.description ? <div className="text-xs text-gray-500">{task.description}</div> : null}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(task.id)}
          aria-label={`Edit ${task.title}`}
          className="px-2 py-1 bg-white border rounded focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
          className="px-2 py-1 bg-red-600 text-white rounded focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
