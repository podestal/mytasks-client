import type { Task } from "@/services/api/taskService"
import { motion } from "framer-motion"
import { User } from "lucide-react"
import { getPriorityColor, getPriorityLabel } from "./utils"

interface TaskCardProps {
  task: Task
  isDragging: boolean
  onDragStart: (task: Task, e: React.DragEvent<HTMLDivElement>) => void
}

const TaskCard = ({ task, isDragging, onDragStart }: TaskCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isDragging ? 0.5 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, x: -100 }}
      transition={{ duration: 0.15 }}
      draggable
      onDragStart={(e) => onDragStart(task, e as unknown as React.DragEvent<HTMLDivElement>)}
      className={`bg-black rounded-lg p-3 border border-gray-700 hover:border-[#1DB954]/50 cursor-grab shadow-lg transition-opacity duration-150 ${
        isDragging ? 'opacity-50' : ''
      }`}
      style={{
        willChange: 'opacity',
        touchAction: 'none',
      }}
      onDragEnd={(e) => {
        (e.currentTarget as HTMLElement).style.cursor = 'grab'
      }}
    >
      <div className="mb-2">
        <h3 className="font-semibold text-white text-sm mb-1">
          {task.description}
        </h3>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        {task.priority && (
          <span
            className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}
          >
            {getPriorityLabel(task.priority)}
          </span>
        )}
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <User className="w-3 h-3" />
          <span className="truncate max-w-[80px]">Luis Rodriguez</span>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard

