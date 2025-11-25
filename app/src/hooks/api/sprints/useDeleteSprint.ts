import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteSprintService } from '../../../services/api/sprintService'
import type { Sprint } from '@/services/api/sprintService'

export interface DeleteSprintData {
    access: string
    sprintId: number
}

const useDeleteSprint = () => {
    const queryClient = useQueryClient()
    return useMutation<Sprint, Error, DeleteSprintData>({
        mutationFn: (data: DeleteSprintData) => {
            const service = deleteSprintService(data.sprintId)
            return service.delete(data.access)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sprints'] })
            queryClient.invalidateQueries({ queryKey: ['sprint'] })
        },
        onError: (error) => {
            console.error('Error deleting sprint', error)
        },
    })
}

export default useDeleteSprint

