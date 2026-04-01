import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart2, Trophy, User, BookOpen } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="w-64 bg-dark-800 border-r border-dark-700 h-screen flex flex-col transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-gradient-to-tr from-primary to-secondary p-2 rounded-lg">
          <BookOpen className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-bold text-gradient">LeetTracker</h1>
      </div>
      
      <nav className="flex-1 mt-6 px-4 flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(56,189,248,0.15)]' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-700/50'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-200'} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6">
        <div className="glass-panel p-4 flex flex-col gap-2">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Pro Tip</div>
          <p className="text-sm text-slate-300 tracking-tight">Consistent daily practice beats cramming. Keep up the streak!</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
