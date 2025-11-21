import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import getProjectsService, { type Project } from "../../../services/api/projectService"

interface Props {
    access: string
}

const useGetProjects = ({ access }: Props): UseQueryResult<Project[], Error> => {

    const projectsService = getProjectsService({ })
    return useQuery({
        queryKey: ['projects'],
        queryFn: () => projectsService.get(access),
    })
}

export default useGetProjects