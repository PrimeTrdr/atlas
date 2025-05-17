import React, { useState, useEffect } from 'react';

const Dashboard = ({ user, onLogout }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [withdrawalAddress, setWithdrawalAddress] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalError, setWithdrawalError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Datos simulados
  const totalParticipants = 238887;
  const dailyRewards = 2800;
  
  useEffect(() => {
    // Simulación de actualización de tokens diarios
    const interval = setInterval(() => {
      const updatedUser = {...currentUser};
      updatedUser.tokens += 0.1; // Incremento pequeño para simular acumulación en tiempo real
      setCurrentUser(updatedUser);
      
      // Actualizar en localStorage
      const users = JSON.parse(localStorage.getItem('atlas_users') || '[]');
      const updatedUsers = users.map(u => 
        u.email === updatedUser.email ? updatedUser : u
      );
      localStorage.setItem('atlas_users', JSON.stringify(updatedUsers));
      localStorage.setItem('atlas_current_user', JSON.stringify(updatedUser));
    }, 10000); // Cada 10 segundos
    
    return () => clearInterval(interval);
  }, [currentUser]);

  const handleWithdrawal = (e) => {
    e.preventDefault();
    setWithdrawalError('');
    
    // Validación básica
    if (!withdrawalAddress) {
      setWithdrawalError('Please enter a wallet address');
      return;
    }
    
    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount <= 0) {
      setWithdrawalError('Please enter a valid amount');
      return;
    }
    
    if (amount > currentUser.tokens) {
      setWithdrawalError('Insufficient tokens');
      return;
    }
    
    // Simulación de retiro
    const updatedUser = {...currentUser};
    updatedUser.tokens -= amount;
    updatedUser.withdrawals = [
      ...(updatedUser.withdrawals || []),
      {
        address: withdrawalAddress,
        amount,
        date: new Date().toISOString(),
        status: 'Completed'
      }
    ];
    
    // Actualizar en localStorage
    const users = JSON.parse(localStorage.getItem('atlas_users') || '[]');
    const updatedUsers = users.map(u => 
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem('atlas_users', JSON.stringify(updatedUsers));
    localStorage.setItem('atlas_current_user', JSON.stringify(updatedUser));
    
    setCurrentUser(updatedUser);
    setWithdrawalAddress('');
    setWithdrawalAmount('');
    alert('Withdrawal successful!');
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(currentUser.referralCode);
    alert('Referral code copied to clipboard!');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Atlas Token <span className="gradient-text">Dashboard</span></h1>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Current Airdrop Participants</h3>
          <div className="stat-value">{totalParticipants.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <h3>Daily Rewards Generated</h3>
          <div className="stat-value">{dailyRewards.toLocaleString()} tokens</div>
        </div>
        <div className="stat-card">
          <h3>Your Token Balance</h3>
          <div className="stat-value">{currentUser.tokens.toFixed(2)} ATLAS</div>
        </div>
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'referrals' ? 'active' : ''}`}
          onClick={() => setActiveTab('referrals')}
        >
          Referrals
        </button>
        <button 
          className={`tab-btn ${activeTab === 'withdraw' ? 'active' : ''}`}
          onClick={() => setActiveTab('withdraw')}
        >
          Withdraw
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <h2>Welcome, {currentUser.email}</h2>
            <p>Thank you for participating in the Atlas Token airdrop program. Your tokens are accumulating daily, and you can withdraw them to your preferred wallet at any time.</p>
            
            <div className="user-info">
              <div className="info-item">
                <span className="info-label">Your Referral Code:</span>
                <span className="info-value">{currentUser.referralCode}</span>
                <button className="copy-btn" onClick={copyReferralCode}>Copy</button>
              </div>
              <div className="info-item">
                <span className="info-label">Total Referrals:</span>
                <span className="info-value">{currentUser.referrals?.length || 0}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Token Balance:</span>
                <span className="info-value">{currentUser.tokens.toFixed(2)} ATLAS</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'referrals' && (
          <div className="referrals-tab">
            <h2>Your Referrals</h2>
            <div className="referral-code-section">
              <p>Share your referral code with friends to earn bonus tokens:</p>
              <div className="referral-code">
                <span>{currentUser.referralCode}</span>
                <button className="copy-btn" onClick={copyReferralCode}>Copy</button>
              </div>
            </div>
            
            <div className="referrals-list">
              <h3>Your Invited Users</h3>
              {currentUser.referrals && currentUser.referrals.length > 0 ? (
                <table className="referrals-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Date Joined</th>
                      <th>Bonus Earned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUser.referrals.map((referral, index) => (
                      <tr key={index}>
                        <td>{referral.email}</td>
                        <td>{new Date(referral.date).toLocaleDateString()}</td>
                        <td>{referral.bonus} ATLAS</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-referrals">You haven't invited anyone yet. Share your referral code to start earning bonus tokens!</p>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'withdraw' && (
          <div className="withdraw-tab">
            <h2>Withdraw Tokens</h2>
            <p>Transfer your ATLAS tokens to your preferred wallet.</p>
            
            <form onSubmit={handleWithdrawal} className="withdrawal-form">
              {withdrawalError && <div className="error-message">{withdrawalError}</div>}
              
              <div className="form-group">
                <label htmlFor="withdrawalAddress">Wallet Address</label>
                <input
                  type="text"
                  id="withdrawalAddress"
                  value={withdrawalAddress}
                  onChange={(e) => setWithdrawalAddress(e.target.value)}
                  placeholder="Enter your wallet address"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="withdrawalAmount">Amount (ATLAS)</label>
                <input
                  type="number"
                  id="withdrawalAmount"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  placeholder="Enter amount to withdraw"
                  min="0.1"
                  step="0.1"
                  max={currentUser.tokens}
                  required
                />
                <small>Available: {currentUser.tokens.toFixed(2)} ATLAS</small>
              </div>
              
              <button type="submit" className="withdraw-btn">Withdraw Tokens</button>
            </form>
            
            <div className="withdrawal-history">
              <h3>Withdrawal History</h3>
              {currentUser.withdrawals && currentUser.withdrawals.length > 0 ? (
                <table className="withdrawals-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Address</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUser.withdrawals.map((withdrawal, index) => (
                      <tr key={index}>
                        <td>{new Date(withdrawal.date).toLocaleString()}</td>
                        <td>{withdrawal.amount.toFixed(2)} ATLAS</td>
                        <td className="address-cell">{`${withdrawal.address.substring(0, 6)}...${withdrawal.address.substring(withdrawal.address.length - 4)}`}</td>
                        <td>{withdrawal.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-withdrawals">No withdrawal history yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
