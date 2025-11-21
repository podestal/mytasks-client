import useGetProjects from "@/hooks/api/projects/useGetProjects"
import PorjectCard from "./PorjectCard"


const ProjectsList = () => {

    const { data: projects, isLoading, error, isSuccess, isError } = useGetProjects({ access: '' })
    if (isLoading) return <p className="text-gray-500 text-center py-8 animate-pulse">Loading...</p>
    if (isError) return <p className="text-red-500 text-center py-8">Error: {error?.message}</p>
    if (isSuccess) 
  return (
    <>
    <>{(console.log('projects', projects))}</>
    {projects.map((project, index) => (
        <PorjectCard key={project.id} project={project} index={index} />
    ))}
    </>
  )
}

export default ProjectsList