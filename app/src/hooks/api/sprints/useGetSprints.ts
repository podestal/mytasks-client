import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import { getSprintService, type Sprint } from "@/services/api/sprintService"

interface Props {
    access: string
    projectId: number
}

const useGetSprints = ({ access, projectId }: Props): UseQueryResult<Sprint[], Error> => {
    const sprintService = getSprintService({ projectId })
    return useQuery({
        queryKey: ['sprints', projectId],
        queryFn: () => sprintService.get(access),
    })
}

export default useGetSprints