import { motion } from 'framer-motion'
import ProjectForm from './ProjectForm'
import useCreateProject from '@/hooks/api/projects/useCreateProject'
import { useState } from 'react'
import { Plus } from 'lucide-react'

const CreateProject = () => {
  const createProject = useCreateProject()
  const [open, setOpen] = useState(false)

  return (
    <>
    <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 cursor-pointer px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-xl font-semibold shadow-lg transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span className="hidden sm:inline">New Project</span>
      </motion.button>
      <ProjectForm createProject={createProject} isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default CreateProject

