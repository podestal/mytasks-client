export const getPriorityColor = (priority?: string) => {
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

export const getPriorityLabel = (priority?: string) => {
  switch (priority) {
    case 'H':
      return 'High'
    case 'M':
      return 'Medium'
    case 'L':
      return 'Low'
    default:
      return 'Unknown'
  }
}

