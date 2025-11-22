import APIClient from "./apiClient"

export interface Project {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
    totalSprints: number
    completedSprints: number
}

export type CreateUpdateProject = Omit<Project, 'id' | 'created_at' | 'updated_at' | 'totalSprints' | 'completedSprints'> 

interface Props {
    projectId?: number
}

export const createProjectService = new APIClient<Project, CreateUpdateProject>('/projects')

export const updateProjectService = (projectId: number) => {
    return new APIClient<Project, CreateUpdateProject>(`/projects/${projectId}`)
}

export const deleteProjectService = (projectId: number) => {
    return new APIClient<Project, void>(`/projects/${projectId}`)
}

const getProjectsService = ({ projectId }: Props) => {
    let url = '/projects'
    if (projectId) {
        url += `/${projectId}`
    }

    return new APIClient<Project[], CreateUpdateProject>(url)
}

export default getProjectsService