import useGetSprints from "@/hooks/api/sprints/useGetSprints"

interface Props {
    projectId: number
}
const SprintsList = ({ projectId }: Props) => {

    const { data: sprints, isLoading, error } = useGetSprints({ access: 'dasdas', projectId })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            <>{console.log('sprints', sprints)}</>
        </div>
    )
}

export default SprintsList