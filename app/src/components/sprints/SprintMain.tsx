import SprintsList from "./SprintsList"

interface Props {
  projectId: number
}

const SprintMain = ({ projectId }: Props) => {
  return (
    <>
        <SprintsList projectId={projectId} />
    </>
  )
}

export default SprintMain

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
                    //     <Link
                    //       key={sprint.id}
                    //       to="/sprints/$sprintId"
                    //       params={{ sprintId: sprint.id.toString() }}
                    //     >
                    //       <motion.div
                    //         initial={{ opacity: 0, x: -20 }}
                    //         animate={{ opacity: 1, x: 0 }}
                    //         transition={{ duration: 0.3, delay: sprintIndex * 0.05 }}
                    //         whileHover={{ x: 4, scale: 1.01 }}
                    //         className="border border-gray-800 rounded-xl p-4 hover:border-[#1DB954]/50 transition-colors bg-[#242424] cursor-pointer"
                    //       >
                    // <div className="flex items-start justify-between mb-2">
                    //   <div className="flex-1">
                    //     <h3 className="font-semibold text-white mb-1">
                    //       {sprint.name}
                    //     </h3>
                    //     {sprint.description && (
                    //       <p className="text-sm text-gray-400 mb-3">
                    //         {sprint.description}
                    //       </p>
                    //     )}
                    //   </div>
                    //   <div
                    //     className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.className}`}
                    //   >
                    //     <StatusIcon className={`w-3.5 h-3.5 ${statusConfig.iconClassName}`} />
                    //     <span>{statusConfig.label}</span>
                    //   </div>
                    // </div>

                    // <div className="flex items-center gap-4 text-xs text-gray-400">
                    //   <div className="flex items-center gap-1.5">
                    //     <Calendar className="w-4 h-4" />
                    //     <span>
                    //       Due: {formatDate(sprint.deadline)}
                    //     </span>
                    //     {sprint.status === 'A' && (
                    //       <span
                    //         className={`ml-2 px-2 py-0.5 rounded ${
                    //           daysUntilDeadline < 7
                    //             ? 'bg-red-500/20 text-red-400'
                    //             : daysUntilDeadline < 14
                    //               ? 'bg-yellow-500/20 text-yellow-400'
                    //               : 'bg-[#1DB954]/20 text-[#1DB954]'
                    //         }`}
                    //       >
                    //         {daysUntilDeadline > 0
                    //           ? `${daysUntilDeadline} day${daysUntilDeadline !== 1 ? 's' : ''} left`
                    //           : 'Overdue'}
                    //       </span>
                    //     )}
                    //   </div>
                    //     </div>
                    //       </motion.div>
                    //     </Link>
//                     )
//                   })
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>