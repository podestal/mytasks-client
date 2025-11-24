import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTaskService } from '../../../services/api/taskService'
import type { Task } from '@/services/api/taskService'

export interface deleteTaskData {
    access: string
    taskId: number
    sprintId: number
}

const useDeleteTask = () => {
    const queryClient = useQueryClient()
    return useMutation<Task, Error, deleteTaskData>({
        mutationFn: (data: deleteTaskData) => {
            const service = deleteTaskService(data.taskId)
            return service.delete(data.access)
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tasks', variables.sprintId] })
        },
        onError: (error) => {
            console.error('Error deleting task', error)
        },
    })
}

export default useDeleteTask

