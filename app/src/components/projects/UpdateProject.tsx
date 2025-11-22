import ProjectForm from './ProjectForm'
import useUpdateProject from '@/hooks/api/projects/useUpdateProject'
import type { Project } from '@/services/api/projectService'

interface UpdateProjectProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
}

const UpdateProject = ({ isOpen, onClose, project }: UpdateProjectProps) => {
  const updateProject = useUpdateProject()

  return (
    <ProjectForm 
      updateProject={updateProject} 
      isOpen={isOpen} 
      onClose={onClose} 
      project={project}
    />
  )
}

export default UpdateProject

