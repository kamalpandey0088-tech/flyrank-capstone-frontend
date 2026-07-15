import React from 'react'
import TaskItem from './TaskItem'

export default function TaskList({ tasks = [], onToggle, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white p-6 rounded shadow text-center text-gray-600">No tasks found.</div>
    )
  }

  return (
    <ul className="space-y-3">
      {tasks.map((t) => (
        <li key={t.id}>
          <TaskItem task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  )
}
