import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Bell, KeyRound, Save, CheckCircle, Mail, Lock, Building, Briefcase } from 'lucide-react';

export const ProfileSettings = () => {
  const { authState, updateProfile, addToast } = useAuth();
  const user = authState.user;

  const [activeTab, setActiveTab] = useState('profile');

  // Profile Form State
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [company, setCompany] = useState(user?.company || '');
  const [role, setRole] = useState(user?.role || '');
  const [bio, setBio] = useState(user?.bio || '');

  // Security Form State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [twoFactor, setTwoFactor] = useState(user?.twoFactorEnabled ?? true);

  // Preferences State
  const [autoSave, setAutoSave] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const [errors, setErrors] = useState({});

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = 'First name cannot be empty.';
    if (!lastName.trim()) newErrors.lastName = 'Last name cannot be empty.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid work email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    updateProfile({
      firstName,
      lastName,
      email,
      company,
      role,
      bio,
    });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!currentPass) newErrors.currentPass = 'Current password is required.';
    if (!newPass || newPass.length < 8) {
      newErrors.newPass = 'New password must be at least 8 characters.';
    }
    if (newPass !== confirmNewPass) {
      newErrors.confirmNewPass = 'New passwords do not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    addToast('Password updated securely!', 'success');
    setCurrentPass('');
    setNewPass('');
    setConfirmNewPass('');
  };

  return (
    <div className="profile-container">
      {/* Header Banner */}
      <div className="neu-raised" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            className="neu-button"
            style={{
              width: '3.5rem',
              height: '3.5rem',
              fontWeight: 900,
              fontSize: '1.25rem',
              color: '#4f46e5',
              borderRadius: '1rem',
              flexShrink: 0,
            }}
          >
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>
              {user?.firstName} {user?.lastName}
            </h1>
            <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
              {user?.role} • {user?.company}
            </p>
          </div>
        </div>

        <div
          className="neu-pill"
          style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, color: '#10b981', gap: '0.375rem' }}
        >
          <CheckCircle size={14} />
          <span>Verified Account</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-header">
        <button
          onClick={() => setActiveTab('profile')}
          className={`tab-btn ${activeTab === 'profile' ? 'neu-button-active' : 'neu-button'}`}
          style={{ color: activeTab === 'profile' ? '#4f46e5' : '#475569' }}
        >
          <User size={16} />
          <span>Personal Info</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`tab-btn ${activeTab === 'security' ? 'neu-button-active' : 'neu-button'}`}
          style={{ color: activeTab === 'security' ? '#4f46e5' : '#475569' }}
        >
          <Shield size={16} />
          <span>Security & 2FA</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`tab-btn ${activeTab === 'preferences' ? 'neu-button-active' : 'neu-button'}`}
          style={{ color: activeTab === 'preferences' ? '#4f46e5' : '#475569' }}
        >
          <Bell size={16} />
          <span>Preferences</span>
        </button>
      </div>

      {/* Tab Content Cards */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="neu-raised" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b', borderBottom: '1px solid rgba(203, 213, 225, 0.5)', paddingBottom: '0.75rem' }}>
            Personal Details & Organization
          </h2>

          <div className="form-row-2">
            <div>
              <label className="form-label">First Name</label>
              <div className={`neu-inset input-container ${errors.firstName ? 'neu-inset-error' : ''}`}>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-field"
                />
              </div>
              {errors.firstName && <p className="error-msg">{errors.firstName}</p>}
            </div>

            <div>
              <label className="form-label">Last Name</label>
              <div className={`neu-inset input-container ${errors.lastName ? 'neu-inset-error' : ''}`}>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input-field"
                />
              </div>
              {errors.lastName && <p className="error-msg">{errors.lastName}</p>}
            </div>

            <div>
              <label className="form-label">Work Email Address</label>
              <div className={`neu-inset input-container ${errors.email ? 'neu-inset-error' : ''}`}>
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </div>
              {errors.email && <p className="error-msg">{errors.email}</p>}
            </div>

            <div>
              <label className="form-label">Company / Organization</label>
              <div className="neu-inset input-container">
                <Building size={16} className="input-icon" />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">System Design Role</label>
              <div className="neu-inset input-container">
                <Briefcase size={16} className="input-icon" />
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Architect Bio</label>
              <div className="neu-inset" style={{ padding: '0.75rem 1rem' }}>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Describe your architectural responsibilities..."
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#1e293b',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    resize: 'none',
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' }}>
            <button
              type="submit"
              className="neu-primary-btn"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', gap: '0.5rem' }}
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {activeTab === 'security' && (
        <form onSubmit={handleUpdatePassword} className="neu-raised" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b', borderBottom: '1px solid rgba(203, 213, 225, 0.5)', paddingBottom: '0.75rem' }}>
            Password & Two-Factor Authentication
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '32rem' }}>
            <div>
              <label className="form-label">Current Password</label>
              <div className={`neu-inset input-container ${errors.currentPass ? 'neu-inset-error' : ''}`}>
                <Lock size={16} className="input-icon" />
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="••••••••"
                  className="input-field"
                />
              </div>
              {errors.currentPass && <p className="error-msg">{errors.currentPass}</p>}
            </div>

            <div>
              <label className="form-label">New Password</label>
              <div className={`neu-inset input-container ${errors.newPass ? 'neu-inset-error' : ''}`}>
                <KeyRound size={16} className="input-icon" />
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="input-field"
                />
              </div>
              {errors.newPass && <p className="error-msg">{errors.newPass}</p>}
            </div>

            <div>
              <label className="form-label">Confirm New Password</label>
              <div className={`neu-inset input-container ${errors.confirmNewPass ? 'neu-inset-error' : ''}`}>
                <KeyRound size={16} className="input-icon" />
                <input
                  type="password"
                  value={confirmNewPass}
                  onChange={(e) => setConfirmNewPass(e.target.value)}
                  placeholder="Confirm new password"
                  className="input-field"
                />
              </div>
              {errors.confirmNewPass && <p className="error-msg">{errors.confirmNewPass}</p>}
            </div>
          </div>

          <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(203, 213, 225, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>
                Two-Factor Authentication (2FA)
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Require an OTP code on every login attempt.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setTwoFactor(!twoFactor);
                addToast(`2FA ${!twoFactor ? 'enabled' : 'disabled'}`, 'info');
              }}
              className="toggle-switch-btn neu-switch-bg"
              style={{ justifyContent: twoFactor ? 'flex-end' : 'flex-start' }}
            >
              <div
                className={`toggle-switch-thumb ${
                  twoFactor ? 'neu-switch-thumb-checked' : 'neu-switch-thumb'
                }`}
              />
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' }}>
            <button
              type="submit"
              className="neu-primary-btn"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', gap: '0.5rem' }}
            >
              <Save size={16} />
              <span>Update Password</span>
            </button>
          </div>
        </form>
      )}

      {activeTab === 'preferences' && (
        <div className="neu-raised" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b', borderBottom: '1px solid rgba(203, 213, 225, 0.5)', paddingBottom: '0.75rem' }}>
            System Preferences
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>
                  Auto-Save Schematics
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Automatically save topology changes to local session state.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAutoSave(!autoSave)}
                className="toggle-switch-btn neu-switch-bg"
                style={{ justifyContent: autoSave ? 'flex-end' : 'flex-start' }}
              >
                <div
                  className={`toggle-switch-thumb ${
                    autoSave ? 'neu-switch-thumb-checked' : 'neu-switch-thumb'
                  }`}
                />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>
                  Email Telemetry Alerts
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Receive instant alerts if node P99 latency exceeds 50ms.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEmailAlerts(!emailAlerts)}
                className="toggle-switch-btn neu-switch-bg"
                style={{ justifyContent: emailAlerts ? 'flex-end' : 'flex-start' }}
              >
                <div
                  className={`toggle-switch-thumb ${
                    emailAlerts ? 'neu-switch-thumb-checked' : 'neu-switch-thumb'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
