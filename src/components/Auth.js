import React, { useState } from 'react';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validación básica
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!isLogin) {
      // Simulación de registro
      localStorage.setItem('atlas_users', JSON.stringify([
        ...(JSON.parse(localStorage.getItem('atlas_users') || '[]')),
        {
          email,
          password, // En una app real, nunca almacenar contraseñas en texto plano
          referralCode: generateReferralCode(),
          referrals: [],
          tokens: 100, // Tokens iniciales
          withdrawals: []
        }
      ]));
      setIsLogin(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      alert('Registration successful! Please log in.');
    } else {
      // Simulación de login
      const users = JSON.parse(localStorage.getItem('atlas_users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem('atlas_current_user', JSON.stringify(user));
        onLogin(user);
      } else {
        setError('Invalid email or password');
      }
    }
  };

  const generateReferralCode = () => {
    return 'ATLAS' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{isLogin ? 'Login' : 'Register'}</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          
          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        
        <div className="auth-toggle">
          {isLogin ? (
            <p>Don't have an account? <button onClick={() => setIsLogin(false)}>Register</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setIsLogin(true)}>Login</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
