import { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut, Line } from 'react-chartjs-2';
import { Target, Flame, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user.leetcodeUsername) {
          setLoading(false);
          return;
        }
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5002/api/leetcode/progress/${user.leetcodeUsername}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.leetcodeUsername]);

  if (loading) return <div className="flex h-full items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  if (!user.leetcodeUsername) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="glass-panel max-w-lg w-full p-8 text-center">
          <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Connect LeetCode Account</h2>
          <p className="text-slate-400 mb-6">Please update your profile with your LeetCode username to see your dashboard stats.</p>
          <Link to="/profile" className="bg-primary text-dark-900 px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-block">
            Go to Profile
          </Link>
        </div>
      </div>
    );
  }

  // Fallback defaults if api lacks it
  const stats = data || {
    totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0,
    totalEasy: 100, totalMedium: 100, totalHard: 100
  };

  const chartData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [{
      data: [stats.easySolved, stats.mediumSolved, stats.hardSolved],
      backgroundColor: ['#4ade80', '#fbbf24', '#f87171'],
      borderWidth: 0,
      hoverOffset: 4,
      cutout: '75%'
    }]
  };

  const chartOptions = {
    plugins: { legend: { display: false } }
  };

  // Mock Line Chart data for submission calendar
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Submissions',
      data: [2, 5, 3, 7, 4, 10, 8],
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }]
  };
  
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { display: false, grid: { display: false } },
      x: { grid: { color: '#334155', borderDash: [5, 5] }, ticks: { color: '#94a3b8' } }
    },
    plugins: { legend: { display: false } }
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
    <div className="glass-panel p-6 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
        </div>
        <div className={`p-3 bg-dark-900/50 rounded-xl text-${color}`}>
          <Icon size={24} className={`text-${color}`} />
        </div>
      </div>
      <p className="text-sm text-slate-500 relative z-10">{subtitle}</p>
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[100%] pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
          <p className="text-slate-400 mt-1">Track your coding progress and daily activity.</p>
        </div>
        <div className="flex gap-3">
          <div className="glass-panel px-4 py-2 flex items-center gap-2">
            <Flame className="text-orange-500" size={20} />
            <span className="font-bold text-white">12 Day Streak</span>
          </div>
          <div className="glass-panel px-4 py-2 flex items-center gap-2 border-primary/30">
            <Target className="text-primary" size={20} />
            <span className="text-slate-300">Goal: <strong className="text-white">{stats.totalSolved} / {user.targetGoal || 300}</strong></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Solved" value={stats.totalSolved} subtitle="Out of 3000+" icon={CheckCircle2} color="primary" />
        <StatCard title="Easy" value={stats.easySolved} subtitle={`Top ${Math.floor((stats.easySolved/stats.totalEasy)*100 || 0)}%`} icon={TrendingUp} color="easy" />
        <StatCard title="Medium" value={stats.mediumSolved} subtitle={`Top ${Math.floor((stats.mediumSolved/stats.totalMedium)*100 || 0)}%`} icon={Target} color="medium" />
        <StatCard title="Hard" value={stats.hardSolved} subtitle={`Top ${Math.floor((stats.hardSolved/stats.totalHard)*100 || 0)}%`} icon={Flame} color="hard" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 lg:col-span-1 flex flex-col justify-between">
          <h2 className="text-lg font-bold text-white mb-6">Difficulty Breakdown</h2>
          <div className="relative h-48 w-full flex items-center justify-center">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-white">{stats.totalSolved}</span>
              <span className="text-xs text-slate-400">Total</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-easy"></div> Easy</span>
              <span className="text-white font-medium">{stats.easySolved} / {stats.totalEasy}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-medium"></div> Medium</span>
              <span className="text-white font-medium">{stats.mediumSolved} / {stats.totalMedium}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-hard"></div> Hard</span>
              <span className="text-white font-medium">{stats.hardSolved} / {stats.totalHard}</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white">Activity (Last 7 Days)</h2>
            <select className="bg-dark-900 border border-dark-700 text-sm text-slate-300 rounded-lg px-3 py-1 outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="flex-1 h-64 min-h-[250px]">
             <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
