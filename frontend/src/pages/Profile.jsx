import { useState } from 'react';
import axios from 'axios';
import { User, Target, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [formData, setFormData] = useState({
    leetcodeUsername: user.leetcodeUsername || '',
    targetGoal: user.targetGoal || 300
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Saving...' });
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5002/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
      
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to update profile.' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>
      
      <div className="glass-panel p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-dark-700">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-indigo-500 p-1 relative group cursor-pointer">
            <div className="w-full h-full bg-dark-900 rounded-full flex items-center justify-center text-3xl font-bold text-white">
              {user.username?.charAt(0).toUpperCase()}
            </div>
            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
               <span className="text-xs font-semibold text-white">Change</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{user.username}</h2>
            <p className="text-slate-400 mb-2">Member since {new Date().getFullYear()}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {status.message && (
            <div className={`p-4 rounded-lg flex items-center gap-2 ${
              status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
              status.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
              'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              {status.message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Platform Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  disabled
                  value={user.username}
                  className="w-full bg-dark-900/50 border border-dark-700 text-slate-400 rounded-lg py-3 pl-10 pr-4 cursor-not-allowed"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">LeetCode Username</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  value={formData.leetcodeUsername}
                  onChange={(e) => setFormData({...formData, leetcodeUsername: e.target.value})}
                  className="w-full bg-dark-900 border border-dark-700 text-slate-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="e.g. neetcode"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">Required to fetch your real-time stats.</p>
            </div>
          </div>

          <div>
             <label className="block text-sm font-semibold text-slate-300 mb-2">Target Goal (Problems)</label>
             <div className="relative">
               <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
               <input 
                 type="number" 
                 value={formData.targetGoal}
                 onChange={(e) => setFormData({...formData, targetGoal: e.target.value})}
                 className="w-full bg-dark-900 border border-dark-700 text-slate-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
               />
             </div>
          </div>

          <div className="pt-4 flex justify-end">
             <button 
               type="submit" 
               disabled={status.type === 'loading'}
               className="bg-primary hover:bg-primary/90 text-dark-900 font-bold px-8 py-3 rounded-lg transition-colors shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]"
             >
               Save Changes
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
