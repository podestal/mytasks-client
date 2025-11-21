import { useParams, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Trash2,
  User
} from 'lucide-react'
import axios from 'axios'

// Task status types
type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done'

interface Task {
  id: number
  title: string
  description?: string
  status: TaskStatus
  assignee?: string
  priority?: 'low' | 'medium' | 'high'
  created_at: string
  updated_at: string
}

// Mock sprint data
const mockSprint = {
  id: 1,
  project_id: 1,
  name: 'Sprint 1: User Authentication',
  description: 'Implement user registration, login, and password reset',
  deadline: '2024-02-15',
  status: 'A',
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-02-10T16:00:00Z',
}

// Mock tasks data
const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Design login UI',
    description: 'Create wireframes and mockups for login page',
    status: 'done',
    assignee: 'John Doe',
    priority: 'high',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T14:00:00Z',
  },
  {
    id: 2,
    title: 'Implement registration API',
    description: 'Create backend endpoint for user registration',
    status: 'in_progress',
    assignee: 'Jane Smith',
    priority: 'high',
    created_at: '2024-01-16T09:00:00Z',
    updated_at: '2024-01-22T11:00:00Z',
  },
  {
    id: 3,
    title: 'Add password validation',
    description: 'Implement password strength requirements',
    status: 'in_review',
    assignee: 'Bob Johnson',
    priority: 'medium',
    created_at: '2024-01-17T08:00:00Z',
    updated_at: '2024-01-21T16:00:00Z',
  },
  {
    id: 4,
    title: 'Write unit tests',
    description: 'Add test coverage for authentication flow',
    status: 'todo',
    assignee: 'Alice Williams',
    priority: 'medium',
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-18T10:00:00Z',
  },
  {
    id: 5,
    title: 'Setup OAuth integration',
    description: 'Integrate Google and GitHub OAuth',
    status: 'todo',
    assignee: 'Charlie Brown',
    priority: 'low',
    created_at: '2024-01-19T09:00:00Z',
    updated_at: '2024-01-19T09:00:00Z',
  },
]

const columns = [
  { id: 'todo', label: 'Todo', color: 'bg-gray-500/20 border-gray-500/30' },
  { id: 'in_progress', label: 'In Progress', color: 'bg-blue-500/20 border-blue-500/30' },
  { id: 'in_review', label: 'In Review', color: 'bg-yellow-500/20 border-yellow-500/30' },
  { id: 'done', label: 'Done', color: 'bg-[#1DB954]/20 border-[#1DB954]/30' },
  { id: 'delete', label: 'Delete', color: 'bg-red-500/20 border-red-500/30' },
]

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case 'low':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const SprintPage = () => {
  const { sprintId } = useParams({ from: '/sprints/$sprintId' })
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(null)

  useEffect(() => {
    // Fetch sprint and tasks data
    axios.get(`http://localhost:3000/api/sprints/${sprintId}`).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.error(error)
    })
  }, [sprintId])

  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleDragEnd = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedTask && draggedOverColumn) {
      if (draggedOverColumn === 'delete') {
        // Delete task
        setTasks(tasks.filter((t) => t.id !== draggedTask.id))
      } else if (draggedOverColumn !== draggedTask.status) {
        // Update task status only if it changed
        setTasks(
          tasks.map((t) =>
            t.id === draggedTask.id
              ? { ...t, status: draggedOverColumn as TaskStatus, updated_at: new Date().toISOString() }
              : t
          )
        )
      }
    }
    setDraggedTask(null)
    setDraggedOverColumn(null)
  }

  const getTasksByStatus = (status: string) => {
    if (status === 'delete') return []
    return tasks.filter((task) => task.status === status)
  }

  const daysUntilDeadline = Math.ceil(
    (new Date(mockSprint.deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  )

  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-8">
      <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[95%] 2xl:max-w-7xl ml-0 mr-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Sprint Summary Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1a1a1a] border-l-4 border-[#1DB954] rounded-2xl p-6 mb-8 shadow-lg"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {mockSprint.name}
              </h1>
              {mockSprint.description && (
                <p className="text-gray-300 text-sm md:text-base mb-4">
                  {mockSprint.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Due: {formatDate(mockSprint.deadline)}</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-xs ${
                  daysUntilDeadline < 7
                    ? 'bg-red-500/20 text-red-400'
                    : daysUntilDeadline < 14
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-[#1DB954]/20 text-[#1DB954]'
                }`}
              >
                {daysUntilDeadline > 0
                  ? `${daysUntilDeadline} day${daysUntilDeadline !== 1 ? 's' : ''} left`
                  : 'Overdue'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>{tasks.filter((t) => t.status === 'done').length} of {tasks.length} tasks completed</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Updated {formatDate(mockSprint.updated_at)}</span>
            </div>
          </div>
        </motion.div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {columns.map((column) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: draggedOverColumn === column.id ? 1.02 : 1,
              }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col ${
                column.id === 'delete' 
                  ? 'w-full aspect-square max-w-[200px] mx-auto md:mx-0' 
                  : 'h-full min-h-[500px]'
              } transition-all`}
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDraggedOverColumn(column.id)
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                // Only clear if we're leaving the column area
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setDraggedOverColumn(null)
                }
              }}
              onDrop={handleDragEnd}
            >
              {/* Column Header */}
              <div className={`flex items-center justify-between mb-4 rounded-xl border-2 ${column.color} p-3 ${
                draggedOverColumn === column.id ? 'ring-2 ring-offset-2 ring-offset-[#121212]' : ''
              } ${draggedOverColumn === column.id && column.id === 'delete' ? 'ring-red-500' : draggedOverColumn === column.id ? 'ring-[#1DB954]' : ''}`}>
                <h2 className="font-semibold text-white text-sm uppercase tracking-wide">
                  {column.label}
                </h2>
                <span className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded">
                  {column.id === 'delete' ? 0 : getTasksByStatus(column.id).length}
                </span>
              </div>

              {/* Tasks in this column */}
              <div className={column.id === 'delete' ? 'flex-1' : 'flex-1 space-y-3'}>
                <AnimatePresence>
                  {column.id === 'delete' ? (
                    <div className={`flex items-center justify-center h-full rounded-xl border-2 ${column.color} ${
                      draggedOverColumn === column.id ? 'ring-2 ring-red-500' : ''
                    }`}>
                      <div className="text-center p-4">
                        <Trash2 className="w-12 h-12 text-red-400/50 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">Drop tasks here to delete</p>
                      </div>
                    </div>
                  ) : (
                    getTasksByStatus(column.id).map((task, taskIndex) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, x: -100 }}
                        transition={{ duration: 0.2, delay: taskIndex * 0.05 }}
                        draggable
                        {...({
                          onDragStart: (e: React.DragEvent<HTMLDivElement>) => {
                            handleDragStart(task)
                            e.dataTransfer.effectAllowed = 'move'
                            e.dataTransfer.setData('text/html', task.id.toString())
                            // Create a custom drag image
                            if (e.currentTarget) {
                              const dragImage = (e.currentTarget as HTMLElement).cloneNode(true) as HTMLElement
                              dragImage.style.opacity = '0.5'
                              document.body.appendChild(dragImage)
                              e.dataTransfer.setDragImage(dragImage, 0, 0)
                              setTimeout(() => document.body.removeChild(dragImage), 0)
                            }
                          }
                        } as any)}
                        whileDrag={{ 
                          scale: 1.1, 
                          rotate: 3,
                          opacity: 0.8,
                          zIndex: 50
                        }}
                        className="bg-black rounded-lg p-3 border border-gray-700 hover:border-[#1DB954]/50 cursor-move shadow-lg transition-all"
                      >
                        <div className="mb-2">
                          <h3 className="font-semibold text-white text-sm mb-1">
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-xs text-gray-400 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          {task.priority && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(
                                task.priority
                              )}`}
                            >
                              {task.priority}
                            </span>
                          )}
                          {task.assignee && (
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <User className="w-3 h-3" />
                              <span className="truncate max-w-[80px]">{task.assignee}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SprintPage

