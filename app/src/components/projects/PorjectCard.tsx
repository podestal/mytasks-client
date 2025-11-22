import type { Project } from "@/services/api/projectService"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, FolderKanban } from "lucide-react"
import { useState } from "react"
import SprintMain from "../sprints/SprintMain"

interface Props {
    project: Project
    index: number
}

const PorjectCard = ({ project, index }: Props) => {
    const [expanded, setExpanded] = useState(false)
  return (
    <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="bg-[#1a1a1a] rounded-2xl my-4 shadow-lg hover:bg-[#242424] transition-all duration-300 overflow-hidden border border-gray-800"
    >
                <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="bg-[#1a1a1a] border-l-4 border-[#1DB954] p-4 shadow-lg"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3 flex-1">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-2 bg-[#1DB954] rounded-lg shadow-sm"
              >
                <FolderKanban className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">{project.name}</h2>
                <p className="text-gray-400 text-xs mt-1">
                  {project.totalSprints} sprint{project.totalSprints !== 1 ? 's' : ''} •{' '}
                  <span className="text-[#1DB954]">{project.completedSprints} completed</span>
                </p>
              </div>
            </div>
            {project.totalSprints > 0 && (
              <motion.button
                onClick={() => setExpanded(!expanded)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                aria-label={expanded ? 'Hide sprints' : 'Show sprints'}
              >
                {expanded ? (
                  <ChevronUp className="w-5 h-5 text-[#1DB954]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </motion.button>
            )}
          </div>
          {project.description && (
            <p className="text-gray-300 text-xs leading-relaxed">
              {project.description}
            </p>
          )}
          {expanded && <SprintMain projectId={project.id} />}
        </motion.div>
    </motion.div>
  )
}

export default PorjectCard