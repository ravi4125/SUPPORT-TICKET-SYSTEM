import { Menu, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ onOpenSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="simple-header">
      <div className="header-left-group">
        <button
          type="button"
          className="header-mobile-toggle"
          onClick={onOpenSidebar}
          aria-label="Open Sidebar Menu"
        >
          <Menu size={22} />
        </button>
      </div>

      <div className="header-right-group">
        <button type="button" className="header-bell-btn" title="Notifications">
          <Bell size={18} />
        </button>

        <div className="header-user-badge">
          <div className="header-avatar-circle">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="header-avatar-img" />
            ) : (
              user?.initials || 'SP'
            )}
          </div>
          <span className="header-user-title">
            {user?.role === 'employee' ? user.name : 'Support Staff'}
          </span>
          <ChevronDown size={14} className="header-chevron" />
        </div>
      </div>
    </header>
  );
};

export default Header;
