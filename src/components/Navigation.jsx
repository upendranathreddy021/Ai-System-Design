import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CompassLogo } from './CompassLogo';
import { useNavigate,useLocation } from 'react-router-dom';
import toast from '../utils/toast';
import {
  LayoutDashboard,
  User,
  LogOut,
  LogIn,UserLock,
  Layers,
  ShieldAlert,
  Menu,
  X,
  ChevronRight,
  Bell,
} from 'lucide-react';

export const Navigation = () => {
  const location=useLocation();
  const navigate=useNavigate()
  const { authState, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Architecture Board', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile & Settings', icon: User },
  ];

 const isLogin=JSON.parse(localStorage.getItem("sd_user"))?.isAuthenticated==true ? true :false;
 console.log(isLogin)
  const secondaryNav = [
    { id: 'microservices', label: 'Login', icon: LogIn, link:"/login" },
    { id: 'schematics', label: 'Signup', icon: UserLock,link:"/signup" },
    // { id: 'security', label: 'SOC2 Audit Logs', icon: ShieldAlert, badge: 'Passed' },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="mobile-header neu-raised">
        <CompassLogo size="sm" showText={true} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => toast.info('No unread notifications.', 'info')}
            className="neu-button"
            style={{ padding: '0.5rem', color: '#475569' }}
          >
            <Bell size={16} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="neu-button"
            style={{ padding: '0.5rem', color: '#334155' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-down Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer neu-raised">
          {isLogin &&(
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid #cbd5e1' }}>
            <div
              className="neu-button"
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                fontWeight: 700,
                color: '#4f46e5',
                fontSize: '0.875rem',
              }}
            >
              {authState.user?.firstName?.[0]}
              {authState.user?.lastName?.[0]}
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>
                {authState.user?.firstName} {authState.user?.lastName}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{authState.user?.email}</p>
            </div>
          </div>
)}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.replace(/^\/+/, "") === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/"+item.id)
                  }}
                  className={isActive ? 'neu-button-active' : 'neu-button'}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: isActive ? '#4f46e5' : '#334155',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={16} style={{ color: '#94a3b8' }} />
                </button>
              );
            })}
          </div>

         { isLogin && ( <button
            onClick={logout}
            className="neu-button"
            style={{
              width: '100%',
              padding: '0.75rem',
              color: '#f43f5e',
              fontWeight: 700,
              fontSize: '0.75rem',
              gap: '0.5rem',
              marginTop: '1rem',
            }}
          >
            <LogOut size={16} />
            <span>Sign Out Session</span>
          </button>)}
        </div>
      )}

      {/* Desktop Left Sidebar */}
      <aside className="desktop-sidebar neu-raised">
        <div style={{ paddingTop: '0.5rem' }}>
          <CompassLogo size="md" showText={true} />
        </div>

        {/* Primary Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '1rem' }}>
          <p className="sidebar-nav-title">Workspace</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.replace(/^\/+/, "") === item.id;
            return (
              <button
                key={item.id}
                onClick={
                  () =>{ 
                    // setActiveScreen(item.id);

                  navigate("/"+item.id);
                  }
                }
                className={`sidebar-nav-item ${isActive ? 'neu-button-active' : 'neu-button'}`}
                style={{
                  color: isActive ? '#4f46e5' : '#475569',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={16} style={{ color: isActive ? '#4f46e5' : '#64748b' }} />
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#4f46e5',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary Services Navigation */}
        { !isLogin && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {/* <p className="sidebar-nav-title">System Monitoring</p> */}
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() =>{ toast.info(`Switched view to ${item.label}`, 'info')
                  navigate(item.link)              }}
                className="sidebar-nav-item neu-button"
                style={{ color: '#475569' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {/* <Icon size={16} style={{ color: '#94a3b8' }} /> */}
                  <span>{item.label}</span>
                </div>
                <span
                  className="neu-pill"
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 800,
                    color: '#4f46e5',
                    padding: '0.125rem 0.5rem',
                  }}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
          )}
        {/* User Card & Logout Button at Bottom */}
      { isLogin && ( <div className="user-card-footer">
          <div className="neu-inset" style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              className="neu-button"
              style={{
                width: '2.25rem',
                height: '2.25rem',
                fontWeight: 800,
                color: '#4f46e5',
                fontSize: '0.75rem',
                flexShrink: 0,
              }}
            >
              {authState.user?.firstName?.[0]}
              {authState.user?.lastName?.[0]}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#1e293b',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {authState.user?.firstName} {authState.user?.lastName}
              </p>
              <p
                style={{
                  fontSize: '0.6875rem',
                  color: '#64748b',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {authState.user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="neu-button"
            style={{
              width: '100%',
              padding: '0.625rem 1rem',
              color: '#f43f5e',
              fontWeight: 700,
              fontSize: '0.75rem',
              gap: '0.5rem',
            }}
          >
            <LogOut size={16} />
            <span>Sign Out Session</span>
          </button>
        </div>
)}
      </aside>
    </>
  );
};
