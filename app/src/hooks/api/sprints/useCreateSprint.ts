import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSprintService, type CreateSprintRequest } from '../../../services/api/sprintService'
import type { Sprint } from '@/services/api/sprintService'

export interface createSprintData {
    access: string
    sprint: CreateSprintRequest
}

const useCreateSprint = () => {
    const queryClient = useQueryClient()
    return useMutation<Sprint, Error, createSprintData>({
        mutationFn: (data: createSprintData) => {
            const service = createSprintService()
            return service.post(data.sprint, data.access)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sprints'] })
        },
        onError: (error) => {
            console.error('Error creating sprint', error)
        },
    })
}

export default useCreateSprint

