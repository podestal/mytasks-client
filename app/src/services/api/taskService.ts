import APIClient from "./apiClient"

export interface Task {
    id: number
    sprint_id: number
    description: string
    status: string
    priority: string
    created_at: string
    updated_at: string
}

export interface CreateTaskRequest {
    sprint_id: number
    description: string
    priority: string
    status: string
}

export interface UpdateTaskRequest {
    status?: string
    priority?: string
    description?: string
}

interface Props {
    sprintId: number
}

export const getTasksBySprintIdService = ({ sprintId }: Props) => {
    return new APIClient<Task[]>(`/tasks/by-sprint/${sprintId}`)
}

export const createTaskService = () => {
    return new APIClient<Task, CreateTaskRequest>('/tasks')
}

export const deleteTaskService = (taskId: number) => {
    return new APIClient<Task, void>(`/tasks/${taskId}`)
}

export const updateTaskService = (taskId: number) => {
    return new APIClient<Task, UpdateTaskRequest>(`/tasks/${taskId}`)
}