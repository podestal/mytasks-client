import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Navigation from '../components/Navigation'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="flex min-h-screen bg-[#121212]">
      <Navigation />
      <main className="flex-1 ml-64 bg-[#121212]">
        <Outlet />
      </main>
      <ReactQueryDevtools />
    </div>
  ),
})
