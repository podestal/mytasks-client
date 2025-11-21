import APIClient from "./apiClient"

export interface Project {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
}

interface Props {
    projectId?: number
}

const getProjectsService = ({ projectId }: Props) => {
    let url = '/projects'
    if (projectId) {
        url += `/${projectId}`
    }

    return new APIClient<Project[]>(url)
}

export default getProjectsService