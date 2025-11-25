import APIClient from "@/services/api/apiClient"

export interface Sprint {
    id: number
    project_id: number
    name: string
    description: string
    deadline: string
    status: string
    created_at: string
    updated_at: string
}

export interface CreateSprintRequest {
    project_id: number
    name: string
    description: string
    deadline: string
}

export interface UpdateSprintRequest {
    name?: string
    description?: string
    deadline?: string
    status?: string
}

interface Props {
    projectId?: number
}

export const getSprintService = ({ projectId }: Props) => {
    let url = '/projects'
    if (projectId) {
        url += `/${projectId}/sprints`
    }

    return new APIClient<Sprint[]>(url)
}

export const getSprintByIdService = (sprintId: number) => {
    return new APIClient<Sprint>(`/sprints/${sprintId}`)
}

export const createSprintService = () => {
    return new APIClient<Sprint, CreateSprintRequest>(`/sprints`)
}

export const updateSprintService = (sprintId: number) => {
    return new APIClient<Sprint, UpdateSprintRequest>(`/sprints/${sprintId}`)
}

export const deleteSprintService = (sprintId: number) => {
    return new APIClient<Sprint, void>(`/sprints/${sprintId}`)
}