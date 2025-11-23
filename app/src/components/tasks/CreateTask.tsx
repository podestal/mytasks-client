import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Loader2 } from 'lucide-react'
import useCreateTask from '@/hooks/api/tasks/useCreateTask'
import { useQueryClient } from '@tanstack/react-query'

interface CreateTaskProps {
  sprintId: number
  onTaskCreated?: () => void
}

const CreateTask = ({ sprintId, onTaskCreated }: CreateTaskProps) => {
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'L' | 'M' | 'H'>('L')
  const [isExpanded, setIsExpanded] = useState(false)
  const createTask = useCreateTask()
  const queryClient = useQueryClient()

  const isLoading = createTask.isPending
  const isError = createTask.isError
  const error = createTask.error

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) return

    createTask.mutate({
      access: '',
      task: {
        sprint_id: sprintId,
        description: description.trim(),
        priority: priority,
        status: 'T', // Todo status
      }
    }, {
      onSuccess: () => {
        // Invalidate tasks query to refresh the list
        queryClient.invalidateQueries({ queryKey: ['tasks', sprintId] })
        // Reset form
        setDescription('')
        setPriority('L')
        setIsExpanded(false)
        onTaskCreated?.()
      }
    })
  }

  const handleCancel = () => {
    setDescription('')
    setPriority('L')
    setIsExpanded(false)
  }

  const priorityOptions = [
    { value: 'L', label: 'Low', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { value: 'M', label: 'Medium', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    { value: 'H', label: 'High', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  ]

  if (!isExpanded) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsExpanded(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full p-3 border-2 border-dashed border-gray-700 hover:border-[#1DB954]/50 rounded-lg text-gray-400 hover:text-[#1DB954] transition-colors flex items-center justify-center gap-2 group"
      >
        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
        <span className="text-sm font-medium">Add Task</span>
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-black rounded-lg p-3 border border-gray-700"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Description Field */}
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description..."
            rows={2}
            required
            disabled={isLoading}
            autoFocus
            className="w-full px-3 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          />
        </div>

        {/* Priority Selection */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-2">
            Priority
          </label>
          <div className="flex items-center gap-2">
            {priorityOptions.map((option) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => setPriority(option.value as 'L' | 'M' | 'H')}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  priority === option.value
                    ? option.color
                    : 'bg-gray-800/50 text-gray-400 border-gray-700 hover:border-gray-600'
                } disabled:opacity-50`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-xs"
          >
            {error instanceof Error
              ? error.message
              : 'Failed to create task. Please try again.'}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-3 py-2 cursor-pointer bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            disabled={isLoading || !description.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-3 py-2 cursor-pointer bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                Add Task
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

export default CreateTask
