import ProjectsList from "./ProjectsList"

const ProjectsMain = () => {
  return (
    <>
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
//         <AnimatePresence>
//           {expandedProjects.has(project.id) && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: 'auto', opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.3, ease: 'easeInOut' }}
//               className="overflow-hidden"
//             >
//               <div className="p-6 pt-4">
//                 <div className="space-y-3">
//                   {project.sprints.length === 0 ? (
//                     <motion.p
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="text-gray-400 text-center py-8"
//                     >
//                       No sprints yet
//                     </motion.p>
//                   ) : (
//                     project.sprints.map((sprint, sprintIndex) => {
//                       const statusConfig = getStatusConfig(sprint.status)
//                       const StatusIcon = statusConfig.icon
//                       const daysUntilDeadline = Math.ceil(
//                         (new Date(sprint.deadline).getTime() - new Date().getTime()) /
//                           (1000 * 60 * 60 * 24)
//                       )

//                       return (
//                         <Link
//                           key={sprint.id}
//                           to="/sprints/$sprintId"
//                           params={{ sprintId: sprint.id.toString() }}
//                         >
//                           <motion.div
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.3, delay: sprintIndex * 0.05 }}
//                             whileHover={{ x: 4, scale: 1.01 }}
//                             className="border border-gray-800 rounded-xl p-4 hover:border-[#1DB954]/50 transition-colors bg-[#242424] cursor-pointer"
//                           >
//                     <div className="flex items-start justify-between mb-2">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-white mb-1">
//                           {sprint.name}
//                         </h3>
//                         {sprint.description && (
//                           <p className="text-sm text-gray-400 mb-3">
//                             {sprint.description}
//                           </p>
//                         )}
//                       </div>
//                       <div
//                         className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.className}`}
//                       >
//                         <StatusIcon className={`w-3.5 h-3.5 ${statusConfig.iconClassName}`} />
//                         <span>{statusConfig.label}</span>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-4 text-xs text-gray-400">
//                       <div className="flex items-center gap-1.5">
//                         <Calendar className="w-4 h-4" />
//                         <span>
//                           Due: {formatDate(sprint.deadline)}
//                         </span>
//                         {sprint.status === 'A' && (
//                           <span
//                             className={`ml-2 px-2 py-0.5 rounded ${
//                               daysUntilDeadline < 7
//                                 ? 'bg-red-500/20 text-red-400'
//                                 : daysUntilDeadline < 14
//                                   ? 'bg-yellow-500/20 text-yellow-400'
//                                   : 'bg-[#1DB954]/20 text-[#1DB954]'
//                             }`}
//                           >
//                             {daysUntilDeadline > 0
//                               ? `${daysUntilDeadline} day${daysUntilDeadline !== 1 ? 's' : ''} left`
//                               : 'Overdue'}
//                           </span>
//                         )}
//                       </div>
//                         </div>
//                           </motion.div>
//                         </Link>
//                     )
//                   })
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

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