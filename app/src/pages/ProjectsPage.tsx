import axios from 'axios'
import { FolderKanban, Calendar, CheckCircle2, XCircle, Clock, Rocket, TrendingUp } from 'lucide-react'
import { useEffect } from 'react'

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
        className: 'bg-blue-100 text-blue-700 border-blue-200',
        iconClassName: 'text-blue-600',
      }
    case 'D': // Completed
      return {
        label: 'Completed',
        icon: CheckCircle2,
        className: 'bg-green-100 text-green-700 border-green-200',
        iconClassName: 'text-green-600',
      }
    case 'C': // Canceled
      return {
        label: 'Canceled',
        icon: XCircle,
        className: 'bg-red-100 text-red-700 border-red-200',
        iconClassName: 'text-red-600',
      }
    default:
      return {
        label: 'Unknown',
        icon: Clock,
        className: 'bg-gray-100 text-gray-700 border-gray-200',
        iconClassName: 'text-gray-600',
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

    useEffect(() => {
        axios.get('http://localhost:3000/api/projects').then((response) => {
          console.log(response.data)
        }).catch((error) => {
          console.error(error)
        })
      }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[95%] 2xl:max-w-6xl ml-0 mr-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 bg-clip-text text-transparent mb-2">
                Projects
              </h1>
              <div className="flex items-center gap-2 text-gray-600">
                <TrendingUp className="w-5 h-5" />
                <p className="text-lg font-medium">
                  Track progress, manage sprints, and deliver results
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {mockProjects.map((project) => {
            const activeSprints = project.sprints.filter((s) => s.status === 'A').length
            const completedSprints = project.sprints.filter((s) => s.status === 'D').length
            const totalSprints = project.sprints.length

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Project Header */}
                <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-blue-800 p-6 text-white shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <FolderKanban className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{project.name}</h2>
                        <p className="text-indigo-200 text-sm mt-1">
                          {totalSprints} sprint{totalSprints !== 1 ? 's' : ''} •{' '}
                          {completedSprints} completed
                        </p>
                      </div>
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-indigo-100 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>

                {/* Sprints Section */}
                <div className="p-6">
                  <div className="space-y-3">
                    {project.sprints.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">
                        No sprints yet
                      </p>
                    ) : (
                      project.sprints.map((sprint) => {
                        const statusConfig = getStatusConfig(sprint.status)
                        const StatusIcon = statusConfig.icon
                        const daysUntilDeadline = Math.ceil(
                          (new Date(sprint.deadline).getTime() - new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        )

                        return (
                          <div
                            key={sprint.id}
                            className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors bg-gray-50/50"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">
                                  {sprint.name}
                                </h3>
                                {sprint.description && (
                                  <p className="text-sm text-gray-600 mb-3">
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

                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  Due: {formatDate(sprint.deadline)}
                                </span>
                                {sprint.status === 'A' && (
                                  <span
                                    className={`ml-2 px-2 py-0.5 rounded ${
                                      daysUntilDeadline < 7
                                        ? 'bg-red-100 text-red-700'
                                        : daysUntilDeadline < 14
                                          ? 'bg-yellow-100 text-yellow-700'
                                          : 'bg-green-100 text-green-700'
                                    }`}
                                  >
                                    {daysUntilDeadline > 0
                                      ? `${daysUntilDeadline} day${daysUntilDeadline !== 1 ? 's' : ''} left`
                                      : 'Overdue'}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>

                {/* Project Footer Stats */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-gray-600">
                          {activeSprints} active
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-600">
                          {completedSprints} completed
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-500 text-xs">
                      Updated {formatDate(project.updated_at)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage