import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle2, Clock, Edit2, Save, X, Trash2 } from 'lucide-react'
import type { Sprint } from '@/services/api/sprintService'
import useUpdateSprint from '@/hooks/api/sprints/useUpdateSprint'
import CompleteSprintButton from './CompleteSprintButton'
import DeleteSprintModal from './DeleteSprintModal'

interface SprintHeaderProps {
  sprint: Sprint
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const SprintHeader = ({ sprint }: SprintHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editedName, setEditedName] = useState(sprint.name)
  const [editedDescription, setEditedDescription] = useState(sprint.description)
  const [editedDeadline, setEditedDeadline] = useState(
    sprint.deadline
  )
  const updateSprint = useUpdateSprint()

  const daysUntilDeadline = Math.ceil(
    (new Date(sprint.deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  )

  const handleSave = () => {
    updateSprint.mutate(
      {
        access: '',
        sprintId: sprint.id,
        sprint: {
          name: editedName,
          description: editedDescription,
          deadline: new Date(editedDeadline).toISOString(),
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false)
        },
      }
    )
  }

  const handleCancel = () => {
    setEditedName(sprint.name)
    setEditedDescription(sprint.description)
    setEditedDeadline(new Date(sprint.deadline).toISOString().split('T')[0])
    setIsEditing(false)
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-[#1a1a1a] border-l-4 ${
        sprint.status === 'D' ? 'border-gray-500' : 'border-[#1DB954]'
      } rounded-2xl p-6 mb-8 shadow-lg`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full text-3xl md:text-4xl font-bold bg-transparent text-white border-b-2 border-[#1DB954] focus:outline-none focus:border-[#1DB954] pb-2"
                placeholder="Sprint name"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full text-sm md:text-base bg-transparent text-gray-300 border-b-2 border-gray-600 focus:outline-none focus:border-[#1DB954] resize-none"
                placeholder="Sprint description"
                rows={3}
              />
              <div className="flex items-center gap-2">
                <label className="text-gray-400 text-sm">Deadline:</label>
                <input
                  type="date"
                  value={editedDeadline}
                  onChange={(e) => setEditedDeadline(e.target.value)}
                  className="bg-transparent text-gray-300 border border-gray-600 rounded px-3 py-1 focus:outline-none focus:border-[#1DB954]"
                />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={handleSave}
                  disabled={updateSprint.isPending}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1DB954]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {updateSprint.isPending ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={updateSprint.isPending}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                      {sprint.name}
                    </h1>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        sprint.status === 'A'
                          ? 'bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30'
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }`}
                    >
                      {sprint.status === 'A' ? 'Active' : 'Completed'}
                    </span>
                  </div>
                  {sprint.description && (
                    <p className="text-gray-300 text-sm md:text-base mb-4">
                      {sprint.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {sprint.status === 'A' && (
                    <CompleteSprintButton sprintId={sprint.id} />
                  )}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-gray-400 hover:text-[#1DB954] hover:bg-[#1DB954]/10 rounded-lg transition-colors"
                    title="Edit sprint"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete sprint"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {sprint.status === 'A' && (
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Due: {formatDate(sprint.deadline)}</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-xs ${
                  daysUntilDeadline < 7
                    ? 'bg-red-500/20 text-red-400'
                    : daysUntilDeadline < 14
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-[#1DB954]/20 text-[#1DB954]'
                }`}
              >
                {daysUntilDeadline > 0
                  ? `${daysUntilDeadline} day${daysUntilDeadline !== 1 ? 's' : ''} left`
                  : 'Overdue'}
              </span>
            </div>
          )}
          {sprint.status === 'D' && (
            <div className="flex items-center gap-2 text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-[#1DB954]" />
              <span className="text-[#1DB954]">Completed</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Updated {formatDate(sprint.updated_at)}</span>
          </div>
        </div>
      )}

      <DeleteSprintModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        sprint={sprint}
      />
    </motion.div>
  )
}

export default SprintHeader

