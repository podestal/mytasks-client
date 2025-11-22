import { Loader2, Plus, Edit } from "lucide-react"
import { motion } from "framer-motion"
import Modal from "../ui/Modal"
import type { createProjectData } from "@/hooks/api/projects/useCreateProject"
import type { updateProjectData } from "@/hooks/api/projects/useUpdateProject"
import type { Project } from "@/services/api/projectService"
import type { UseMutationResult } from "@tanstack/react-query"
import { useState, useEffect } from "react"

interface Props {
    isOpen: boolean
    onClose: () => void
    createProject?: UseMutationResult<Project, Error, createProjectData>
    updateProject?: UseMutationResult<Project, Error, updateProjectData>
    project?: Project | null
}

const ProjectForm = ({ isOpen, onClose, createProject, updateProject, project }: Props) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const isEditMode = !!project

    // Populate form when editing
    useEffect(() => {
        if (isOpen && project) {
            setName(project.name)
            setDescription(project.description || '')
        } else if (!isOpen) {
            setName('')
            setDescription('')
        }
    }, [isOpen, project])

    const isLoading = createProject?.isPending || updateProject?.isPending || false
    const isError = createProject?.isError || updateProject?.isError || false
    const error = createProject?.error || updateProject?.error

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!name.trim()) return

        if (isEditMode && updateProject && project) {
            updateProject.mutate({
                access: '',
                projectId: project.id,
                project: {
                    name: name.trim(),
                    description: description.trim(),
                }
            }, {
                onSuccess: () => {
                    onClose()
                }
            })
        } else if (createProject) {
            createProject.mutate({
                access: '',
                project: {
                    name: name.trim(),
                    description: description.trim(),
                }
            }, {
                onSuccess: () => {
                    setName('')
                    setDescription('')
                    onClose()
                }
            })
        }
    }

    const handleClose = () => {
        if (!isLoading) {
            onClose()
        }
    }

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={handleClose} 
            title={isEditMode ? "Edit Project" : "Create Project"} 
            icon={isEditMode ? <Edit className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
            disabled={isLoading}
            closeOnBackdropClick={!isLoading}
        >
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Project Name Field */}
                <div>
                    <label 
                        htmlFor="project-name" 
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Project Name <span className="text-red-400">*</span>
                    </label>
                    <input
                        id="project-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter project name..."
                        required
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Description Field */}
                <div>
                    <label 
                        htmlFor="project-description" 
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="project-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter project description..."
                        rows={4}
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Error Message */}
                {isError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm"
                    >
                        {error instanceof Error
                            ? error.message
                            : 'Failed to create project. Please try again.'}
                    </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4">
                    <motion.button
                        type="button"
                        onClick={handleClose}
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-3 cursor-pointer bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </motion.button>
                    <motion.button
                        type="submit"
                        disabled={isLoading || !name.trim()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-3 cursor-pointer bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {isEditMode ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            <>
                                {isEditMode ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                {isEditMode ? 'Update Project' : 'Create Project'}
                            </>
                        )}
                    </motion.button>
                </div>
            </form>
        </Modal>
    )
}

export default ProjectForm