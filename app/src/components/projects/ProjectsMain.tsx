import { motion } from "framer-motion"
import ProjectsList from "./ProjectsList"
import CreateProject from "./CreateProject"
import { Rocket, TrendingUp } from "lucide-react"

const ProjectsMain = () => {

  return (
    <>
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
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
        <CreateProject />
      </div>
    </motion.div>
    <ProjectsList />
    </>
    // filters
    // project list
    // pagination
  )
}

export default ProjectsMain


//   <div>
// {/* Projects List */}
// <div className="space-y-6">
//   {mockProjects.map((project, index) => {
    // const activeSprints = project.sprints.filter((s) => s.status === 'A').length
    // const completedSprints = project.sprints.filter((s) => s.status === 'D').length
    // const totalSprints = project.sprints.length

//     return (
      // <motion.div
      //   key={project.id}
      //   initial={{ opacity: 0, y: 20 }}
      //   animate={{ opacity: 1, y: 0 }}
      //   transition={{ duration: 0.4, delay: index * 0.1 }}
      //   className="bg-[#1a1a1a] rounded-2xl shadow-lg hover:bg-[#242424] transition-all duration-300 overflow-hidden border border-gray-800"
      // >
//         {/* Project Header */}
        // <motion.div
        //   initial={{ opacity: 0 }}
        //   animate={{ opacity: 1 }}
        //   transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        //   className="bg-[#1a1a1a] border-l-4 border-[#1DB954] p-4 shadow-lg"
        // >
        //   <div className="flex items-start justify-between mb-2">
        //     <div className="flex items-center gap-3 flex-1">
        //       <motion.div
        //         whileHover={{ scale: 1.1, rotate: 5 }}
        //         className="p-2 bg-[#1DB954] rounded-lg shadow-sm"
        //       >
        //         <FolderKanban className="w-5 h-5 text-white" />
        //       </motion.div>
        //       <div className="flex-1">
        //         <h2 className="text-xl font-bold text-white">{project.name}</h2>
        //         <p className="text-gray-400 text-xs mt-1">
        //           {totalSprints} sprint{totalSprints !== 1 ? 's' : ''} •{' '}
        //           <span className="text-[#1DB954]">{completedSprints} completed</span>
        //         </p>
        //       </div>
        //     </div>
        //     {project.sprints.length > 0 && (
        //       <motion.button
        //         onClick={() => toggleSprints(project.id)}
        //         whileHover={{ scale: 1.1 }}
        //         whileTap={{ scale: 0.95 }}
        //         className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
        //         aria-label={expandedProjects.has(project.id) ? 'Hide sprints' : 'Show sprints'}
        //       >
        //         {expandedProjects.has(project.id) ? (
        //           <ChevronUp className="w-5 h-5 text-[#1DB954]" />
        //         ) : (
        //           <ChevronDown className="w-5 h-5 text-gray-400" />
        //         )}
        //       </motion.button>
        //     )}
        //   </div>
        //   {project.description && (
        //     <p className="text-gray-300 text-xs leading-relaxed">
        //       {project.description}
        //     </p>
        //   )}
        // </motion.div>

//         {/* Sprints Section */}


//         {/* Project Footer Stats */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
//           className="px-6 py-4 bg-[#121212] border-t border-gray-800"
//         >
//           <div className="flex items-center justify-between text-sm">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-pulse"></div>
//                 <span className="text-gray-400">
//                   {activeSprints} active
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 text-[#1DB954]" />
//                 <span className="text-gray-400">
//                   {completedSprints} completed
//                 </span>
//               </div>
//             </div>
//             <span className="text-gray-500 text-xs">
//               Updated {formatDate(project.updated_at)}
//             </span>
//           </div>
//         </motion.div>
//       </motion.div>
//     )
//   })}
// </div>
//   </div>