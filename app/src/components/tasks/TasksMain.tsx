import { useGetTasksBySprint } from '@/hooks/api/tasks/useGetTasksBySprint'
import TasksBoard from './TasksBoard'

interface Props {
    sprintId: number
}

const TasksMain = ({ sprintId }: Props) => {

    const { data: tasks, isLoading, error, isSuccess } = useGetTasksBySprint({ access: '', sprintId })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (isSuccess)

    return (
        <TasksBoard initialTasks={tasks} sprintId={sprintId} />
    )
}

export default TasksMain
