import type { Project } from "@/services/api/projectService"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, FolderKanban, Plus, Edit } from "lucide-react"
import { useState } from "react"
import SprintMain from "../sprints/SprintMain"
import CreateSprint from "../sprints/CreateSprint"
import UpdateProject from "./UpdateProject"

interface Props {
    project: Project
    index: number
}

const PorjectCard = ({ project, index }: Props) => {
    const [expanded, setExpanded] = useState(false)
    const [isCreateSprintOpen, setIsCreateSprintOpen] = useState(false)
    const [isUpdateProjectOpen, setIsUpdateProjectOpen] = useState(false)

    return (
        <>
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
                        <div className="flex items-center gap-3">
                            
                            {/* Edit Project Button */}
                            <motion.button
                                onClick={() => setIsUpdateProjectOpen(true)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                                aria-label="Edit project"
                                title="Edit project"
                            >
                                <Edit className="w-5 h-5 text-gray-400 hover:text-[#1DB954] transition-colors" />
                            </motion.button>
                            {/* Create Sprint Button */}
                            <motion.button
                                onClick={() => setIsCreateSprintOpen(true)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 bg-[#1DB954] hover:bg-[#1ed760] rounded-lg transition-colors cursor-pointer group"
                                aria-label="Create new sprint"
                                title="Create new sprint"
                            >
                                <Plus className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" />
                            </motion.button>
                            {/* Expand/Collapse Button */}
                            <motion.button
                                onClick={() => {
                                    if (project.totalSprints > 0) {
                                        setExpanded(!expanded)
                                    }
                                }}
                                whileHover={project.totalSprints > 0 ? { scale: 1.1 } : {}}
                                whileTap={project.totalSprints > 0 ? { scale: 0.95 } : {}}
                                disabled={project.totalSprints === 0}
                                className={`p-2 rounded-lg transition-colors ${
                                    project.totalSprints > 0
                                        ? 'hover:bg-gray-800 cursor-pointer'
                                        : 'cursor-not-allowed opacity-50'
                                }`}
                                aria-label={
                                    project.totalSprints > 0
                                        ? expanded
                                            ? 'Hide sprints'
                                            : 'Show sprints'
                                        : 'No sprints available'
                                }
                            >
                                {expanded ? (
                                    <ChevronUp
                                        className={`w-5 h-5 ${
                                            project.totalSprints > 0
                                                ? 'text-[#1DB954]'
                                                : 'text-gray-500'
                                        }`}
                                    />
                                ) : (
                                    <ChevronDown
                                        className={`w-5 h-5 ${
                                            project.totalSprints > 0
                                                ? 'text-gray-400'
                                                : 'text-gray-500'
                                        }`}
                                    />
                                )}
                            </motion.button>
                        </div>
                    </div>
                    {project.description && (
                        <p className="text-gray-300 text-xs leading-relaxed">
                            {project.description}
                        </p>
                    )}
                    {expanded && <SprintMain projectId={project.id} />}
                </motion.div>
            </motion.div>
            <CreateSprint
                isOpen={isCreateSprintOpen}
                onClose={() => setIsCreateSprintOpen(false)}
                projectId={project.id}
            />
            <UpdateProject
                isOpen={isUpdateProjectOpen}
                onClose={() => setIsUpdateProjectOpen(false)}
                project={project}
            />
        </>
    )
}

export default PorjectCard