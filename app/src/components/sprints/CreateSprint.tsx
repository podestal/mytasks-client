import SprintForm from './SprintForm'
import useCreateSprint from '@/hooks/api/sprints/useCreateSprint'

interface CreateSprintProps {
  isOpen: boolean
  onClose: () => void
  projectId: number
}

const CreateSprint = ({ isOpen, onClose, projectId }: CreateSprintProps) => {
  const createSprint = useCreateSprint()

  return (
    <SprintForm 
      createSprint={createSprint} 
      isOpen={isOpen} 
      onClose={onClose} 
      projectId={projectId}
    />
  )
}

export default CreateSprint

