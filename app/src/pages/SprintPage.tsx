import { useParams, Link, useLocation } from '@tanstack/react-router'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Clock
} from 'lucide-react'
import axios from 'axios'
import type { Sprint } from '@/services/api/sprintService'

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
  const location = useLocation()
  const [sprint, setSprint] = useState<Sprint | null>(
    (location.state as { sprint?: Sprint })?.sprint || null
  )
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(null)
  const [isLoadingSprint, setIsLoadingSprint] = useState(!sprint)
  const url = import.meta.env.VITE_API_URL

  useEffect(() => {
    // If sprint wasn't passed via state, fetch it from the server
    if (!sprint && sprintId) {
      setIsLoadingSprint(true)
      axios.get(`${url}sprints/${sprintId}`)
        .then((response) => {
          console.log(response)
          setSprint(response.data[0])
          setIsLoadingSprint(false)
        })
        .catch((error) => {
          console.error('Error fetching sprint:', error)
          setIsLoadingSprint(false)
        })
    }
  }, [sprintId, sprint])

  // Memoize tasks by status to prevent unnecessary recalculations
  const tasksByStatus = useMemo(() => {
    const grouped: Record<string, Task[]> = {
      todo: [],
      in_progress: [],
      in_review: [],
      done: [],
    }
    tasks.forEach((task) => {
      if (grouped[task.status]) {
        grouped[task.status].push(task)
      }
    })
    return grouped
  }, [tasks])

  const handleDragStart = useCallback((task: Task) => {
    setDraggedTask(task)
  }, [])

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (draggedTask && draggedOverColumn) {
      if (draggedOverColumn === 'delete') {
        // Delete task
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== draggedTask.id))
      } else if (draggedOverColumn !== draggedTask.status) {
        // Update task status only if it changed
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === draggedTask.id
              ? { ...t, status: draggedOverColumn as TaskStatus, updated_at: new Date().toISOString() }
              : t
          )
        )
      }
    }
    setDraggedTask(null)
    setDraggedOverColumn(null)
  }, [draggedTask, draggedOverColumn])

  const handleDragOver = useCallback((e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    e.stopPropagation()
    setDraggedOverColumn(columnId)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    // Only clear if we're actually leaving (not entering a child element)
    const relatedTarget = e.relatedTarget as HTMLElement | null
    if (!relatedTarget || !(e.currentTarget as HTMLElement).contains(relatedTarget)) {
      setDraggedOverColumn(null)
    }
  }, [])

  const getTasksByStatus = useCallback((status: string) => {
    if (status === 'delete') return []
    return tasksByStatus[status] || []
  }, [tasksByStatus])

  const daysUntilDeadline = sprint
    ? Math.ceil(
        (new Date(sprint.deadline).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0

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
        {isLoadingSprint ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a1a] border-l-4 border-[#1DB954] rounded-2xl p-6 mb-8 shadow-lg"
          >
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-6"></div>
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            </div>
          </motion.div>
        ) : sprint ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a1a] border-l-4 border-[#1DB954] rounded-2xl p-6 mb-8 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {sprint.name}
                </h1>
                {sprint.description && (
                  <p className="text-gray-300 text-sm md:text-base mb-4">
                    {sprint.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Due: {formatDate(sprint.deadline)}</span>
                {sprint.status === 'A' && (
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
                )}
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{tasks.filter((t) => t.status === 'done').length} of {tasks.length} tasks completed</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Updated {formatDate(sprint.updated_at)}</span>
              </div>
            </div>
          </motion.div>
        ) : null}


      </div>
    </div>
  )
}

export default SprintPage

