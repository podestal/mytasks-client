import { motion } from "framer-motion"
import { Trash2 } from "lucide-react"
import type { Column } from "./constants"

interface DeleteColumnProps {
  column: Column
  isDraggedOver: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
}

const DeleteColumn = ({ column, isDraggedOver, onDragOver, onDragLeave, onDrop }: DeleteColumnProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col w-full aspect-square max-w-[200px] mx-auto md:mx-0 ${
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
      <div className={`flex items-center justify-between mb-4 rounded-xl border-2 ${column.color} p-3 ${
        isDraggedOver ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-[#121212]' : ''
      }`}>
        <h2 className="font-semibold text-white text-sm uppercase tracking-wide">
          {column.label}
        </h2>
        <span className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded">
          0
        </span>
      </div>

      {/* Delete Zone */}
      <div className={`flex-1 flex items-center justify-center rounded-xl border-2 ${column.color} ${
        isDraggedOver ? 'ring-2 ring-red-500' : ''
      }`}>
        <div className="text-center p-4">
          <Trash2 className="w-12 h-12 text-red-400/50 mx-auto mb-2" />
          <p className="text-xs text-gray-500">Drop tasks here to delete</p>
        </div>
      </div>
    </motion.div>
  )
}

export default DeleteColumn

