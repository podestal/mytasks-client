import { useMutation, type UseMutationResult, useQueryClient } from "@tanstack/react-query"
import { createProjectService, type CreateUpdateProject, type Project } from "@/services/api/projectService"

export interface createProjectData {
    access: string
    project: CreateUpdateProject
}

const useCreateProject = (): UseMutationResult<Project, Error, createProjectData> => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: createProjectData) => createProjectService.post(data.project, data.access),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        },
        onError: (error) => {
            console.error(error)
        },

    })
}

export default useCreateProject