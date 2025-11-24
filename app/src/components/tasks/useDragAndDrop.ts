import { useCallback, useState } from "react"
import type { Task } from "@/services/api/taskService"
import type { TaskStatus } from "./constants"
import useDeleteTask from "@/hooks/api/tasks/useDeleteTask"
import useUpdateTask from "@/hooks/api/tasks/useUpdateTask"

interface UseDragAndDropProps {
  tasks: Task[]
  sprintId: number
  onTasksChange: (updater: (prev: Task[]) => Task[]) => void
}

export const useDragAndDrop = ({ tasks, sprintId, onTasksChange }: UseDragAndDropProps) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(null)
  const deleteTask = useDeleteTask()
  const updateTask = useUpdateTask()

  const handleDragStart = useCallback((task: Task, e: React.DragEvent<HTMLDivElement>) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', task.id.toString())
    
    // Create a translucent drag preview
    const dragElement = e.currentTarget.cloneNode(true) as HTMLElement
    dragElement.style.opacity = '0.6'
    dragElement.style.transform = 'rotate(3deg)'
    dragElement.style.pointerEvents = 'none'
    dragElement.style.position = 'absolute'
    dragElement.style.top = '-1000px'
    dragElement.style.width = e.currentTarget.offsetWidth + 'px'
    dragElement.style.zIndex = '9999'
    
    document.body.appendChild(dragElement)
    
    // Calculate offset to center the drag image on cursor
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top
    
    e.dataTransfer.setDragImage(dragElement, offsetX, offsetY)
    
    // Clean up after a short delay
    setTimeout(() => {
      if (document.body.contains(dragElement)) {
        document.body.removeChild(dragElement)
      }
    }, 0)
  }, [])

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (draggedTask && draggedOverColumn) {
      if (draggedOverColumn === 'delete') {
        // Delete task via API
        deleteTask.mutate({
          access: '',
          taskId: draggedTask.id,
          sprintId: sprintId,
        }, {
          onSuccess: () => {
            // Optimistically update local state
            onTasksChange((prevTasks) => prevTasks.filter((t) => t.id !== draggedTask.id))
          },
          onError: (error) => {
            console.error('Failed to delete task:', error)
          }
        })
      } else if (draggedOverColumn !== draggedTask.status) {
        // Update task status via API
        const newStatus = draggedOverColumn as TaskStatus
        // Optimistically update local state
        onTasksChange((prevTasks) =>
          prevTasks.map((t) =>
            t.id === draggedTask.id
              ? { ...t, status: newStatus, updated_at: new Date().toISOString() }
              : t
          )
        )
        // Call API to update task status
        updateTask.mutate({
          access: '',
          taskId: draggedTask.id,
          sprintId: sprintId,
          task: {
            status: newStatus,
          }
        }, {
          onError: (error) => {
            console.error('Failed to update task:', error)
            // Revert optimistic update on error
            onTasksChange((prevTasks) =>
              prevTasks.map((t) =>
                t.id === draggedTask.id
                  ? { ...t, status: draggedTask.status, updated_at: draggedTask.updated_at }
                  : t
              )
            )
          }
        })
      }
    }
    setDraggedTask(null)
    setDraggedOverColumn(null)
  }, [draggedTask, draggedOverColumn, deleteTask, updateTask, sprintId, onTasksChange])

  const handleDragOver = useCallback((e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    e.stopPropagation()
    setDraggedOverColumn(columnId)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    // Only clear if we're actually leaving (not entering a child element)
    const relatedTarget = e.relatedTarget as HTMLElement | null
    if (!relatedTarget || !(e.currentTarget as HTMLElement).contains(relatedTarget)) {
      setDraggedOverColumn(null)
    }
  }, [])

  return {
    draggedTask,
    draggedOverColumn,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
  }
}

