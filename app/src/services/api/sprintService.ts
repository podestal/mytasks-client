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

export const createSprintService = () => {
    return new APIClient<Sprint, CreateSprintRequest>(`/sprints`)
}