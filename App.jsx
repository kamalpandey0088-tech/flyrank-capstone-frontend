import React, { useEffect, useMemo, useState } from 'react'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

const STORAGE_KEY = 'task_manager_v1'

function normalizeInitial(tasksArray = []) {
  const byId = {}
  const allIds = []
  tasksArray.forEach((t) => {
    byId[t.id] = t
    allIds.push(t.id)
  })
  return { byId, allIds }
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return { byId: {}, allIds: [] }
      const parsed = JSON.parse(raw)
      return normalizeInitial(parsed.tasks || parsed || [])
    } catch (e) {
      console.error('Failed to load tasks', e)
      return { byId: {}, allIds: [] }
    }
  })

  const [filter, setFilter] = useState('all') // all | pending | completed
  const [editing, setEditing] = useState(null)

  // simple debounce for writes
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const payload = { tasks: Object.values(tasks.byId || {}) }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
      } catch (e) {
        console.error('Failed to save tasks', e)
      }
    }, 300)
    return () => clearTimeout(t)
  }, [tasks])

  const createTask = (payload) => {
    const id = `t_${Date.now()}`
    const now = Date.now()
    const task = {
      id,
      title: payload.title,
      description: payload.description || '',
      completed: false,
      createdAt: now,
      updatedAt: now,
      priority: payload.priority || 'medium',
      dueDate: payload.dueDate || null,
    }
    setTasks((s) => ({ byId: { ...s.byId, [id]: task }, allIds: [id, ...s.allIds] }))
  }

  const updateTask = (id, changes) => {
    setTasks((s) => {
      const existing = s.byId[id]
      if (!existing) return s
      const updated = { ...existing, ...changes, updatedAt: Date.now() }
      return { ...s, byId: { ...s.byId, [id]: updated } }
    })
  }

  const deleteTask = (id) => {
    setTasks((s) => {
      const { [id]: _deleted, ...rest } = s.byId
      return { byId: rest, allIds: s.allIds.filter((tid) => tid !== id) }
    })
  }

  const toggleComplete = (id) => {
    setTasks((s) => {
      const t = s.byId[id]
      if (!t) return s
      const updated = { ...t, completed: !t.completed, updatedAt: Date.now() }
      return { ...s, byId: { ...s.byId, [id]: updated } }
    })
  }

  const allTasks = useMemo(() => tasks.allIds.map((id) => tasks.byId[id]), [tasks])

  const visibleTasks = useMemo(() => {
    if (filter === 'all') return allTasks
    if (filter === 'pending') return allTasks.filter((t) => !t.completed)
    return allTasks.filter((t) => t.completed)
  }, [allTasks, filter])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-3xl mx-auto mb-6">
        <h1 className="text-2xl font-semibold">Task Manager</h1>
        <p className="text-sm text-gray-600">Create, edit, and filter tasks. Saves to local storage.</p>
      </header>

      <main className="max-w-3xl mx-auto">
        <div className="mb-4 flex gap-2 items-center">
          <button
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}
            aria-label="Filter all tasks"
          >
            All
          </button>
          <button
            aria-pressed={filter === 'pending'}
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 rounded ${filter === 'pending' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}
            aria-label="Filter pending tasks"
          >
            Pending
          </button>
          <button
            aria-pressed={filter === 'completed'}
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}
            aria-label="Filter completed tasks"
          >
            Completed
          </button>
        </div>

        <section className="mb-6">
          <TaskForm
            key={editing || 'create'}
            mode={editing ? 'edit' : 'create'}
            initialTask={editing ? tasks.byId[editing] : null}
            onCreate={(p) => createTask(p)}
            onUpdate={(id, p) => updateTask(id, p)}
            onClose={() => setEditing(null)}
          />
        </section>

        <section>
          <TaskList
            tasks={visibleTasks}
            onToggle={toggleComplete}
            onEdit={(id) => setEditing(id)}
            onDelete={deleteTask}
          />
        </section>
      </main>
    </div>
  )
}
