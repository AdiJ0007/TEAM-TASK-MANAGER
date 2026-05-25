import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, googleLogin, getMe } from '../store/authSlice';
import { API_BASE_URL } from '../utils/api';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiZap, FiArrowRight } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      dispatch(googleLogin({ token }));
      dispatch(getMe()).then(() => navigate('/'));
    }
  }, [searchParams, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-grid overflow-hidden" style={{ backgroundColor: 'rgb(6,6,14)' }}>
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
      </div>

      {/* ── Left: Form ── */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', boxShadow: '0 0 20px rgba(99,102,241,0.6)' }}
            >
              <FiZap className="text-white" size={18} />
            </div>
            <span className="font-brand text-xl font-bold text-gradient tracking-widest">TASKFLOW</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-textMuted font-sans">Sign in to manage your tasks and teams.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-badge font-semibold tracking-widest text-textMuted mb-2 uppercase">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" size={15} />
                <input
                  id="login-email"
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="input-neon pl-11"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-badge font-semibold tracking-widest text-textMuted mb-2 uppercase">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" size={15} />
                <input
                  id="login-password"
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="input-neon pl-11"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              id="login-submit"
              type="submit" disabled={isLoading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full btn-neon flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center gap-2 font-badge font-semibold tracking-widest uppercase text-sm">
                  Sign In <FiArrowRight size={14} />
                </span>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3))' }} />
            <span className="text-xs font-badge font-semibold tracking-widest text-textMuted uppercase">Or continue with</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.3), transparent)' }} />
          </div>

          {/* Google OAuth */}
          <a
            href={`${API_BASE_URL}/auth/google`}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl font-badge font-semibold tracking-wide text-sm text-white transition-all duration-300"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            onMouseEnter={e => { e.currentTarget.style.border = '1px solid rgba(99,102,241,0.4)'; e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </a>

          <p className="mt-8 text-center text-sm text-textMuted font-sans">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-neon-purple font-semibold transition-colors">
              Create one →
            </Link>
          </p>
        </motion.div>
      </div>

      {/* ── Right: Showcase Panel ── */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-12">
        {/* Background gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(6,182,212,0.04) 100%)' }} />
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.3), transparent)' }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-md w-full"
        >
          {/* Feature cards stack */}
          <div className="space-y-4">
            {/* Hero card */}
            <div className="card-neon-purple p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)' }}>
                  <FiZap className="text-primary" size={20} />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-lg text-white">Master Your Workflow</h2>
                  <p className="text-xs font-badge text-textMuted tracking-wide">NEXT-GEN TASK MANAGEMENT</p>
                </div>
              </div>
              <p className="text-textMuted text-sm font-sans leading-relaxed">
                Experience the future of team collaboration with a stunning dark interface, real-time updates, and role-based access control.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Projects', value: '∞', color: 'card-neon-purple', textColor: '#a5b4fc' },
                { label: 'Teams', value: '∞', color: 'card-neon-cyan', textColor: '#67e8f9' },
                { label: 'Tasks', value: '∞', color: 'card-neon-pink', textColor: '#f9a8d4' },
              ].map(s => (
                <div key={s.label} className={`${s.color} p-4 rounded-xl text-center`}>
                  <p className="font-mono font-bold text-2xl" style={{ color: s.textColor }}>{s.value}</p>
                  <p className="font-badge text-xs text-textMuted tracking-wide mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Feature list */}
            <div className="card-neon-cyan p-4 rounded-2xl">
              <div className="space-y-2">
                {['Role-Based Access Control', 'Kanban Board + Progress Tracker', 'Real-Time Notifications'].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan" style={{ boxShadow: '0 0 6px rgba(6,182,212,0.8)' }} />
                    <span className="text-sm font-sans text-textMuted">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
