import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, createProject, deleteProject } from '../store/projectSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlus, FiFolder, FiUsers, FiTrash2, FiArrowRight } from 'react-icons/fi';

const cardColors = [
  'card-neon-purple',
  'card-neon-cyan',
  'card-neon-pink',
  'card-neon-green',
];

const Projects = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { projects, isLoading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (token) dispatch(fetchProjects());
  }, [token, dispatch]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(createProject({ name, description }));
    if (createProject.fulfilled.match(resultAction)) {
      setShowModal(false);
      setName('');
      setDescription('');
    }
  };

  const handleDelete = async (e, projectId) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Delete this project? All associated tasks will also be removed.')) {
      dispatch(deleteProject(projectId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white mb-1">Projects</h1>
          <p className="text-sm text-textMuted font-sans">Manage your team projects and workspaces.</p>
        </div>
        {user?.role === 'Admin' && (
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(true)}
            className="btn-neon flex items-center gap-2 text-sm"
          >
            <FiPlus size={16} /> New Project
          </motion.button>
        )}
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[0,1,2,3].map(i => (
            <div key={i} className="rounded-2xl h-48 animate-pulse" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative group"
            >
              <Link to={`/projects/${p._id}`}>
                <div className={`${cardColors[i % cardColors.length]} p-5 rounded-2xl h-full flex flex-col transition-transform duration-200 hover:-translate-y-1`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <FiFolder size={20} className="text-textMuted" />
                    </div>
                    {user?.role === 'Admin' && (
                      <button
                        onClick={(e) => handleDelete(e, p._id)}
                        className="p-2 rounded-lg text-textMuted hover:text-danger hover:bg-danger/10 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Project"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white mb-2 line-clamp-1">{p.name}</h3>
                  <p className="text-sm text-textMuted font-sans flex-1 line-clamp-2">{p.description || 'No description provided.'}</p>
                  <div className="mt-4 pt-3 flex items-center justify-between text-xs text-textMuted" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="flex items-center gap-1.5 font-badge font-semibold tracking-wide">
                      <FiUsers size={12} /> {p.members?.length || 0} MEMBERS
                    </span>
                    <FiArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {projects.length === 0 && (
            <div className="col-span-full py-16 text-center rounded-2xl" style={{ border: '1px dashed rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.03)' }}>
              <FiFolder size={40} className="text-primary opacity-30 mx-auto mb-3" />
              <p className="text-textMuted font-sans mb-2">No projects found.</p>
              {user?.role === 'Admin' && (
                <button onClick={() => setShowModal(true)} className="btn-neon text-sm py-2 px-4 mt-2">Create First Project</button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full max-w-md p-6 rounded-2xl"
            style={{ background: 'rgb(13,13,28)', border: '1px solid rgba(99,102,241,0.35)', boxShadow: '0 0 40px rgba(99,102,241,0.15)' }}
          >
            <h2 className="font-heading text-xl font-bold text-white mb-5">Create New Project</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-badge font-semibold tracking-widest text-textMuted mb-2 uppercase">Project Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="input-neon" placeholder="e.g. Website Redesign" />
              </div>
              <div>
                <label className="block text-xs font-badge font-semibold tracking-widest text-textMuted mb-2 uppercase">Description</label>
                <textarea rows="3" value={description} onChange={e => setDescription(e.target.value)} className="input-neon resize-none" placeholder="Describe the project..." />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-textMuted hover:text-white hover:bg-white/5 font-badge font-semibold tracking-wide text-sm transition-colors">
                  Cancel
                </button>
                <button type="submit" className="btn-neon text-sm py-2 px-5">
                  Create Project
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Projects;
