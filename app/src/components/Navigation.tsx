import { Link, useLocation } from '@tanstack/react-router'
import { FolderKanban, DollarSign, Home, Settings, BarChart3, Calendar } from 'lucide-react'

const navItems = [
  {
    name: 'Home',
    path: '/',
    icon: Home,
  },
  {
    name: 'Projects',
    path: '/projects',
    icon: FolderKanban,
  },
  {
    name: 'Money',
    path: '/money',
    icon: DollarSign,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Calendar',
    path: '/calendar',
    icon: Calendar,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
  },
]

const Navigation = () => {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-gray-900 shadow-2xl flex flex-col z-50">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-900">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#1DB954] rounded-xl shadow-lg">
            <FolderKanban className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">
            MyTasks
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? 'bg-[#1DB954] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-900">
        <div className="text-xs text-gray-500 text-center">
          © 2024 MyTasks
        </div>
      </div>
    </aside>
  )
}

export default Navigation

