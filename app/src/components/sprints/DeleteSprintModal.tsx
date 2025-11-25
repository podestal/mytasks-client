import { Loader2, Trash2, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "@tanstack/react-router"
import Modal from "../ui/Modal"
import useDeleteSprint from "@/hooks/api/sprints/useDeleteSprint"
import type { Sprint } from "@/services/api/sprintService"

interface DeleteSprintModalProps {
    isOpen: boolean
    onClose: () => void
    sprint: Sprint | null
}

const DeleteSprintModal = ({ isOpen, onClose, sprint }: DeleteSprintModalProps) => {
    const deleteSprint = useDeleteSprint()
    const navigate = useNavigate()
    const isLoading = deleteSprint.isPending
    const isError = deleteSprint.isError
    const error = deleteSprint.error

    const handleDelete = () => {
        if (!sprint) return

        deleteSprint.mutate({
            access: '',
            sprintId: sprint.id,
        }, {
            onSuccess: () => {
                onClose()
                navigate({ to: '/projects' })
            }
        })
    }

    const handleClose = () => {
        if (!isLoading) {
            onClose()
        }
    }

    if (!sprint) return null

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Delete Sprint"
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
                            Are you sure you want to delete this sprint?
                        </h3>
                        <p className="text-xs text-gray-400">
                            This action cannot be undone. All tasks associated with this sprint will also be deleted.
                        </p>
                    </div>
                </div>

                {/* Sprint Info */}
                <div className="p-4 bg-black/50 rounded-lg border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">Sprint Name:</p>
                    <p className="text-white font-medium">{sprint.name}</p>
                    {sprint.description && (
                        <>
                            <p className="text-sm text-gray-400 mb-1 mt-3">Description:</p>
                            <p className="text-gray-300 text-sm">{sprint.description}</p>
                        </>
                    )}
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
                            : 'Failed to delete sprint. Please try again.'}
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
                        className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </motion.button>
                    <motion.button
                        type="button"
                        onClick={handleDelete}
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4" />
                                Delete Sprint
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteSprintModal

