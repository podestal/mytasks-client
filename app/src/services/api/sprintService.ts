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