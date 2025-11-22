import { motion } from "framer-motion"
import type { Sprint } from "@/services/api/sprintService"
import { Link } from "@tanstack/react-router"
import { Calendar, CheckCircle } from "lucide-react"

interface Props {
  sprint: Sprint
  sprintIndex: number
}

const SprintCard = ({ sprint, sprintIndex }: Props) => {
  return (
    <Link
        to="/sprints/$sprintId"
        params={{ sprintId: sprint.id.toString() }}
    >
        <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: sprintIndex * 0.05 }}
        whileHover={{ x: 4, scale: 1.01 }}
        className="border my-4 border-gray-800 rounded-xl p-4 hover:border-[#1DB954]/50 transition-colors bg-[#242424] cursor-pointer"
        >
            <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">
                    {sprint.name}
                </h3>
                {sprint.description && (
                    <p className="text-sm text-gray-400 mb-3">
                    {sprint.description}
                    </p>
                )}
            </div>
            <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${sprint.status === 'A' ? 'bg-[#1DB954]/20 text-[#1DB954]' : 'bg-gray-800 text-gray-400'}`}
            >
                <CheckCircle className={`w-3.5 h-3.5 ${sprint.status === 'A' ? 'text-[#1DB954]' : 'text-gray-400'}`} />
                <span>{sprint.status === 'A' ? 'Active' : 'Completed'}</span>
            </div>
            </div>

                <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>
                    Due: {(sprint.deadline)}
                </span>
                {sprint.status === 'A' && (
                <span
                    className={`ml-2 px-2 py-0.5 rounded ${
                        Math.ceil((new Date(sprint.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) < 7
                        ? 'bg-red-500/20 text-red-400'
                        : Math.ceil((new Date(sprint.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) < 14
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-[#1DB954]/20 text-[#1DB954]'
                    }`}
                    >
                    {Math.ceil((new Date(sprint.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) > 0
                        ? `${Math.ceil((new Date(sprint.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} day${Math.ceil((new Date(sprint.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) !== 1 ? 's' : ''} left`
                        : 'Overdue'}
                    </span>
                )}
                </div>
            </div>
        </motion.div>
  </Link>
  )
}

export default SprintCard