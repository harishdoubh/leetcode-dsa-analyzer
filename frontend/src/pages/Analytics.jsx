import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { BrainCircuit, Download, Lightbulb, Zap } from 'lucide-react';

const Analytics = () => {
  const [weakTopics, setWeakTopics] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5002/api/leetcode/weak-topics/${user.leetcodeUsername}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWeakTopics(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user.leetcodeUsername) fetchAnalytics();
  }, [user.leetcodeUsername]);

  const exportPDF = () => {
    // In actual implementation we use html2pdf
    alert('PDF Export feature triggered! (Needs implementation setup)');
  };

  const barData = {
    labels: ['Arrays', 'String', 'Hash Table', 'DP', 'Math', 'Sorting', 'Greedy', 'Graph'],
    datasets: [{
      label: 'Solved Questions',
      data: [120, 85, 60, 45, 40, 35, 25, 15],
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
      borderRadius: 4,
    }]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } },
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
    },
    plugins: { legend: { display: false } }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[100%] pb-10">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Topic Analytics</h1>
          <p className="text-slate-400 mt-1">Deep dive into your DSA category performance.</p>
        </div>
        <button 
          onClick={exportPDF}
          className="bg-dark-800 hover:bg-dark-700 border border-dark-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Download size={18} /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 lg:col-span-2 flex flex-col">
           <h2 className="text-lg font-bold text-white mb-6">Topic Distribution</h2>
           <div className="flex-1 h-80 min-h-[300px]">
              <Bar data={barData} options={barOptions} />
           </div>
        </div>

        <div className="glass-panel p-6 lg:col-span-1 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <BrainCircuit className="text-indigo-400" /> AI Insights
          </h2>
          
          <div className="space-y-4 flex-1">
            {weakTopics.length > 0 ? weakTopics.map((topic, i) => (
              <div key={i} className="bg-dark-900/60 border border-dark-700 p-4 rounded-xl relative z-10">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-white">{topic.topic}</h3>
                  <span className="text-xs font-bold text-orange-400 bg-orange-400/10 px-2 py-1 rounded-md">
                    Drop: {topic.confidence}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{topic.suggestion}</p>
                <div className="mt-3 flex gap-2">
                  <button className="text-xs bg-primary/20 text-primary hover:bg-primary/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                    <Zap size={14} /> Practice Now
                  </button>
                </div>
              </div>
            )) : (
              <div className="text-center text-slate-500 mt-10">Loading insights...</div>
            )}
          </div>
          
          <div className="mt-6 bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl relative z-10 flex gap-3">
             <Lightbulb className="text-indigo-400 flex-shrink-0" size={20} />
             <p className="text-xs text-indigo-200/80 leading-relaxed">
               Based on your recent incorrect submissions, we recommend focusing on <strong>Graphs</strong> and <strong>Greedy</strong> algorithms to improve your contest rating.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
