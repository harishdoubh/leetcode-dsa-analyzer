import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Medal, Search } from 'lucide-react';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5002/api/leetcode/leaderboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-5xl mx-auto h-[100%] pb-10">
      <div className="flex items-center justify-between mt-2 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Trophy className="text-yellow-500" /> Global Leaderboard
          </h1>
          <p className="text-slate-400 mt-1">Compare your progress with peers and friends.</p>
        </div>
        
        <div className="glass-panel px-4 py-2 flex items-center gap-2">
           <Search size={16} className="text-slate-400" />
           <input type="text" placeholder="Find user..." className="bg-transparent border-none outline-none text-sm w-32 placeholder:text-slate-500" />
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-dark-700 bg-dark-900/50 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-6">User</div>
          <div className="col-span-4 text-right pr-4">Total Solved</div>
        </div>
        
        <div className="divide-y divide-dark-700/50 max-h-[600px] overflow-y-auto">
          {users.map((user, index) => {
            const isCurrentUser = user.username === currentUser.username;
            return (
              <div 
                key={index} 
                className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-dark-700/30 ${isCurrentUser ? 'bg-primary/5' : ''}`}
              >
                <div className="col-span-2 flex justify-center">
                  {index === 0 ? <Medal className="text-yellow-400" size={24} /> :
                   index === 1 ? <Medal className="text-slate-300" size={24} /> :
                   index === 2 ? <Medal className="text-amber-600" size={24} /> :
                   <span className="text-lg font-bold text-slate-500">#{index + 1}</span>}
                </div>
                
                <div className="col-span-6 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg">
                     {user.username.charAt(0).toUpperCase()}
                   </div>
                   <div>
                     <p className={`font-semibold ${isCurrentUser ? 'text-primary' : 'text-slate-200'} flex items-center gap-2`}>
                       {user.username} {isCurrentUser && <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase">You</span>}
                     </p>
                     <p className="text-xs text-slate-500">@{user.leetcodeUsername}</p>
                   </div>
                </div>
                
                <div className="col-span-4 text-right pr-4 font-bold text-lg text-white">
                  {user.solved} 
                  <span className="text-xs font-normal text-slate-500 ml-1">pts</span>
                </div>
              </div>
            );
          })}
          
          {users.length === 0 && (
             <div className="p-8 text-center text-slate-500">No users found. Invite some friends!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
