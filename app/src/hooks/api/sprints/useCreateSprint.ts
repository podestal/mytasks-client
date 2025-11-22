import { useMutation } from '@tanstack/react-query'
import { createSprintService } from '../../../services/api/sprintService'
import type { Sprint } from '@/services/api/sprintService'

export interface createSprintData {
    access: string
    sprint: {
        project_id: number
        name: string
        description: string
        deadline: string
    }
}

const useCreateSprint = () => {
    return useMutation<Sprint, Error, createSprintData>({
        mutationFn: (data: createSprintData) => {
            const service = createSprintService()
            return service.post(data.sprint, data.access)
        },
    })
}

export default useCreateSprint

