import React , { useState,useEffect,useRef } from 'react';
import { Sparkles, Shield, Eye, EyeOff, CheckCircle, ArrowRight, Clock } from 'lucide-react';
import { CompassLogo } from './CompassLogo';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { APIS } from '../constant';
import UserService from '../services/UserService';
import toast from 'react-hot-toast';
export default function Signup(){
const otpRefs=useRef([])


  const { authState } = useAuth();
const [password,setPassword]=useState("")
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword , setShowConfirmPassword] = useState(false);
const [firstName,setFirstName]=useState("")
const [lastName,setLastName]=useState("")
const [workEmail,setWorkEmail]=useState("")
const [errors,setErrors]=useState({})
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const [resendTimer, setResendTimer] = useState(42);
  const [timerActive,setTimerActive]=useState(false)
const [codeSent,setCodeSent]=useState(true)
const [otp,setOtp]=useState(["","","","","",""])
const [codeVerified,setCodeVerified]=useState(false)

const navigate=useNavigate()
const handleOtpChange =(index,value)=>{
if (!/^\d*$/.test(value)) return

const newOtp=[...otp]
newOtp[index]=value.substring(value.length-1)
setOtp(newOtp)

 if(value && index<5){
    otpRefs.current[index+1]?.focus()
 }
}


 // Password Strength Calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: '#cbd5e1', text: '#94a3b8' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 25, label: 'Weak', color: '#f43f5e', text: '#f43f5e' };
    if (score <= 3) return { score: 65, label: 'Medium', color: '#f59e0b', text: '#d97706' };
    return { score: 100, label: 'Strong', color: '#10b981', text: '#059669' };
  };

  const passwordStrength = getPasswordStrength(password);


const handleOtpKeyDown=(i,e)=>{

    if(e.key=="Backspace" && !otp[i] && i>0){
        otpRefs.current[i-1]?.focus();
    }
}
const handleVerifyOtp = async()=>{
const fullotp=otp.join('')
if(fullotp.length<6){
    setErrors((prev)=>({...prev,otp:'Please enter all 6 digits of the verification code.'}))
    toast.error("Please enter all 6 digits of the verification code.");
    return;
}
setErrors((prev)=>({...prev,otp:undefined}))
if(workEmail && fullotp){
  try{
const res=await UserService.postMethod(APIS.SIGNUP.VERIFY_OTP,{"email":workEmail,"otp":fullotp})
if(res.verified){
    setCodeVerified(true)
    toast.success("OTP Verified Successfully.");
}else{
  setCodeVerified(false);

  toast.error("Failed to Verify OTP");
}
  }catch(err){
    toast.error(err.message)
  }
}else{
  toast.error("Please Enter Email and OTP");
}


}


  // Overall Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required.';

    if (!workEmail.trim()) {
      newErrors.workEmail = 'Work email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
      newErrors.workEmail = 'Please enter a valid work email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the Terms of Service & Privacy Policy.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;


    try{
    const res=await UserService.postMethod(APIS.SIGNUP.CREATE_ACCOUNT,{
     "firstName": firstName,
      "lastName":lastName,
      "email": workEmail,
      "password":password
    });
    toast.success(res.message);
    navigate("/login");
  }catch(err){
    toast.error(err.message || "Failed to create Acount")
  }
  };

    async function handleSendEmailCode (){
  if (!workEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
      setErrors((prev) => ({ ...prev, workEmail: 'Please enter a valid work email address.' }));
      toast.error('Please enter a valid work email address.')
      return;
    }
    console.log(workEmail,"test")

    try{
      const res=await UserService.postMethod(APIS.SIGNUP.SEND_OTP,{"email":workEmail});
      toast.success(res?.message + ". Expires In 1 Hour");
    setCodeSent(true);
      
    setResendTimer(42);
    setTimerActive(true);
      setErrors((prev) => ({ ...prev, workEmail: undefined }));

    }catch(err){
      toast.error(err?.message)

      console.log(err.message,"total err",err)
    setCodeSent(false);
    setResendTimer(0);
    setTimerActive(false);
      // setErrors((prev) => ({ ...prev, workEmail: undefined }));



    }

    // await sendCode(workEmail);

    }

    return (
    <div className="auth-page-container">
      <div className="auth-signup-grid">
        {/* Left Column: Brand Hero Banner */}
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <CompassLogo size="lg" style={{ marginBottom: '1.5rem' }} />

          <h1 className="auth-hero-title">
            Build the future of{' '}
            <span className="accent-text">architecture</span> with precision.
          </h1>

          <p className="auth-hero-subtitle">
            Join over 10,000 system architects using our soft-tech interface to model complex
            neural deployments and cloud infrastructures.
          </p>

          {/* Soft Raised Feature Tags */}
          <div className="auth-tags-grid">
            <div className="neu-raised-sm auth-tag-card">
              <div className="neu-button auth-tag-icon">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="auth-tag-title">AI-Driven Schematics</h4>
                <p className="auth-tag-sub">Auto-layout topologies</p>
              </div>
            </div>

            <div className="neu-raised-sm auth-tag-card">
              <div className="neu-button auth-tag-icon">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="auth-tag-title">Enterprise Security</h4>
                <p className="auth-tag-sub">SOC2 & ISO Compliant</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Neumorphic Create Account Card */}
        <div className="neu-raised-lg" style={{ padding: '2.25rem', textAlign: 'left', width: '100%' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>
              Create Account
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 500, marginTop: '0.25rem' }}>
              Step 1: Verify your professional email
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* First Name & Last Name */}
            <div className="form-row-2">
              <div>
                <label className="form-label">First Name</label>
                <div className={`neu-inset input-container ${errors.firstName ? 'neu-inset-error' : ''}`}>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
                    }}
                    placeholder="Alex"
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
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: undefined }));
                    }}
                    placeholder="Rivera"
                    className="input-field"
                  />
                </div>
                {errors.lastName && <p className="error-msg">{errors.lastName}</p>}
              </div>
            </div>

            {/* Work Email Field with Verification Status Pill */}
            <div>
              <label className="form-label">Work Email</label>
              <div
                className={`neu-inset input-container ${errors.workEmail ? 'neu-inset-error' : ''}`}
                style={{ paddingRight: '0.5rem' }}
              >
                <input
                  type="email"
                  value={workEmail}
                  onChange={(e) => {
                    setWorkEmail(e.target.value);
                    if (errors.workEmail) setErrors((prev) => ({ ...prev, workEmail: undefined }));
                  }}
                  placeholder="alex.rivera@architect.com"
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={handleSendEmailCode}
                  className="neu-pill"
                  style={{
                    padding: '0.375rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    flexShrink: 0,
                    gap: '0.375rem',
                    color: '#4f46e5',
                    background: codeSent ? 'rgba(238, 242, 255, 0.7)' : 'transparent',
                  }}
                >   
                  {codeSent ? (
                    <>
                      <CheckCircle size={14} style={{ color: '#4f46e5' }} />
                      <span>Sent</span>
                    </>
                  ) : (
                    <span>Send Code</span>
                  )}
                </button>
              </div>
              {errors.workEmail && <p className="error-msg">{errors.workEmail}</p>}
            </div>

            {/* OTP Verification Code Section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label className="form-label" style={{ color: '#4f46e5', marginBottom: 0 }}>
                  ENTER VERIFICATION CODE
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#64748b' }}>
                  <Clock size={14} style={{ color: '#94a3b8' }} />
                  <span>Resend in</span>
                  <span style={{ color: '#4f46e5', fontWeight: 700 }}>
                    00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}
                  </span>
                </div>
              </div>

              {/* 6 Square Inputs + Confirm Button */}
              <div className="otp-wrapper">
                <div className="otp-inputs-row">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="neu-inset otp-box"
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="neu-primary-btn"
                  style={{ padding: '0.625rem 1rem', fontSize: '0.75rem', textTransform: 'uppercase' }}
                >
                  {codeVerified ? 'Verified ✓' : 'Confirm'}
                </button>

                {/* <button
                  type="button"
                  disabled={timerActive}
                  onClick={() => {
                    setResendTimer(42);
                    setTimerActive(true);
                    addToast('New verification code sent.', 'info');
                  }}
                  style={{
                    fontSize: '0.75rem',
                    color: '#4f46e5',
                    fontWeight: 600,
                    marginLeft: 'auto',
                    opacity: timerActive ? 0.5 : 1,
                  }}
                >
                  Resend Code
                </button> */}
              </div>
              {errors.otp && <p className="error-msg">{errors.otp}</p>}
            </div>

            {/* Create Password */}
            <div>
              <label className="form-label">Create Password</label>
              <div className={`neu-inset input-container ${errors.password ? 'neu-inset-error' : ''}`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="Min. 8 characters"
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ color: '#94a3b8', marginLeft: '0.5rem' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password Strength Meter */}
              <div style={{ marginTop: '0.5rem' }}>
                <div className="neu-inset strength-meter-bg" style={{ padding: 0 }}>
                  <div
                    className="strength-meter-fill"
                    style={{ width: `${passwordStrength.score}%`, backgroundColor: passwordStrength.color }}
                  />
                </div>
                <div className="strength-labels">
                  <span>STRENGTH:</span>
                  <span style={{ fontWeight: 800, textTransform: 'uppercase', color: passwordStrength.text }}>
                    {passwordStrength.label}
                  </span>
                </div>
              </div>
              {errors.password && <p className="error-msg">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="form-label">Confirm Password</label>
              <div className={`neu-inset input-container ${errors.confirmPassword ? 'neu-inset-error' : ''}`}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }}
                  placeholder="Confirm your password"
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ color: '#94a3b8', marginLeft: '0.5rem' }}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}
            </div>

            {/* Terms & Privacy Policy Checkbox */}
            <div>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                <div
                  onClick={() => setAgreeToTerms(!agreeToTerms)}
                  className={`neu-button ${agreeToTerms ? 'neu-button-active' : ''}`}
                  style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                    color: agreeToTerms ? '#4f46e5' : 'transparent',
                  }}
                >
                  <CheckCircle size={14} style={{ fill: '#4f46e5', color: '#ffffff' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 500, lineHeight: 1.5 }}>
                  I agree to the{' '}
                  <a href="#terms" style={{ color: '#4f46e5', fontWeight: 700 }}>
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#privacy" style={{ color: '#4f46e5', fontWeight: 700 }}>
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {errors.terms && <p className="error-msg">{errors.terms}</p>}
            </div>

            {/* Create My Account Submit Button */}
            <button
              type="submit"
              disabled={authState.loading}
              className="neu-primary-btn"
              style={{ width: '100%', padding: '0.875rem 1.5rem', fontSize: '0.875rem', gap: '0.5rem', marginTop: '0.5rem' }}
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
                  <span>Create My Account</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="social-divider">
            <div className="divider-line" />
            <span className="divider-text">OR CONTINUE WITH</span>
            <div className="divider-line" />
          </div>

          {/* Social OAuth Buttons */}
          {/* <div className="social-grid">
            <button
              type="button"
              onClick={() => signup({ firstName, lastName, email: workEmail })}
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
              onClick={() => signup({ firstName, lastName, email: workEmail })}
              className="neu-button social-btn"
            >
              <svg width="16" height="16" fill="#1e293b" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div> */}

          <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, textAlign: 'center', marginTop: '1.5rem' }}>
            Already have an account?{' '}
            <button
              onClick={() => navigate("/login")}
              style={{ color: '#4f46e5', fontWeight: 700 }}
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
