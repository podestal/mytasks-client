import { Loader2, Rocket, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import Modal from "../ui/Modal"
import type { createSprintData } from "@/hooks/api/sprints/useCreateSprint"
import type { Sprint } from "@/services/api/sprintService"
import type { UseMutationResult } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

interface Props {
    isOpen: boolean
    onClose: () => void
    projectId: number
    createSprint?: UseMutationResult<Sprint, Error, createSprintData>
}

const SprintForm = ({ isOpen, onClose, projectId, createSprint }: Props) => {
    const queryClient = useQueryClient()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setName('')
            setDescription('')
            setDeadline('')
        }
    }, [isOpen])

    // Set default deadline to 2 weeks from now
    useEffect(() => {
        if (isOpen && !deadline) {
            const defaultDate = new Date()
            defaultDate.setDate(defaultDate.getDate() + 14)
            setDeadline(defaultDate.toISOString().split('T')[0])
        }
    }, [isOpen, deadline])

    const isLoading = createSprint?.isPending || false
    const isError = createSprint?.isError || false
    const error = createSprint?.error

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!name.trim() || !deadline) return

        console.log('deadline', deadline);
        

        createSprint?.mutate({
            access: '',
            sprint: {
                project_id: projectId,
                name: name.trim(),
                description: description.trim(),
                deadline: deadline,
            }
        }, {
            onSuccess: () => {
                // Invalidate queries to refresh data
                queryClient.invalidateQueries({ queryKey: ['sprints', projectId] })
                queryClient.invalidateQueries({ queryKey: ['projects'] })
                // Reset form and close
                setName('')
                setDescription('')
                setDeadline('')
                onClose()
            }
        })
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
            title="Create Sprint" 
            icon={<Rocket className="w-5 h-5 text-white" />}
            disabled={isLoading}
            closeOnBackdropClick={!isLoading}
            size="md"
        >
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Sprint Name Field */}
                <div>
                    <label 
                        htmlFor="sprint-name" 
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Sprint Name <span className="text-red-400">*</span>
                    </label>
                    <input
                        id="sprint-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter sprint name..."
                        required
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Description Field */}
                <div>
                    <label 
                        htmlFor="sprint-description" 
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="sprint-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter sprint description..."
                        rows={3}
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Deadline Field */}
                <div>
                    <label 
                        htmlFor="sprint-deadline" 
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Deadline <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            id="sprint-deadline"
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                            disabled={isLoading}
                            className="w-full pl-11 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        />
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
                            : 'Failed to create sprint. Please try again.'}
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
                        disabled={isLoading || !name.trim() || !deadline}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-3 cursor-pointer bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Rocket className="w-4 h-4" />
                                Create Sprint
                            </>
                        )}
                    </motion.button>
                </div>
            </form>
        </Modal>
    )
}

export default SprintForm

