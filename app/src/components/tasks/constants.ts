export type TaskStatus = 'T' | 'P' | 'R' | 'D'

export interface Column {
  id: 'T' | 'P' | 'R' | 'D' | 'delete'
  label: string
  color: string
}

export const columns: Column[] = [
  { id: 'T', label: 'Todo', color: 'bg-gray-500/20 border-gray-500/30' },
  { id: 'P', label: 'In Progress', color: 'bg-blue-500/20 border-blue-500/30' },
  { id: 'R', label: 'In Review', color: 'bg-yellow-500/20 border-yellow-500/30' },
  { id: 'D', label: 'Done', color: 'bg-[#1DB954]/20 border-[#1DB954]/30' },
  { id: 'delete', label: 'Delete', color: 'bg-red-500/20 border-red-500/30' },
]

