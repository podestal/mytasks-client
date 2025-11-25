import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSprintService, type UpdateSprintRequest } from '../../../services/api/sprintService'
import type { Sprint } from '@/services/api/sprintService'

export interface UpdateSprintData {
    access: string
    sprintId: number
    sprint: UpdateSprintRequest
}

const useUpdateSprint = () => {
    const queryClient = useQueryClient()
    return useMutation<Sprint, Error, UpdateSprintData>({
        mutationFn: (data: UpdateSprintData) => {
            const service = updateSprintService(data.sprintId)
            return service.update(data.sprint, data.access)
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['sprint', variables.sprintId] })
            queryClient.invalidateQueries({ queryKey: ['sprints'] })
        },
        onError: (error) => {
            console.error('Error updating sprint', error)
        },
    })
}

export default useUpdateSprint

