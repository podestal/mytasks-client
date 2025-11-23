import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTaskService, type CreateTaskRequest } from '../../../services/api/taskService'
import type { Task } from '@/services/api/taskService'

export interface createTaskData {
    access: string
    task: CreateTaskRequest
}

const useCreateTask = () => {
    const queryClient = useQueryClient()
    return useMutation<Task, Error, createTaskData>({
        mutationFn: (data: createTaskData) => {
            const service = createTaskService()
            return service.post(data.task, data.access)
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tasks', variables.task.sprint_id] })
        },
        onError: (error) => {
            console.error('Error creating task', error)
        },
    })
}

export default useCreateTask

