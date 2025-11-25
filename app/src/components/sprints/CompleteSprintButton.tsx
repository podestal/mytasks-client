import { CheckCircle } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import useUpdateSprint from '@/hooks/api/sprints/useUpdateSprint'

interface CompleteSprintButtonProps {
  sprintId: number
}

const CompleteSprintButton = ({ sprintId }: CompleteSprintButtonProps) => {
  const updateSprint = useUpdateSprint()
  const navigate = useNavigate()

  const handleComplete = () => {
    updateSprint.mutate(
      {
        access: '',
        sprintId,
        sprint: {
          status: 'D',
        },
      },
      {
        onSuccess: () => {
          navigate({ to: '/projects' })
        },
      }
    )
  }

  return (
    <button
      onClick={handleComplete}
      disabled={updateSprint.isPending}
      className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1DB954]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="Mark sprint as complete"
    >
      <CheckCircle className="w-4 h-4" />
      {updateSprint.isPending ? 'Completing...' : 'Complete'}
    </button>
  )
}

export default CompleteSprintButton

