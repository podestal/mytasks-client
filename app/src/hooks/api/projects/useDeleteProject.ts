import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProjectService } from '../../../services/api/projectService'
import type { Project } from '@/services/api/projectService'

export interface deleteProjectData {
    access: string
    projectId: number
}

const useDeleteProject = () => {
    const queryClient = useQueryClient()
    return useMutation<Project, Error, deleteProjectData>({
        mutationFn: (data: deleteProjectData) => {
            const service = deleteProjectService(data.projectId)
            return service.delete(data.access)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        },
        onError: (error) => {
            console.error('Error deleting project', error)
        },
    })
}

export default useDeleteProject

