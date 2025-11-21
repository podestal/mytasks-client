import { Link, useLocation } from '@tanstack/react-router'
import { FolderKanban, DollarSign, Home, Settings, BarChart3, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

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
    <motion.aside
      initial={{ x: -256 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-gray-900 shadow-2xl flex flex-col z-50"
    >
      {/* Logo/Brand */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="p-6 border-b border-gray-900"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 bg-[#1DB954] rounded-xl shadow-lg"
          >
            <FolderKanban className="w-6 h-6 text-white" />
          </motion.div>
          <span className="text-2xl font-bold text-white">
            MyTasks
          </span>
        </div>
      </motion.div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              >
                <Link
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
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  </motion.div>
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="p-4 border-t border-gray-900"
      >
        <div className="text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} MyTasks
        </div>
      </motion.div>
    </motion.aside>
  )
}

export default Navigation

