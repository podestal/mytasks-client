import type { Task } from "@/services/api/taskService"
import { AnimatePresence, motion } from "framer-motion"
import type { Column } from "./constants"
import CreateTask from "./CreateTask"
import TaskCard from "./TaskCard"

interface KanbanColumnProps {
  column: Column
  tasks: Task[]
  draggedTask: Task | null
  isDraggedOver: boolean
  sprintId: number
  onDragStart: (task: Task, e: React.DragEvent<HTMLDivElement>) => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
}

const KanbanColumn = ({
  column,
  tasks,
  draggedTask,
  isDraggedOver,
  sprintId,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
}: KanbanColumnProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col h-full min-h-[500px] ${
        isDraggedOver ? 'ring-2 ring-[#1DB954] ring-offset-2 ring-offset-[#121212]' : ''
      }`}
      style={{
        willChange: isDraggedOver ? 'transform' : 'auto',
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Column Header */}
      <div className={`flex items-center justify-between mb-4 rounded-xl border-2 ${column.color} p-3`}>
        <h2 className="font-semibold text-white text-sm uppercase tracking-wide">
          {column.label}
        </h2>
        <span className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded">
          {tasks.length}
        </span>
      </div>

      {/* Tasks in this column */}
      <div className="flex-1 space-y-3">
        <AnimatePresence>
          {/* Create Task Form - Only show in Todo column */}
          {column.id === 'T' && (
            <CreateTask sprintId={sprintId} />
          )}
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isDragging={draggedTask?.id === task.id}
              onDragStart={onDragStart}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default KanbanColumn

