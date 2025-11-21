import axios from 'axios'
import { FolderKanban, Calendar, CheckCircle2, XCircle, Clock, Rocket, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import ProjectsMain from '@/components/projects/ProjectsMain'

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

  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/projects').then((response) => {
  //     console.log(response.data)
  //   }).catch((error) => {
  //     console.error(error)
  //   })
  // }, [])
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

      <ProjectsMain />
      </div>
    </div>
  )
}

export default ProjectsPage