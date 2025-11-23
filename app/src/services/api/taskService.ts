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

interface Props {
    sprintId: number
}

export const getTasksBySprintIdService = ({ sprintId }: Props) => {
    return new APIClient<Task[]>(`/tasks/by-sprint/${sprintId}`)
}

export const createTaskService = () => {
    return new APIClient<Task, CreateTaskRequest>('/tasks')
}