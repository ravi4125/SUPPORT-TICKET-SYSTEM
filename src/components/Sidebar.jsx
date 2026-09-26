import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Users,
  Headphones,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`dark-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Top Branding */}
        <div className="dark-sidebar-header">
          <div className="dark-sidebar-brand">
            <Headphones size={28} className="brand-headphone-icon" />
            <span className="brand-title-text">HelpDesk</span>
          </div>
          <button
            type="button"
            className="sidebar-mobile-close"
            onClick={onClose}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="dark-sidebar-menu">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `dark-nav-item ${isActive ? 'dark-nav-active' : ''}`
            }
            onClick={onClose}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/tickets"
            end
            className={({ isActive }) =>
              `dark-nav-item ${isActive ? 'dark-nav-active' : ''}`
            }
            onClick={onClose}
          >
            <Ticket size={18} />
            <span>Tickets</span>
          </NavLink>

          <NavLink
            to="/tickets/create"
            className={({ isActive }) =>
              `dark-nav-item ${isActive ? 'dark-nav-active' : ''}`
            }
            onClick={onClose}
          >
            <PlusCircle size={18} />
            <span>Create Ticket</span>
          </NavLink>

          <NavLink
            to="/employees"
            className={({ isActive }) =>
              `dark-nav-item ${isActive ? 'dark-nav-active' : ''}`
            }
            onClick={onClose}
          >
            <Users size={18} />
            <span>Employees</span>
          </NavLink>
        </nav>

        {/* User Card at Bottom */}
        <div className="dark-sidebar-footer">
          <div className="dark-user-profile">
            <div className="dark-user-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="sidebar-avatar-img" />
              ) : (
                user?.initials || 'SP'
              )}
            </div>
            <span className="dark-user-name">
              {user?.role === 'employee' ? user.name : 'Support Staff'}
            </span>
            <button
              type="button"
              className="dark-logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
