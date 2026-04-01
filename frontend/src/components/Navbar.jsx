import { LogOut, Bell, Search } from 'lucide-react';

const Navbar = ({ onLogout }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <header className="h-20 border-b border-dark-700 bg-dark-800/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10 transition-all">
      <div className="flex items-center gap-4 bg-dark-900/50 border border-dark-700 px-4 py-2 rounded-full w-96 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search problems, topics, users..." 
          className="bg-transparent border-none outline-none text-sm w-full text-slate-200 placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-primary transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
        </button>
        
        <div className="h-8 w-px bg-dark-700"></div>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-200">{user.username || 'User'}</p>
            <p className="text-xs text-slate-400">@{user.leetcodeUsername || 'not-linked'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-indigo-500 p-0.5">
            <div className="w-full h-full bg-dark-800 rounded-full flex items-center justify-center font-bold text-primary">
              {user.username ? user.username[0].toUpperCase() : 'U'}
            </div>
          </div>
          
          <button 
            onClick={onLogout}
            className="ml-2 p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
