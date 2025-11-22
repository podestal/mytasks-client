import { Loader2, Trash2, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import Modal from "../ui/Modal"
import useDeleteProject from "@/hooks/api/projects/useDeleteProject"
import type { Project } from "@/services/api/projectService"

interface DeleteProjectModalProps {
    isOpen: boolean
    onClose: () => void
    project: Project | null
}

const DeleteProjectModal = ({ isOpen, onClose, project }: DeleteProjectModalProps) => {
    const deleteProject = useDeleteProject()
    const isLoading = deleteProject.isPending
    const isError = deleteProject.isError
    const error = deleteProject.error

    const handleDelete = () => {
        if (!project) return

        deleteProject.mutate({
            access: '',
            projectId: project.id,
        }, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const handleClose = () => {
        if (!isLoading) {
            onClose()
        }
    }

    if (!project) return null

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Delete Project"
            icon={<Trash2 className="w-5 h-5 text-white" />}
            disabled={isLoading}
            closeOnBackdropClick={!isLoading}
            size="md"
        >
            <div className="space-y-4">
                {/* Warning Message */}
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-red-400 mb-1">
                            Are you sure you want to delete this project?
                        </h3>
                        <p className="text-xs text-gray-400">
                            This action cannot be undone. All sprints and tasks associated with this project will also be deleted.
                        </p>
                    </div>
                </div>

                {/* Project Info */}
                <div className="p-4 bg-black/50 rounded-lg border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">Project Name:</p>
                    <p className="text-white font-medium">{project.name}</p>
                    {project.description && (
                        <>
                            <p className="text-sm text-gray-400 mb-1 mt-3">Description:</p>
                            <p className="text-gray-300 text-sm">{project.description}</p>
                        </>
                    )}
                    <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-xs text-gray-500">
                            {project.totalSprints} sprint{project.totalSprints !== 1 ? 's' : ''} will be deleted
                        </p>
                    </div>
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
                            : 'Failed to delete project. Please try again.'}
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
                        type="button"
                        onClick={handleDelete}
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-3 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4" />
                                Delete Project
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteProjectModal

