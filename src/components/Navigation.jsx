import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CompassLogo } from './CompassLogo';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, User, LogOut, LogIn, UserLock,
  Menu, X, ChevronRight, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';

export const Navigation = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authState, logout } = useAuth();

  // Single source of truth: auth state (not localStorage)
  const isLogin = !!authState?.user;

  // Mobile drawer has its own state so it never clashes with the
  // desktop sidebar's collapsed/expanded state (sidebarOpen).
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { id: 'dashboard', label: 'Architecture Board', icon: LayoutDashboard, enable: true },
    { id: 'profile', label: 'Profile & Settings', icon: User, enable: isLogin },
  ].filter((item) => item.enable);

  const secondaryNav = [
    { id: 'login', label: 'Login', icon: LogIn, link: '/login' },
    { id: 'signup', label: 'Signup', icon: UserLock, link: '/signup' },
  ];

  const initials = `${authState?.user?.firstName?.[0] ?? ''}${authState?.user?.lastName?.[0] ?? ''}`;
  const fullName = `${authState?.user?.firstName ?? ''} ${authState?.user?.lastName ?? ''}`.trim();
  const email = authState?.user?.email ?? '';

  const isActivePath = (id) => location.pathname.replace(/^\/+/, '') === id;

  const handleLogout = () => {
    setMobileOpen(false);
    logout(); // AuthContext clears state + storage and navigates to /dashboard
  };

  return (
    <>
      {/* ───────────── Mobile top bar (below lg) ───────────── */}
      <header
        className="neu-raised d-flex d-lg-none align-items-center justify-content-between p-3 sticky-top"
        style={{ zIndex: 40 }}
      >
        <CompassLogo size="sm" showText={true} />

        <div className="d-flex align-items-center gap-2">
          {/* Quick sign out, no need to open the menu */}
          {isLogin && (
            <button
              onClick={handleLogout}
              className="neu-button p-2"
              style={{ color: '#f43f5e' }}
              aria-label="Sign out"
            >
              <LogOut size={18} />
            </button>
          )}

          <button
            onClick={() => setMobileOpen(true)}
            className="neu-button p-2"
            style={{ color: '#334155' }}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* ───────────── Mobile drawer: backdrop + side panel ───────────── */}
      {mobileOpen && (
        <>
          <div
            className="d-lg-none"
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.35)',
              zIndex: 1040,
            }}
          />

          <div
            className="neu-raised d-lg-none"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(85vw, 20rem)',
              zIndex: 1050,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              padding: '1rem',
              paddingTop: 'calc(1rem + env(safe-area-inset-top, 0px))',
              paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
              overflowY: 'auto',
            }}
          >
            {/* Header row */}
            <div className="d-flex align-items-center justify-content-between">
              <CompassLogo size="sm" showText={true} />
              <button
                onClick={() => setMobileOpen(false)}
                className="neu-button p-2"
                style={{ color: '#334155' }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* User card */}
            {isLogin && (
              <div
                className="d-flex align-items-center gap-3 pb-3"
                style={{ borderBottom: '1px solid #cbd5e1' }}
              >
                <div
                  className="neu-button rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: '2.5rem', height: '2.5rem', fontWeight: 700, color: '#4f46e5', fontSize: '0.875rem' }}
                >
                  {initials}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p className="text-truncate m-0" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>
                    {fullName}
                  </p>
                  <p className="text-truncate m-0" style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {email}
                  </p>
                </div>
              </div>
            )}

            {/* Nav items */}
            <div className="d-flex flex-column gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActivePath(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate('/' + item.id)}
                    className={`w-100 d-flex align-items-center justify-content-between p-3 ${
                      active ? 'neu-button-active' : 'neu-button'
                    }`}
                    style={{ fontSize: '0.875rem', fontWeight: 700, color: active ? '#4f46e5' : '#334155' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={16} style={{ color: '#94a3b8' }} />
                  </button>
                );
              })}
            </div>

            {/* Guest actions */}
            {!isLogin && (
              <div className="d-flex flex-column gap-2">
                {secondaryNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.link)}
                      className="neu-button w-100 p-3 d-flex align-items-center gap-3"
                      style={{ color: '#475569', fontWeight: 700, fontSize: '0.8rem' }}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Pinned footer: Sign Out stays at the bottom */}
            {isLogin && (
              <button
                onClick={handleLogout}
                className="neu-button w-100 p-3 d-flex align-items-center justify-content-center"
                style={{ marginTop: 'auto', color: '#f43f5e', fontWeight: 700, fontSize: '0.8rem', gap: '0.5rem' }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </>
      )}

      {/* ───────────── Desktop sidebar (lg and above) ─────────────
          sidebarOpen === true  -> collapsed (5rem, icons only)
          sidebarOpen === false -> expanded (18rem)                */}
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
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="neu-button p-2"
            style={{ color: '#475569' }}
            aria-label={sidebarOpen ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarOpen ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <div className="d-flex flex-column gap-2 pt-2">
          {!sidebarOpen && <p className="sidebar-nav-title">Workspace</p>}
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(item.id);
            return (
              <button
                key={item.id}
                onClick={() => navigate('/' + item.id)}
                className={`sidebar-nav-item ${active ? 'neu-button-active' : 'neu-button'}`}
                style={{ color: active ? '#4f46e5' : '#475569' }}
                title={item.label}
              >
                <div className="d-flex align-items-center gap-3">
                  <Icon size={16} style={{ color: active ? '#4f46e5' : '#64748b' }} />
                  {!sidebarOpen && <span>{item.label}</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Guest: Login / Signup (expanded) */}
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

        {/* Guest: Login icon when collapsed */}
        {!isLogin && sidebarOpen && (
          <div className="d-flex flex-column gap-2">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.link)}
                  className="sidebar-nav-item neu-button"
                  style={{ color: '#475569' }}
                  title={item.label}
                >
                  <Icon size={16} />
                </button>
              );
            })}
          </div>
        )}

        {/* Logged in, expanded: user card + Sign Out */}
        {isLogin && !sidebarOpen && (
          <div className="user-card-footer">
            <div className="neu-inset p-3 d-flex align-items-center gap-3">
              <div
                className="neu-button rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '2.25rem', height: '2.25rem', fontWeight: 800, color: '#4f46e5', fontSize: '0.75rem' }}
              >
                {initials}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <p className="text-truncate m-0" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b' }}>
                  {fullName}
                </p>
                <p className="text-truncate m-0" style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                  {email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="neu-button w-100 p-2 mt-2"
              style={{ color: '#f43f5e', fontWeight: 700, fontSize: '0.75rem', gap: '0.5rem' }}
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        {/* Logged in, collapsed: icon-only Sign Out so it is never hidden */}
        {isLogin && sidebarOpen && (
          <div className="user-card-footer">
            <button
              onClick={handleLogout}
              className="neu-button w-100 p-2"
              style={{ color: '#f43f5e' }}
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};