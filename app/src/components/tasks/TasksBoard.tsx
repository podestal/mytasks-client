import type { Task } from "@/services/api/taskService"
import { useMemo, useState, useEffect, useCallback } from "react"
import { columns } from "./constants"
import KanbanColumn from "./KanbanColumn"
import DeleteColumn from "./DeleteColumn"
import { useDragAndDrop } from "./useDragAndDrop"

interface Props {
  initialTasks: Task[]
  sprintId: number
}

const TasksBoard = ({ initialTasks, sprintId }: Props) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  // Sync tasks when initialTasks changes (e.g., after creating a new task)
  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks])

  // Memoize tasks by status to prevent unnecessary recalculations
  const tasksByStatus = useMemo(() => {
    const grouped: Record<string, Task[]> = {
      T: [],
      P: [],
      R: [],
      D: [],
    }
    tasks.forEach((task) => {
      if (grouped[task.status]) {
        grouped[task.status].push(task)
      }
    })
    return grouped
  }, [tasks])

  const handleTasksChange = useCallback((updater: (prev: Task[]) => Task[]) => {
    setTasks(updater)
  }, [])

  const {
    draggedTask,
    draggedOverColumn,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
  } = useDragAndDrop({
    tasks,
    sprintId,
    onTasksChange: handleTasksChange,
  })

  const getTasksByStatus = useCallback((status: string) => {
    if (status === 'delete') return []
    return tasksByStatus[status] || []
  }, [tasksByStatus])

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {columns.map((column) => {
        if (column.id === 'delete') {
          return (
            <DeleteColumn
              key={column.id}
              column={column}
              isDraggedOver={draggedOverColumn === column.id}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={handleDragEnd}
            />
          )
        }

        return (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={getTasksByStatus(column.id)}
            draggedTask={draggedTask}
            isDraggedOver={draggedOverColumn === column.id}
            sprintId={sprintId}
            onDragStart={handleDragStart}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={handleDragEnd}
          />
        )
      })}
    </div>
  )
}

export default TasksBoard