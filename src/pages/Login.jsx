import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Headphones,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Simple image links for illustration and demo accounts
const LOGIN_ILLUSTRATION_URL = '/login-illustration.png';
const EMPLOYEE_AVATAR_URL = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80';
const SUPPORT_AVATAR_URL = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';

const Login = () => {
  // Simple beginner-level state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  // Simple form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    login(email);
    navigate('/dashboard');
  };

  // Click handler for 1-click demo accounts
  const fillDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('123456');
    setError('');
  };

  return (
    <div className="login-screen-wrapper">
      <div className="login-split-card">
        {/* Left Side: HelpDesk Branding & Image Link */}
        <div className="login-left-panel">
          <div className="login-brand-bar">
            <div className="login-brand-headphone">
              <Headphones size={36} strokeWidth={2.5} />
            </div>
            <div className="login-brand-titles">
              <h2 className="login-brand-name">HelpDesk</h2>
              <span className="login-brand-desc">Support Ticket Management System</span>
            </div>
          </div>

          {/* Simple Image Tag with Image Link - No SVG paths */}
          <div className="login-hero-image-wrap">
            <img
              src={LOGIN_ILLUSTRATION_URL}
              alt="Support Desk Illustration"
              className="login-hero-img"
            />
          </div>

          <div className="login-tagline-box">
            <p className="login-tagline-text">
              Get your issues resolved,
              <br />
              faster and easier.
            </p>
          </div>
        </div>

        {/* Right Side: Form & Demo Accounts */}
        <div className="login-right-panel">
          <div className="login-form-wrapper">
            <div className="login-heading-area">
              <h1 className="login-heading-title">Welcome Back</h1>
              <p className="login-heading-subtitle">Login to your account</p>
            </div>

            {error && (
              <div className="login-error-alert">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-card-form">
              {/* Email Address */}
              <div className="login-field-group">
                <label className="login-field-label">
                  <Mail size={16} className="label-icon" />
                  <span>Email address</span>
                </label>
                <div className="login-input-container">
                  <User size={18} className="field-adornment-icon" />
                  <input
                    type="email"
                    className="login-text-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="login-field-group">
                <label className="login-field-label">
                  <Lock size={16} className="label-icon" />
                  <span>Password</span>
                </label>
                <div className="login-input-container">
                  <Lock size={18} className="field-adornment-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="login-text-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="login-submit-btn">
                Login
              </button>
            </form>

            {/* Demo Accounts */}
            <div className="login-demo-section">
              <h3 className="demo-section-title">Demo Accounts</h3>

              <div className="demo-cards-stack">
                {/* Employee Demo Card */}
                <button
                  type="button"
                  className="demo-person-card"
                  onClick={() => fillDemo('user@company.com')}
                >
                  <div className="demo-avatar-wrapper">
                    <img
                      src={EMPLOYEE_AVATAR_URL}
                      alt="Employee Avatar"
                      className="demo-avatar-img"
                    />
                  </div>
                  <div className="demo-person-details">
                    <span className="demo-person-title">Employee Login</span>
                    <span className="demo-person-creds">user@company.com / 123456</span>
                  </div>
                </button>

                {/* Support Staff Demo Card */}
                <button
                  type="button"
                  className="demo-person-card"
                  onClick={() => fillDemo('support@company.com')}
                >
                  <div className="demo-avatar-wrapper">
                    <img
                      src={SUPPORT_AVATAR_URL}
                      alt="Support Staff Avatar"
                      className="demo-avatar-img"
                    />
                  </div>
                  <div className="demo-person-details">
                    <span className="demo-person-title">Support Staff Login</span>
                    <span className="demo-person-creds">support@company.com / 123456</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
