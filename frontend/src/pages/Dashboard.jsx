import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, fetchDashboardStats } from '../store/projectSlice';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiAlertCircle, FiFolder, FiArrowRight, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, borderClass, iconColor, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`${borderClass} rounded-2xl p-5 md:p-6 backdrop-blur-sm`}
    style={{ backdropFilter: 'blur(12px)' }}
  >
    <div className="flex items-center justify-between mb-4">
      <p className="text-xs font-badge font-semibold tracking-widest text-textMuted uppercase">{title}</p>
      <div className={`p-2.5 rounded-xl ${iconColor}`} style={{ background: 'rgba(255,255,255,0.05)' }}>
        <Icon size={16} />
      </div>
    </div>
    <p className="font-mono text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>{value}</p>
  </motion.div>
);

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { projects, stats, isLoading } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchProjects());
      dispatch(fetchDashboardStats());
    }
  }, [token, dispatch]);

  const statCards = [
    { title: 'Total Projects', value: stats.totalProjects ?? 0, icon: FiFolder, borderClass: 'stat-projects', iconColor: 'text-primary', delay: 0.1 },
    { title: 'Tasks Done', value: stats.tasksCompleted ?? 0, icon: FiCheckCircle, borderClass: 'stat-done', iconColor: 'text-neon-green', delay: 0.15 },
    { title: 'In Progress', value: stats.tasksInProgress ?? 0, icon: FiClock, borderClass: 'stat-progress', iconColor: 'text-neon-cyan', delay: 0.2 },
    { title: 'Overdue', value: stats.tasksOverdue ?? 0, icon: FiAlertCircle, borderClass: 'stat-overdue', iconColor: 'text-danger', delay: 0.25 },
  ];

  const projectColors = ['card-neon-purple', 'card-neon-cyan', 'card-neon-pink'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl p-6 md:p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.08) 50%, rgba(6,182,212,0.08) 100%)',
          border: '1px solid rgba(99,102,241,0.25)',
          boxShadow: '0 0 40px rgba(99,102,241,0.08)',
        }}
      >
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <FiZap className="text-primary" size={16} />
            <span className="font-badge font-semibold text-xs tracking-widest text-primary uppercase">Dashboard</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
            {stats.totalProjects === 0
              ? `Welcome, ${user?.name?.split(' ')[0]}! 🚀`
              : `Welcome back, ${user?.name?.split(' ')[0]}!`}
          </h1>
          <p className="text-textMuted font-sans">
            {stats.totalProjects === 0
              ? "Let's get started by creating your first project."
              : "Here's what's happening across your projects today."}
          </p>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((s) => <StatCard key={s.title} {...s} />)}
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-xl font-bold text-white">Recent Projects</h2>
          <Link to="/projects" className="flex items-center gap-1 text-xs font-badge font-semibold tracking-wide text-primary hover:text-neon-purple transition-colors uppercase">
            View All <FiArrowRight size={12} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0,1,2].map(i => (
              <div key={i} className="rounded-2xl p-6 h-36 animate-pulse" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl p-12 text-center" style={{ border: '1px dashed rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.03)' }}>
            <FiFolder className="text-primary mx-auto mb-3 opacity-40" size={40} />
            <p className="text-textMuted font-sans">No projects yet. Create one to get started!</p>
            <Link to="/projects" className="inline-block mt-4 btn-neon text-sm py-2 px-4">
              Create Project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.slice(0, 3).map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/projects/${p._id}`}>
                  <div className={`${projectColors[i % 3]} p-5 rounded-2xl h-full flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-1`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.07)' }}>
                        <FiFolder size={14} className="text-textMuted" />
                      </div>
                      <span className="font-badge font-semibold text-xs tracking-widest text-textMuted uppercase">Project</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white mb-2 line-clamp-1">{p.name}</h3>
                    <p className="text-sm text-textMuted font-sans line-clamp-2 flex-1">{p.description || 'No description.'}</p>
                    <div className="mt-4 pt-3 flex items-center justify-between text-xs text-textMuted" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="font-badge font-semibold tracking-wide">{p.members?.length || 0} MEMBERS</span>
                      <FiArrowRight size={12} className="text-textMuted" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
