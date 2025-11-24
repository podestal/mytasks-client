import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTaskService } from '../../../services/api/taskService'
import type { Task, UpdateTaskRequest } from '@/services/api/taskService'

export interface UpdateTaskData {
    access: string
    taskId: number
    sprintId: number
    task: UpdateTaskRequest
}

const useUpdateTask = () => {
    const queryClient = useQueryClient()
    return useMutation<Task, Error, UpdateTaskData>({
        mutationFn: (data: UpdateTaskData) => {
            const service = updateTaskService(data.taskId)
            return service.update(data.task, data.access)
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tasks', variables.sprintId] })
        },
        onError: (error) => {
            console.error('Error updating task', error)
        },
    })
}

export default useUpdateTask

