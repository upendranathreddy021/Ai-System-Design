import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CompassLogo } from './CompassLogo';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from '../utils/toast';
import {
  LayoutDashboard, User, LogOut, LogIn, UserLock,
  Menu, X, ChevronRight, Bell, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';

export const Navigation = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const isLogin = JSON.parse(localStorage.getItem("sd_user"))?.isAuthenticated === true;

  const navItems = [
    { id: 'dashboard', label: 'Architecture Board', icon: LayoutDashboard ,enable:true},
    { id: 'profile', label: 'Profile & Settings', icon: User,enable:isLogin },
  ];


  const secondaryNav = [
    { id: 'microservices', label: 'Login', icon: LogIn, link: "/login" },
    { id: 'schematics', label: 'Signup', icon: UserLock, link: "/signup" },
  ];

  return (
    <>
      {/* Mobile top bar — visible below lg breakpoint only */}
      <header className="neu-raised d-flex d-lg-none align-items-center justify-content-between p-3 sticky-top" style={{ zIndex: 40 }}>
        <CompassLogo size="sm" showText={true} />
        <div className="d-flex align-items-center gap-2">
          {/* <button
            onClick={() => toast.info('No unread notifications.', 'info')}
            className="neu-button p-2"
            style={{ color: '#475569' }}
          >
            <Bell size={16} />
          </button> */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="neu-button p-2"
            style={{ color: '#334155' }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer — visible below lg, toggled by shared sidebarOpen state */}
      {sidebarOpen && (
        <div className="mobile-drawer neu-raised d-lg-none">
          {isLogin && (
            <div className="d-flex align-items-center gap-3 pb-3 mb-2" style={{ borderBottom: '1px solid #cbd5e1' }}>
              <div className="neu-button rounded-circle d-flex align-items-center justify-content-center" style={{ width: '2.5rem', height: '2.5rem', fontWeight: 700, color: '#4f46e5', fontSize: '0.875rem' }}>
                {authState.user?.firstName?.[0]}{authState.user?.lastName?.[0]}
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>{authState.user?.firstName} {authState.user?.lastName}</p>
                <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{authState.user?.email}</p>
              </div>
            </div>
          )}

          <div className="d-flex flex-column gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.replace(/^\/+/, "") === item.id;
              return (
              item.enable && ( <button
                  key={item.id}
                  onClick={() => { setSidebarOpen(false); navigate("/" + item.id); }}
                  className={`w-100 d-flex align-items-center justify-content-between p-3 ${isActive ? 'neu-button-active' : 'neu-button'}`}
                  style={{ fontSize: '0.875rem', fontWeight: 700, color: isActive ? '#4f46e5' : '#334155' }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={16} style={{ color: '#94a3b8' }} />
                </button>
              )
              );
            })}
          </div>

          {!isLogin && (
            <div className="d-flex flex-column gap-2 mt-3">
              {secondaryNav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setSidebarOpen(false); navigate(item.link); }}
                  className="neu-button w-100 p-3 d-flex align-items-center gap-3"
                  style={{ color: '#475569', fontWeight: 700, fontSize: '0.8rem' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {isLogin && (
            <button
              onClick={logout}
              className="neu-button w-100 p-3 mt-3"
              style={{ color: '#f43f5e', fontWeight: 700, fontSize: '0.75rem', gap: '0.5rem' }}
            >
              <LogOut size={16} />
              <span>Sign Out Session</span>
            </button>
          )}
        </div>
      )}

      {/* Desktop sidebar — visible at lg and above only, collapses via shared sidebarOpen */}
      <aside
        className="neu-raised d-none d-lg-flex flex-column p-3 gap-3 flex-shrink-0"
        style={{
          width: sidebarOpen ? '5rem' : '18rem',
          height: '100vh',
          position: 'sticky',
          top: 0,
          transition: 'width 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <div className="d-flex align-items-center justify-content-between pt-2">
          <CompassLogo size="md" showText={!sidebarOpen} />
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="neu-button p-2" style={{ color: '#475569' }}>
            {sidebarOpen ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <div className="d-flex flex-column gap-2 pt-2">
          {!sidebarOpen && <p className="sidebar-nav-title">Workspace</p>}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.replace(/^\/+/, "") === item.id;
            return (
            item.enable && (  <button
                key={item.id}
                onClick={() => navigate("/" + item.id)}
                className={`sidebar-nav-item ${isActive ? 'neu-button-active' : 'neu-button'}`}
                style={{ color: isActive ? '#4f46e5' : '#475569' }}
              >
                <div className="d-flex align-items-center gap-3">
                  <Icon size={16} style={{ color: isActive ? '#4f46e5' : '#64748b' }} />
                  {!sidebarOpen && <span>{item.label}</span>}
                </div>
              </button>
             ) );
          })}
        </div>

        {!isLogin && !sidebarOpen && (
          <div className="d-flex flex-column gap-2">
            {secondaryNav.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.link)}
                className="sidebar-nav-item neu-button"
                style={{ color: '#475569' }}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {isLogin && !sidebarOpen && (
          <div className="user-card-footer">
            <div className="neu-inset p-3 d-flex align-items-center gap-3">
              <div className="neu-button rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '2.25rem', height: '2.25rem', fontWeight: 800, color: '#4f46e5', fontSize: '0.75rem' }}>
                {authState.user?.firstName?.[0]}{authState.user?.lastName?.[0]}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <p className="text-truncate" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b' }}>{authState.user?.firstName} {authState.user?.lastName}</p>
                <p className="text-truncate" style={{ fontSize: '0.6875rem', color: '#64748b' }}>{authState.user?.email}</p>
              </div>
            </div>
            <button onClick={logout} className="neu-button w-100 p-2 mt-2" style={{ color: '#f43f5e', fontWeight: 700, fontSize: '0.75rem', gap: '0.5rem' }}>
              <LogOut size={16} />
              <span>Sign Out Session</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};