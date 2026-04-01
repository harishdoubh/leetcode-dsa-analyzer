import { useState } from 'react';
import axios from 'axios';
import { BookOpen, User, Lock, ArrowRight, Activity } from 'lucide-react';

const Login = ({ setAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '', leetcodeUsername: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await axios.post(`http://localhost:5002${endpoint}`, formData);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setAuth(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dark-800 via-dark-900 to-black p-6 w-full">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
      
      <div className="max-w-md w-full z-10">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-primary to-secondary p-3 rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.4)]">
              <Activity className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-white tracking-tight">
              LeetTracker
            </h1>
          </div>
        </div>

        <div className="glass-panel p-8 backdrop-blur-xl border border-white/5 relative overflow-hidden group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative">
            <h2 className="text-2xl font-bold text-white mb-2">{isLogin ? 'Welcome back' : 'Create an account'}</h2>
            <p className="text-slate-400 text-sm mb-8">
              {isLogin ? 'Enter your details to access your dashboard.' : 'Start tracking your DSA journey today.'}
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full bg-dark-900/50 border border-dark-700 text-slate-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">LeetCode ID (Optional)</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="text" 
                      value={formData.leetcodeUsername}
                      onChange={(e) => setFormData({...formData, leetcodeUsername: e.target.value})}
                      className="w-full bg-dark-900/50 border border-dark-700 text-slate-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                      placeholder="e.g. tourist"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="password" 
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-dark-900/50 border border-dark-700 text-slate-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 mt-4"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="text-primary hover:text-white font-semibold transition-colors"
                >
                  {isLogin ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
