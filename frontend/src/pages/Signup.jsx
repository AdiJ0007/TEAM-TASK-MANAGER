import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../store/authSlice';
import { API_BASE_URL } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiZap, FiShield, FiArrowRight } from 'react-icons/fi';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Member');
  const [adminCode, setAdminCode] = useState('');
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(signupUser({ name, email, password, role, adminCode }));
    if (signupUser.fulfilled.match(resultAction)) navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-grid overflow-hidden" style={{ backgroundColor: 'rgb(6,6,14)' }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }} />
      </div>

      {/* Left showcase */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-12">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.06) 0%, rgba(236,72,153,0.04) 100%)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(168,85,247,0.3), transparent)' }} />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative z-10 max-w-md w-full space-y-4">
          <div className="card-neon-pink p-6 rounded-2xl">
            <h2 className="font-heading font-bold text-2xl text-white mb-2">Join Your Team Today</h2>
            <p className="text-textMuted text-sm font-sans leading-relaxed">Create projects, assign tasks, track progress, and collaborate seamlessly.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="card-neon-purple p-4 rounded-xl">
              <FiShield className="text-primary mb-2" size={20} />
              <p className="font-heading font-semibold text-white text-sm">Admin</p>
              <p className="text-xs text-textMuted font-sans mt-1">Full control: create projects, manage team & tasks</p>
            </div>
            <div className="card-neon-cyan p-4 rounded-xl">
              <FiUser className="text-neon-cyan mb-2" size={20} />
              <p className="font-heading font-semibold text-white text-sm">Member</p>
              <p className="text-xs text-textMuted font-sans mt-1">Collaborate on assigned tasks and projects</p>
            </div>
          </div>
          <div className="card-neon-green p-4 rounded-xl">
            <p className="text-xs font-badge font-semibold tracking-widest text-neon-green mb-2 uppercase">Admin Key</p>
            <p className="text-sm font-mono text-white rounded-lg px-3 py-2 bg-white/5 border border-neon-green/20 tracking-wider">TASK_ADMIN_2026</p>
            <p className="text-xs text-textMuted mt-2 font-sans">Use this key during signup to register as Admin.</p>
          </div>
        </motion.div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', boxShadow: '0 0 20px rgba(168,85,247,0.6)' }}>
              <FiZap className="text-white" size={18} />
            </div>
            <span className="font-brand text-xl font-bold tracking-widest" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TASKFLOW</span>
          </div>
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-textMuted font-sans">Join your team and start managing tasks.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-badge font-semibold tracking-widest text-textMuted mb-2 uppercase">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" size={15} />
                <input id="signup-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input-neon pl-11" placeholder="Your full name" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-badge font-semibold tracking-widest text-textMuted mb-2 uppercase">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" size={15} />
                <input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-neon pl-11" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-badge font-semibold tracking-widest text-textMuted mb-2 uppercase">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" size={15} />
                <input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-neon pl-11" placeholder="Min. 6 characters" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-badge font-semibold tracking-widest text-textMuted mb-2 uppercase">Role</label>
              <select id="signup-role" value={role} onChange={(e) => setRole(e.target.value)} className="input-neon">
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <AnimatePresence>
              {role === 'Admin' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                  <label className="block text-xs font-badge font-semibold tracking-widest text-neon-green mb-2 uppercase">Admin Secret Key</label>
                  <div className="relative">
                    <FiShield className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-green" size={15} />
                    <input id="signup-admin-code" type="password" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} required={role === 'Admin'} className="input-neon pl-11 font-mono" style={{ borderColor: 'rgba(74,222,128,0.3)' }} placeholder="Enter admin secret key" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button id="signup-submit" type="submit" disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-badge font-semibold tracking-widest uppercase text-sm text-white transition-all duration-300 disabled:opacity-50 mt-2" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', border: '1px solid rgba(168,85,247,0.5)', boxShadow: '0 0 20px rgba(168,85,247,0.3)' }}>
              {isLoading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating...</> : <>Create Account <FiArrowRight size={14} /></>}
            </motion.button>
          </form>
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3))' }} />
            <span className="text-xs font-badge font-semibold tracking-widest text-textMuted uppercase">Or</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(168,85,247,0.3), transparent)' }} />
          </div>
          <a href={`${API_BASE_URL}/auth/google`} className="flex items-center justify-center gap-3 w-full py-3 rounded-xl font-badge font-semibold tracking-wide text-sm text-white transition-all duration-300" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </a>
          <p className="mt-8 text-center text-sm text-textMuted font-sans">
            Already have an account? <Link to="/login" className="font-semibold text-primary hover:text-neon-purple transition-colors">Sign in →</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
