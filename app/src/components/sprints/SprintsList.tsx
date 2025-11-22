import useGetSprints from "@/hooks/api/sprints/useGetSprints"
import SprintCard from "./SprintCard"

interface Props {
    projectId: number
}
const SprintsList = ({ projectId }: Props) => {

    const { data: sprints, isLoading, error } = useGetSprints({ access: 'dasdas', projectId })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <>
        {sprints?.map((sprint, index) => <SprintCard key={sprint.id} sprint={sprint} sprintIndex={index} />)}
        </>
    )
}

export default SprintsList