import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProjectService } from '../../../services/api/projectService'
import type { Project, CreateUpdateProject } from '@/services/api/projectService'

export interface updateProjectData {
    access: string
    projectId: number
    project: CreateUpdateProject
}

const useUpdateProject = () => {
    const queryClient = useQueryClient()
    return useMutation<Project, Error, updateProjectData>({
        mutationFn: (data: updateProjectData) => {
            const service = updateProjectService(data.projectId)
            return service.update(data.project, data.access)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        },
        onError: (error) => {
            console.error('Error updating project', error)
        },
    })
}

export default useUpdateProject

