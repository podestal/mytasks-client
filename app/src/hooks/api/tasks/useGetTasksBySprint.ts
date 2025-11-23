import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import { getTasksBySprintIdService, type Task } from "../../../services/api/taskService"

interface Props {
    sprintId: number
    access: string
}

export const useGetTasksBySprint = ({ sprintId, access }: Props): UseQueryResult<Task[], Error> => {
    return useQuery({
        queryKey: ['tasks', sprintId],
        queryFn: () => getTasksBySprintIdService({ sprintId }).get(access),
    })
}