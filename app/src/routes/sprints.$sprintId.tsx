import { createFileRoute } from '@tanstack/react-router'
import SprintPage from '../pages/SprintPage'

export const Route = createFileRoute('/sprints/$sprintId')({
  component: SprintPage,
})
