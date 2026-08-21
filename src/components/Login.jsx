import React ,{useState} from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CompassLogo } from './CompassLogo';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { APIS } from '../constant';
import UserService from '../services/UserService';
import toast from 'react-hot-toast';
export default function Login(){

  const { loginSuccess, authState } = useAuth();

  const [errors,setErrors]=useState({})

const [email,setEmail]=useState("")
const [showForgotModal,setShowForgotModal]=useState(false)
const [password,setPassword]=useState("")
const [showPassword,setShowPassword]=useState(false)
const [keepLoggedIn,setKeepLoggedIn]=useState(true);

const [forgotEmail,setForgotEmail]=useState("")

const validateData=()=>{
  const newErrors = {};
  if(!email.trim){
    newErrors.email="Email address is required."
  }
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    newErrors.email = 'Please enter a valid work email address.';
  }

  if(!password){
    newErrors.password="Password is required"
  }else if (password.length  < 6){
    newErrors.password="Password must be at least 6 characters long."
  }
  setErrors(newErrors)
  return Object.keys(newErrors).length===0;
}




  async function handleSubmit(e){
e.preventDefault()
if(!validateData()) return
let url=APIS.SIGNUP.LOGIN;
try{
const res=await UserService.postMethod(url,{"email":email,"password":password})
if(res?.success){
  toast.success("Login Successfull");
  loginSuccess(res?.data,true)
  navigate("/dashboard");

}else{
  setErrors((prev)=>({...prev,form:res.error}))
  toast.success("Invalid Login Details");
}

}catch(err){
toast.error(err?.message);
}

  }

const navigate = useNavigate();
  const redirectSignup= () => {
    navigate("/signup")
  }

  function handleForgotSubmit(){
    if(!forgotEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)){
      addToast('Please enter a valid email for password reset.', 'error')
      return
    }
    addToast(`Password reset link sent to ${forgotEmail}`, 'success');
  setShowForgotModel(false)
  setForgotEmail("")
  }

   return (
    <div className="auth-page-container">
      {/* Neumorphic Login Container Card */}
      <div
        className="neu-raised-lg auth-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Brand Compass Logo Header */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CompassLogo size="lg" showText={false} style={{ marginBottom: '0.75rem' }} />
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#1e293b',
              letterSpacing: '-0.025em',
              marginTop: '0.25rem',
            }}
          >
            SystemDesign<span style={{ color: '#4f46e5' }}>.ai</span>
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500, marginTop: '0.25rem' }}>
            Architecting the future of software.
          </p>
        </div>

        {/* Global Error Banner if any */}
        {errors.form && <div className="error-banner">{errors.form}</div>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'left' }}>
          {/* Email Address Field */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div
              className={`neu-inset input-container ${errors.email ? 'neu-inset-error' : ''}`}
            >
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="name@company.com"
                className="input-field"
              />
            </div>
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                style={{ fontSize: '0.75rem', color: '#4f46e5', fontWeight: 600 }}
              >
                Forgot?
              </button>
            </div>
            <div
              className={`neu-inset input-container ${errors.password ? 'neu-inset-error' : ''}`}
            >
              <Lock size={20} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                placeholder="••••••••"
                className="input-field"
                style={{ letterSpacing: '0.05em' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ color: '#94a3b8', marginLeft: '0.5rem' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="error-msg">{errors.password}</p>}
          </div>

          {/* Keep Me Logged In Switch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '0.25rem', marginBottom: '1.25rem' }}>
            <button
              type="button"
              onClick={() => setKeepLoggedIn(!keepLoggedIn)}
              className="toggle-switch-btn neu-switch-bg"
              style={{
                justifyContent: keepLoggedIn ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                className={`toggle-switch-thumb ${
                  keepLoggedIn ? 'neu-switch-thumb-checked' : 'neu-switch-thumb'
                }`}
              />
            </button>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>
              Keep me logged in
            </span>
          </div>

          {/* Submit Sign In Button */}
          <button
            type="submit"
            disabled={authState.loading}
            className="neu-primary-btn"
            style={{ width: '100%', padding: '0.875rem 1.5rem', fontSize: '0.875rem', gap: '0.5rem' }}
          >
            {authState.loading ? (
              <div
                className="animate-spin"
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  border: '2px solid #ffffff',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                }}
              />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="social-divider">
          <div className="divider-line" />
          <span className="divider-text">OR CONTINUE WITH</span>
          <div className="divider-line" />
        </div>

        {/* Google & GitHub OAuth Buttons */}
        {/* <div className="social-grid">
          <button
            type="button"
            onClick={() => {
              login('alex.rivera@architect.com', 'password123');
            }}
            className="neu-button social-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => {
              login('alex.rivera@architect.com', 'password123');
            }}
            className="neu-button social-btn"
          >
            <svg width="16" height="16" fill="#1e293b" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </button>
        </div> */}

        {/* Footer Link to Signup */}
        <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, marginTop: '2rem' }}>
          Don't have an account?{' '}
          <button
            onClick={() => redirectSignup()}
            style={{ color: '#4f46e5', fontWeight: 700 }}
          >
            Create Account
          </button>
        </p>
      </div>

      {/* System Status Pill Badge */}
      <div
        className="neu-pill"
        style={{ padding: '0.375rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}
      >
        <span
          className="animate-pulse"
          style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}
        />
        <span
          style={{
            fontSize: '0.625rem',
            fontWeight: 800,
            color: '#475569',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          SYSTEM OPERATIONAL
        </span>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay">
          <div className="neu-raised modal-card">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1e293b' }}>
              Reset Password
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Enter your work email address and we'll send you a password reset code.
            </p>
            <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="neu-inset" style={{ display: 'flex', alignItems: 'center', padding: '0.625rem 0.75rem' }}>
                <Mail size={16} style={{ color: '#94a3b8', marginRight: '0.5rem' }} />
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="alex.rivera@architect.com"
                  style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: '0.75rem', color: '#1e293b' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="neu-button"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="neu-primary-btn"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
