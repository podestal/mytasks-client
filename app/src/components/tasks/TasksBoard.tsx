import type { Task } from "@/services/api/taskService"
import { AnimatePresence, motion } from "framer-motion"
import { Trash2, User } from "lucide-react"
import { useCallback, useMemo, useState, useEffect } from "react"
import CreateTask from "./CreateTask"
import useDeleteTask from "@/hooks/api/tasks/useDeleteTask"
import useUpdateTask from "@/hooks/api/tasks/useUpdateTask"

interface Props {
    initialTasks: Task[]
    sprintId: number
}

// Task status types
type TaskStatus = 'T' | 'P' | 'R' | 'D'

const columns = [
    { id: 'T', label: 'Todo', color: 'bg-gray-500/20 border-gray-500/30' },
    { id: 'P', label: 'In Progress', color: 'bg-blue-500/20 border-blue-500/30' },
    { id: 'R', label: 'In Review', color: 'bg-yellow-500/20 border-yellow-500/30' },
    { id: 'D', label: 'Done', color: 'bg-[#1DB954]/20 border-[#1DB954]/30' },
    { id: 'delete', label: 'Delete', color: 'bg-red-500/20 border-red-500/30' },
  ]

const TasksBoard = ({ initialTasks, sprintId }: Props) => {
    console.log('from tasks board', initialTasks)
    const [draggedTask, setDraggedTask] = useState<Task | null>(null)
    const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(null)
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const deleteTask = useDeleteTask()
    const updateTask = useUpdateTask()

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

    const getPriorityColor = (priority?: string) => {
        switch (priority) {
          case 'H':
            return 'bg-red-500/20 text-red-400 border-red-500/30'
          case 'M':
            return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
          case 'L':
            return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
          default:
            return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
        }
      }

      const handleDragStart = useCallback((task: Task) => {
        setDraggedTask(task)
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
                setTasks((prevTasks) => prevTasks.filter((t) => t.id !== draggedTask.id))
              },
              onError: (error) => {
                console.error('Failed to delete task:', error)
                // Optionally show error message to user
              }
            })
          } else if (draggedOverColumn !== draggedTask.status) {
            // Update task status via API
            const newStatus = draggedOverColumn as TaskStatus
            // Optimistically update local state
            setTasks((prevTasks) =>
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
                setTasks((prevTasks) =>
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
      }, [draggedTask, draggedOverColumn, deleteTask, updateTask, sprintId])
    
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
    
      const getTasksByStatus = useCallback((status: string) => {
        if (status === 'delete') return []
        return tasksByStatus[status] || []
      }, [tasksByStatus])
  return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {columns.map((column) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
              }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col ${
                column.id === 'delete' 
                  ? 'w-full aspect-square max-w-[200px] mx-auto md:mx-0' 
                  : 'h-full min-h-[500px]'
              } ${draggedOverColumn === column.id ? 'ring-2 ring-[#1DB954] ring-offset-2 ring-offset-[#121212]' : ''}`}
              style={{
                willChange: draggedOverColumn === column.id ? 'transform' : 'auto',
              }}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={handleDragEnd}
            >
              {/* Column Header */}
              <div className={`flex items-center justify-between mb-4 rounded-xl border-2 ${column.color} p-3 ${
                draggedOverColumn === column.id && column.id === 'delete' ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-[#121212]' : ''
              }`}>
                <h2 className="font-semibold text-white text-sm uppercase tracking-wide">
                  {column.label}
                </h2>
                <span className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded">
                  {column.id === 'delete' ? 0 : getTasksByStatus(column.id).length}
                </span>
              </div>

              {/* Tasks in this column */}
              <div className={column.id === 'delete' ? 'flex-1' : 'flex-1 space-y-3'}>
                <AnimatePresence>
                  {column.id === 'delete' ? (
                    <div className={`flex items-center justify-center h-full rounded-xl border-2 ${column.color} ${
                      draggedOverColumn === column.id ? 'ring-2 ring-red-500' : ''
                    }`}>
                      <div className="text-center p-4">
                        <Trash2 className="w-12 h-12 text-red-400/50 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">Drop tasks here to delete</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Create Task Form - Only show in Todo column */}
                      {column.id === 'T' && (
                        <CreateTask sprintId={sprintId} />
                      )}
                      {getTasksByStatus(column.id).map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: draggedTask?.id === task.id ? 0.5 : 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, x: -100 }}
                        transition={{ duration: 0.15 }}
                        draggable
                        {...({
                          onDragStart: (e: React.DragEvent<HTMLDivElement>) => {
                            handleDragStart(task)
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
                          }
                        } as any)}
                        className={`bg-black rounded-lg p-3 border border-gray-700 hover:border-[#1DB954]/50 cursor-grab shadow-lg transition-opacity duration-150 ${
                          draggedTask?.id === task.id ? 'opacity-50' : ''
                        }`}
                        style={{
                          willChange: 'opacity',
                          touchAction: 'none',
                        }}
                        onDragEnd={(e) => {
                          (e.currentTarget as HTMLElement).style.cursor = 'grab'
                        }}
                      >
                        <div className="mb-2">
                          <h3 className="font-semibold text-white text-sm mb-1">
                            {task.description}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          {task.priority && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(
                                task.priority
                              )}`}
                            >
                              {task.priority === 'H' ? 'High' : task.priority === 'M' ? 'Medium' : 'Low'}
                            </span>
                          )}
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                              <User className="w-3 h-3" />
                              <span className="truncate max-w-[80px]">Luis Rodriguez</span>
                            </div>
                        </div>
                      </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
  )
}

export default TasksBoard