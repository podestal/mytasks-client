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

interface Props {
    sprintId: number
}

export const getTasksBySprintIdService = ({ sprintId }: Props) => {
    return new APIClient<Task[]>(`/tasks/by-sprint/${sprintId}`)
}