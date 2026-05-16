import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiHome, FiFolder, FiLogOut, FiMenu, FiX, FiCheckSquare, FiBell, FiSettings, FiUsers, FiZap } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { fetchNotifications } from '../store/notificationSlice';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationPanel from './NotificationPanel';

const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  React.useEffect(() => {
    if (user) {
      dispatch(fetchNotifications());
      const interval = setInterval(() => dispatch(fetchNotifications()), 30000);
      return () => clearInterval(interval);
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: FiHome, color: 'group-hover:text-neon-purple', activeGlow: 'rgba(99,102,241,0.3)' },
    { name: 'Projects', path: '/projects', icon: FiFolder, color: 'group-hover:text-neon-cyan', activeGlow: 'rgba(6,182,212,0.3)' },
    { name: 'Team', path: '/team', icon: FiUsers, color: 'group-hover:text-neon-pink', activeGlow: 'rgba(236,72,153,0.3)' },
    { name: 'Settings', path: '/settings', icon: FiSettings, color: 'group-hover:text-neon-green', activeGlow: 'rgba(74,222,128,0.3)' },
  ];

  const roleColors = {
    Admin: 'text-neon-purple border-neon-purple bg-purple-500/10',
    Member: 'text-neon-cyan border-neon-cyan bg-cyan-500/10',
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-grid" style={{ backgroundColor: 'rgb(6,6,14)' }}>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside className={`fixed md:sticky top-0 left-0 z-50 w-64 h-screen flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{
          background: 'rgba(6, 6, 14, 0.95)',
          borderRight: '1px solid rgba(99,102,241,0.2)',
          boxShadow: '4px 0 30px rgba(99,102,241,0.08)',
        }}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', boxShadow: '0 0 15px rgba(99,102,241,0.5)' }}
            >
              <FiZap className="text-white" size={16} />
            </div>
            <h1 className="font-brand text-lg font-bold text-gradient tracking-widest">TaskFlow</h1>
          </div>
          <button className="md:hidden text-textMuted p-1.5 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsSidebarOpen(false)}>
            <FiX size={20} />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-4 mb-2 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)' }} />

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === '/'}
              onClick={() => { if (window.innerWidth < 768) setIsSidebarOpen(false); }}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-textMuted hover:text-white'
                }`
              }
              style={({ isActive }) => isActive ? {
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.3)',
                boxShadow: `0 0 15px rgba(99,102,241,0.15)`,
              } : {
                border: '1px solid transparent',
              }}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full"
                      style={{ background: 'linear-gradient(180deg, #6366f1, #a855f7)', boxShadow: '0 0 8px rgba(99,102,241,0.8)' }}
                    />
                  )}
                  <link.icon size={18} className={isActive ? 'text-primary' : link.color} />
                  <span className="font-medium font-sans text-sm">{link.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Card */}
        <div className="p-3 m-3 rounded-2xl" style={{ background: 'rgba(13,13,28,0.8)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-brand font-bold text-sm shrink-0 text-white"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', boxShadow: '0 0 12px rgba(99,102,241,0.4)' }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-semibold font-heading truncate text-white">{user?.name}</p>
              <span className={`font-badge font-semibold text-xs px-2 py-0.5 rounded border ${roleColors[user?.role] || roleColors.Member}`}>
                {user?.role}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-badge font-semibold tracking-wide text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
          >
            <FiLogOut size={14} /> LOGOUT
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Top Header */}
        <header className="h-16 shrink-0 flex items-center justify-between px-4 md:px-6 z-30"
          style={{
            background: 'rgba(6,6,14,0.9)',
            borderBottom: '1px solid rgba(99,102,241,0.15)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-textMuted p-2 hover:bg-white/5 rounded-lg transition-colors">
              <FiMenu size={22} />
            </button>
            {/* Brand on mobile */}
            <div className="md:hidden flex items-center gap-2">
              <FiZap className="text-primary" size={16} />
              <span className="font-brand text-sm font-bold text-gradient">TaskFlow</span>
            </div>
          </div>

          <div className="flex items-center gap-2 relative">
            {/* Notification Bell */}
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2.5 rounded-xl transition-all duration-200"
              style={isNotificationOpen ? {
                background: 'rgba(99,102,241,0.15)',
                border: '1px solid rgba(99,102,241,0.4)',
                boxShadow: '0 0 10px rgba(99,102,241,0.2)',
              } : {
                border: '1px solid transparent',
              }}
            >
              <FiBell size={18} className={isNotificationOpen ? 'text-primary' : 'text-textMuted'} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-brand font-bold text-white flex items-center justify-center rounded-full"
                  style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 0 8px rgba(239,68,68,0.6)' }}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {isNotificationOpen && <NotificationPanel onClose={() => setIsNotificationOpen(false)} />}
            </AnimatePresence>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-brand font-bold text-sm text-white ml-1"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', boxShadow: '0 0 12px rgba(99,102,241,0.4)' }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto flex flex-col relative custom-scrollbar">
          <div className="flex-1 p-4 md:p-8">
            <Outlet />
          </div>

          {/* Footer */}
          <footer className="w-full py-6 px-4 md:px-8 mt-auto"
            style={{ borderTop: '1px solid rgba(99,102,241,0.1)', background: 'rgba(6,6,14,0.5)' }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-textMuted">
              <div className="flex items-center gap-2">
                <FiZap className="text-primary" size={12} />
                <span className="font-brand text-primary tracking-widest text-xs">TASKFLOW</span>
                <span className="opacity-30 mx-2">|</span>
                <span>© {new Date().getFullYear()} All rights reserved.</span>
              </div>
              <div className="flex gap-4 font-badge font-medium tracking-wide">
                {['Privacy', 'Terms', 'Support'].map(item => (
                  <button key={item} onClick={() => import('react-hot-toast').then(({ default: toast }) => toast(`${item} coming soon!`, { icon: '📄' }))}
                    className="hover:text-primary transition-colors"
                  >{item}</button>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Layout;
