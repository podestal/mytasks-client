import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import { getSprintByIdService, type Sprint } from "@/services/api/sprintService"

interface Props {
    access: string
    sprintId: number
    enabled?: boolean
}

const useGetSprintById = ({ access, sprintId, enabled = true }: Props): UseQueryResult<Sprint, Error> => {
    const sprintService = getSprintByIdService(sprintId)
    return useQuery({
        queryKey: ['sprint', sprintId],
        queryFn: async () => {
            const data = await sprintService.get(access)
            // Handle case where API might return an array (like the old axios code did)
            if (Array.isArray(data) && data.length > 0) {
                return data[0] as Sprint
            }
            return data as Sprint
        },
        enabled: enabled && !!sprintId,
    })
}

export default useGetSprintById

