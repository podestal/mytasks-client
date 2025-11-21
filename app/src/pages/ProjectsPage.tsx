import axios from 'axios'
import { FolderKanban, Calendar, CheckCircle2, XCircle, Clock, Rocket, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Mock data based on your backend schema
const mockProjects = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with payment integration and inventory management',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T14:30:00Z',
    sprints: [
      {
        id: 1,
        project_id: 1,
        name: 'Sprint 1: User Authentication',
        description: 'Implement user registration, login, and password reset',
        deadline: '2024-02-15',
        status: 'D', // Completed
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-02-10T16:00:00Z',
      },
      {
        id: 2,
        project_id: 1,
        name: 'Sprint 2: Product Catalog',
        description: 'Build product listing, search, and filtering features',
        deadline: '2024-03-01',
        status: 'A', // Active
        created_at: '2024-02-11T09:00:00Z',
        updated_at: '2024-02-20T11:00:00Z',
      },
      {
        id: 3,
        project_id: 1,
        name: 'Sprint 3: Checkout Flow',
        description: 'Implement shopping cart and payment processing',
        deadline: '2024-03-20',
        status: 'A', // Active
        created_at: '2024-02-25T10:00:00Z',
        updated_at: '2024-02-25T10:00:00Z',
      },
    ],
  },
  {
    id: 2,
    name: 'Task Management App',
    description: 'Collaborative task management tool for teams',
    created_at: '2024-02-01T08:00:00Z',
    updated_at: '2024-02-18T15:45:00Z',
    sprints: [
      {
        id: 4,
        project_id: 2,
        name: 'Sprint 1: Core Features',
        description: 'Basic task creation, editing, and deletion',
        deadline: '2024-02-28',
        status: 'D', // Completed
        created_at: '2024-02-01T08:00:00Z',
        updated_at: '2024-02-25T17:00:00Z',
      },
      {
        id: 5,
        project_id: 2,
        name: 'Sprint 2: Team Collaboration',
        description: 'Add team members, assign tasks, and notifications',
        deadline: '2024-03-15',
        status: 'A', // Active
        created_at: '2024-02-26T09:00:00Z',
        updated_at: '2024-02-26T09:00:00Z',
      },
    ],
  },
  {
    id: 3,
    name: 'Analytics Dashboard',
    description: 'Real-time analytics and reporting dashboard',
    created_at: '2024-01-20T12:00:00Z',
    updated_at: '2024-02-05T10:20:00Z',
    sprints: [
      {
        id: 6,
        project_id: 3,
        name: 'Sprint 1: Data Collection',
        description: 'Set up data pipelines and event tracking',
        deadline: '2024-02-10',
        status: 'D', // Completed
        created_at: '2024-01-20T12:00:00Z',
        updated_at: '2024-02-08T14:00:00Z',
      },
      {
        id: 7,
        project_id: 3,
        name: 'Sprint 2: Visualization',
        description: 'Create charts and graphs for data visualization',
        deadline: '2024-02-25',
        status: 'C', // Canceled
        created_at: '2024-02-11T10:00:00Z',
        updated_at: '2024-02-20T13:00:00Z',
      },
    ],
  },
  {
    id: 4,
    name: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication',
    created_at: '2024-02-10T09:00:00Z',
    updated_at: '2024-02-22T16:30:00Z',
    sprints: [
      {
        id: 8,
        project_id: 4,
        name: 'Sprint 1: Security Foundation',
        description: 'Implement encryption, secure storage, and authentication',
        deadline: '2024-03-05',
        status: 'A', // Active
        created_at: '2024-02-10T09:00:00Z',
        updated_at: '2024-02-22T16:30:00Z',
      },
    ],
  },
]

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'A': // Active
      return {
        label: 'Active',
        icon: Clock,
        className: 'bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30',
        iconClassName: 'text-[#1DB954]',
      }
    case 'D': // Completed
      return {
        label: 'Completed',
        icon: CheckCircle2,
        className: 'bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30',
        iconClassName: 'text-[#1DB954]',
      }
    case 'C': // Canceled
      return {
        label: 'Canceled',
        icon: XCircle,
        className: 'bg-red-500/20 text-red-400 border-red-500/30',
        iconClassName: 'text-red-400',
      }
    default:
      return {
        label: 'Unknown',
        icon: Clock,
        className: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        iconClassName: 'text-gray-400',
      }
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const ProjectsPage = () => {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set())

  const toggleSprints = (projectId: number) => {
    setExpandedProjects((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/projects').then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.error(error)
    })
  }, [])
  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-8">
      <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[95%] 2xl:max-w-6xl ml-0 mr-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="p-3 bg-[#1DB954] rounded-2xl shadow-lg"
            >
              <Rocket className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-2">
                Projects
              </h1>
              <div className="flex items-center gap-2 text-gray-400">
                <TrendingUp className="w-5 h-5" />
                <p className="text-lg font-medium">
                  Track progress, manage sprints, and deliver results
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-6">
          {mockProjects.map((project, index) => {
            const activeSprints = project.sprints.filter((s) => s.status === 'A').length
            const completedSprints = project.sprints.filter((s) => s.status === 'D').length
            const totalSprints = project.sprints.length

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#1a1a1a] rounded-2xl shadow-lg hover:bg-[#242424] transition-all duration-300 overflow-hidden border border-gray-800"
              >
                {/* Project Header */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  className="bg-[#1a1a1a] border-l-4 border-[#1DB954] p-4 shadow-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="p-2 bg-[#1DB954] rounded-lg shadow-sm"
                      >
                        <FolderKanban className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-white">{project.name}</h2>
                        <p className="text-gray-400 text-xs mt-1">
                          {totalSprints} sprint{totalSprints !== 1 ? 's' : ''} •{' '}
                          <span className="text-[#1DB954]">{completedSprints} completed</span>
                        </p>
                      </div>
                    </div>
                    {project.sprints.length > 0 && (
                      <motion.button
                        onClick={() => toggleSprints(project.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        aria-label={expandedProjects.has(project.id) ? 'Hide sprints' : 'Show sprints'}
                      >
                        {expandedProjects.has(project.id) ? (
                          <ChevronUp className="w-5 h-5 text-[#1DB954]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </motion.button>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </motion.div>

                {/* Sprints Section */}
                <AnimatePresence>
                  {expandedProjects.has(project.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-4">
                        <div className="space-y-3">
                          {project.sprints.length === 0 ? (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-gray-400 text-center py-8"
                            >
                              No sprints yet
                            </motion.p>
                          ) : (
                            project.sprints.map((sprint, sprintIndex) => {
                              const statusConfig = getStatusConfig(sprint.status)
                              const StatusIcon = statusConfig.icon
                              const daysUntilDeadline = Math.ceil(
                                (new Date(sprint.deadline).getTime() - new Date().getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )

                              return (
                                <motion.div
                                  key={sprint.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: sprintIndex * 0.05 }}
                                  whileHover={{ x: 4 }}
                                  className="border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors bg-[#242424]"
                                >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className="font-semibold text-white mb-1">
                                  {sprint.name}
                                </h3>
                                {sprint.description && (
                                  <p className="text-sm text-gray-400 mb-3">
                                    {sprint.description}
                                  </p>
                                )}
                              </div>
                              <div
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.className}`}
                              >
                                <StatusIcon className={`w-3.5 h-3.5 ${statusConfig.iconClassName}`} />
                                <span>{statusConfig.label}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  Due: {formatDate(sprint.deadline)}
                                </span>
                                {sprint.status === 'A' && (
                                  <span
                                    className={`ml-2 px-2 py-0.5 rounded ${
                                      daysUntilDeadline < 7
                                        ? 'bg-red-500/20 text-red-400'
                                        : daysUntilDeadline < 14
                                          ? 'bg-yellow-500/20 text-yellow-400'
                                          : 'bg-[#1DB954]/20 text-[#1DB954]'
                                    }`}
                                  >
                                    {daysUntilDeadline > 0
                                      ? `${daysUntilDeadline} day${daysUntilDeadline !== 1 ? 's' : ''} left`
                                      : 'Overdue'}
                                  </span>
                                )}
                              </div>
                                </div>
                              </motion.div>
                            )
                          })
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

                {/* Project Footer Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  className="px-6 py-4 bg-[#121212] border-t border-gray-800"
                >
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-pulse"></div>
                        <span className="text-gray-400">
                          {activeSprints} active
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1DB954]" />
                        <span className="text-gray-400">
                          {completedSprints} completed
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-500 text-xs">
                      Updated {formatDate(project.updated_at)}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage