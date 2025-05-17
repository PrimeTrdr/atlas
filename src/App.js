import React, { useState, useEffect } from 'react';
import './index.css';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function App() {
  const [activeWallet, setActiveWallet] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  
  // Ethereum and Solana addresses
  const ethAddress = "0x94D3A8Ae7586145B3f12BEBE1F016B91fE0b30B1";
  const solAddress = "J4zfVhdAafJh2WGYXom6C8hwGiAv36TnQNsaM3EssErb";
  
  useEffect(() => {
    // Verificar si hay un usuario en sesión
    const savedUser = localStorage.getItem('atlas_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('atlas_current_user');
    setCurrentUser(null);
  };

  const toggleAuth = () => {
    setShowAuth(!showAuth);
  };
  
  return (
    <div className="App">
      {/* Si el usuario está autenticado, mostrar el dashboard */}
      {currentUser ? (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <>
          {/* Header */}
          <header className="header">
            <div className="container header-container">
              <div className="logo">
                <img src="/images/logo.png" alt="Atlas Token" />
                <div className="logo-text gradient-text">ATLAS</div>
              </div>
              <nav>
                <ul className="nav-links">
                  <li><a href="#about">About</a></li>
                  <li><a href="#token">Token</a></li>
                  <li><a href="#airdrop">Airdrop</a></li>
                  <li><a href="#wallet">Connect Wallet</a></li>
                  <li><a href="#partners">Partners</a></li>
                </ul>
              </nav>
              <button className="login-btn" onClick={toggleAuth}>
                {showAuth ? 'Close' : 'Login / Register'}
              </button>
              <button className="mobile-menu-btn">☰</button>
            </div>
          </header>

          {/* Auth Modal */}
          {showAuth && (
            <div className="auth-modal">
              <Auth onLogin={handleLogin} />
            </div>
          )}

          {/* Hero Section */}
          <section className="hero" id="hero">
            <video className="hero-video" autoPlay loop muted playsInline>
              <source src="/images/hero-bg-optimized.mp4" type="video/mp4" />
            </video>
            <div className="container">
              <div className="hero-content">
                <div className="hero-text">
                  <h1 className="hero-title">The Future of <span className="gradient-text">Gaming Rewards</span> is Here</h1>
                  <p className="hero-subtitle">
                    Atlas is revolutionizing how AAA game developers and Web3 companies reward players with blockchain-based incentives. Backed by a $100 million Series A venture capital investment, Atlas is bridging the gap between traditional gaming and blockchain technology.
                  </p>
                  <div className="hero-buttons">
                    <button onClick={toggleAuth} className="btn btn-primary">Login / Register</button>
                    <a href="#token" className="btn btn-secondary">Learn More</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="section about" id="about">
            <div className="container">
              <h2 className="section-title">Revolutionizing <span className="gradient-text">Gaming Rewards</span></h2>
              <p className="section-subtitle">
                Atlas is transforming how mainstream AAA game developers integrate blockchain technology to provide legal rewards for players.
              </p>
              <div className="about-content">
                <div className="about-text">
                  <h3>Backed by $100 Million in Venture Capital</h3>
                  <p>
                    Atlas token is supported by a substantial $100 million Series A funding round from leading venture capitalists in both the gaming and blockchain industries. This significant investment demonstrates the strong confidence in Atlas's vision to bridge the gap between traditional gaming and blockchain technology, providing a solid foundation for long-term growth and development.
                  </p>
                  <p>
                    Our strategic partnerships with major game development studios like Ubisoft, Bethesda, Rockstar, Unity, and Epic Games position Atlas as the premier token for mainstream gaming integration. These collaborations ensure that Atlas will be implemented across a wide range of popular games, creating a robust ecosystem for players to earn and utilize rewards.
                  </p>
                  <p>
                    The Atlas platform provides game developers with a seamless solution to incorporate blockchain rewards into their existing titles without disrupting gameplay or compromising user experience. By offering a standardized framework for in-game rewards, Atlas eliminates the technical barriers that have previously prevented mainstream adoption of blockchain technology in gaming.
                  </p>
                </div>
                <div className="about-image">
                  {/* Logo removed as requested */}
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="section features" id="features">
            <div className="container">
              <h2 className="section-title">Why Choose <span className="gradient-text">Atlas</span></h2>
              <p className="section-subtitle">
                Atlas offers unique advantages for both players and developers in the gaming ecosystem.
              </p>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-gamepad"></i>
                  </div>
                  <h3 className="feature-title">AAA Gaming Integration</h3>
                  <p className="feature-text">
                    Atlas is designed specifically for integration with mainstream AAA games, providing a seamless experience for players. Our partnerships with major game studios ensure wide adoption across popular titles, creating a unified reward system that works across multiple games and platforms. Players can earn rewards through normal gameplay without disrupting their gaming experience.
                  </p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h3 className="feature-title">Legal Compliance</h3>
                  <p className="feature-text">
                    Atlas has been developed with legal compliance as a core principle. We work closely with regulatory bodies to ensure that all rewards earned through Atlas are fully compliant with relevant laws and regulations. This provides peace of mind for both players and developers, eliminating concerns about legal issues that have plagued other gaming reward systems in the past.
                  </p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-exchange-alt"></i>
                  </div>
                  <h3 className="feature-title">Cross-Platform Compatibility</h3>
                  <p className="feature-text">
                    Whether you're playing on PC, console, or mobile, Atlas rewards work seamlessly across all platforms. Our technology integrates with both Web3 and Web2.5 environments, making it accessible to traditional gamers while providing the benefits of blockchain technology. This cross-platform approach ensures that players can access their rewards regardless of how or where they play.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Token Section */}
          <section className="section token" id="token">
            <div className="container">
              <h2 className="section-title">Atlas <span className="gradient-text">Token</span></h2>
              <p className="section-subtitle">
                The Atlas token is designed to provide value and utility across the gaming ecosystem.
              </p>
              <div className="token-info">
                <div className="token-card">
                  <div className="token-value">$100M</div>
                  <div className="token-label">Venture Capital Backing</div>
                </div>
                <div className="token-card">
                  <div className="token-value">12</div>
                  <div className="token-label">Monthly Airdrops</div>
                </div>
                <div className="token-card">
                  <div className="token-value">2</div>
                  <div className="token-label">Blockchain Networks</div>
                </div>
              </div>
              
              <div className="contract-backing">
                <h3>Transparency & Trust</h3>
                <p>
                  Atlas Token is fully backed by $100 million in secured funds. You can verify this backing on the Ethereum blockchain through our public contract address:
                </p>
                <div className="contract-address">
                  <a href="https://etherscan.io/address/0x4ed36f7a26a07d387fd2f201842829e4f29ddb1d" target="_blank" rel="noopener noreferrer">
                    0x4ed36f7a26a07d387fd2f201842829e4f29ddb1d
                  </a>
                  <button className="copy-btn" onClick={() => {
                    navigator.clipboard.writeText('0x4ed36f7a26a07d387fd2f201842829e4f29ddb1d');
                    alert('Contract address copied to clipboard!');
                  }}>
                    Copy Address
                  </button>
                </div>
                <p className="verify-text">
                  We believe in full transparency. Feel free to verify our backing at any time through Etherscan.
                </p>
              </div>
              <div className="about-content" style={{ marginTop: '50px' }}>
                <div className="about-text">
                  <h3>Token Utility</h3>
                  <p>
                    Atlas token serves as the foundation for a new gaming rewards ecosystem that benefits both players and developers. For players, Atlas provides a way to earn valuable rewards through normal gameplay, which can be used across multiple games or exchanged for other cryptocurrencies. These rewards are legally compliant, eliminating concerns about regulatory issues that have affected other gaming reward systems.
                  </p>
                  <p>
                    For developers, Atlas offers a standardized framework for implementing blockchain rewards without needing to create their own token or deal with complex blockchain integration. This significantly reduces development time and costs while providing players with rewards that have real-world value. The $100 million venture capital backing ensures stability and longevity for the token, making it a reliable choice for both players and developers.
                  </p>
                  <p>
                    The dual-chain implementation on both Ethereum and Solana networks provides flexibility and accessibility, allowing users to choose the blockchain that best suits their needs. This approach combines Ethereum's security and widespread adoption with Solana's speed and low transaction costs, creating an optimal experience for all users regardless of their blockchain preference.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Airdrop Section */}
          <section className="section airdrop" id="airdrop">
            <video className="airdrop-video" autoPlay loop muted playsInline>
              <source src="/images/blue-green-plexus-connections-technology-backgroun-2024-04-25-17-50-10-utc.mp4" type="video/mp4" />
            </video>
            <div className="container">
              <h2 className="section-title">Atlas <span className="gradient-text" style={{color: 'white'}}>Airdrop</span> Schedule</h2>
              <p className="section-subtitle">
                Join our exclusive airdrop program with monthly distributions for token holders.
              </p>
              <div className="about-content" style={{ color: 'white', marginBottom: '40px' }}>
                <div className="about-text">
                  <p>
                    The Atlas token airdrop program will run for 12 consecutive months, with distributions occurring on the 17th of each month. The first four months will feature the largest and most significant airdrops, providing early supporters with substantial rewards for their participation. To qualify for these airdrops, participants must hold their Atlas tokens in their wallets throughout the program.
                  </p>
                  <p>
                    In addition to the monthly airdrops on the 17th, pre-airdrops will be distributed to holders at the beginning of each month. These pre-airdrops serve as a bonus for loyal token holders and provide additional incentives for long-term holding. The combination of monthly airdrops and pre-airdrops creates a rewarding experience for all Atlas token holders throughout the 12-month program.
                  </p>
                  <p>
                    To maximize your rewards, we recommend holding your tokens for the entire duration of the airdrop program. The cumulative value of all airdrops is designed to provide significant returns for long-term holders, with the potential for substantial growth as the Atlas ecosystem expands through our partnerships with major game developers and studios.
                  </p>
                </div>
              </div>
              <div className="airdrop-steps">
                <div className="airdrop-step">
                  <div className="step-number">1</div>
                  <h3 className="step-title">Register an Account</h3>
                  <p className="step-text">
                    Create your Atlas account to participate in the token airdrop program and track your rewards.
                  </p>
                </div>
                <div className="airdrop-step">
                  <div className="step-number">2</div>
                  <h3 className="step-title">Connect Your Wallet</h3>
                  <p className="step-text">
                    Link your compatible wallet (MetaMask, Trust Wallet, Phantom, or Solflare) to receive your Atlas tokens.
                  </p>
                </div>
                <div className="airdrop-step">
                  <div className="step-number">3</div>
                  <h3 className="step-title">Receive Daily Rewards</h3>
                  <p className="step-text">
                    Earn Atlas tokens daily and track your accumulating rewards in your personal dashboard.
                  </p>
                </div>
                <div className="airdrop-step">
                  <div className="step-number">4</div>
                  <h3 className="step-title">Withdraw to Your Wallet</h3>
                  <p className="step-text">
                    Transfer your earned Atlas tokens to your preferred wallet whenever you want.
                  </p>
                </div>
              </div>
              <div className="airdrop-cta">
                <button onClick={toggleAuth} className="btn btn-primary">Register Now</button>
              </div>
            </div>
          </section>

          {/* Wallet Section */}
          <section className="section wallet-connect" id="wallet">
            <div className="container">
              <h2 className="section-title">Connect Your <span className="gradient-text">Wallet</span></h2>
              <p className="section-subtitle">
                Choose your preferred wallet to participate in the Atlas token pre-launch.
              </p>
              <div className="wallet-options">
                <div 
                  className={`wallet-option ${activeWallet === 'metamask' ? 'active' : ''}`}
                  onClick={() => setActiveWallet('metamask')}
                >
                  <img src="/images/metamask-icon.svg" alt="MetaMask" className="wallet-logo" />
                  <div className="wallet-name">MetaMask</div>
                </div>
                <div 
                  className={`wallet-option ${activeWallet === 'trustwallet' ? 'active' : ''}`}
                  onClick={() => setActiveWallet('trustwallet')}
                >
                  <img src="/images/trustwallet-icon.svg" alt="Trust Wallet" className="wallet-logo" />
                  <div className="wallet-name">Trust Wallet</div>
                </div>
                <div 
                  className={`wallet-option ${activeWallet === 'phantom' ? 'active' : ''}`}
                  onClick={() => setActiveWallet('phantom')}
                >
                  <img src="/images/phantom-icon.svg" alt="Phantom" className="wallet-logo" />
                  <div className="wallet-name">Phantom</div>
                </div>
                <div 
                  className={`wallet-option ${activeWallet === 'solflare' ? 'active' : ''}`}
                  onClick={() => setActiveWallet('solflare')}
                >
                  <img src="/images/solflare-icon.svg" alt="Solflare" className="wallet-logo" />
                  <div className="wallet-name">Solflare</div>
                </div>
              </div>
              
              {activeWallet && (
                <div className="wallet-address">
                  <h3 className="address-title">
                    {(activeWallet === 'metamask' || activeWallet === 'trustwallet') 
                      ? 'Send ETH to this address:' 
                      : 'Send SOL to this address:'}
                  </h3>
                  <div className="address-box">
                    {(activeWallet === 'metamask' || activeWallet === 'trustwallet') 
                      ? ethAddress
                      : solAddress}
                  </div>
                  <p style={{marginBottom: '20px'}}>
                    Wait 30-45 minutes after sending funds to receive your Atlas tokens and pre-airdrop bonus. Make sure your wallet accepts ERC20 tokens for Ethereum or SPL tokens for Solana.
                  </p>
                  <button className="copy-btn">
                    Copy Address
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Partners Section */}
          <section id="partners" className="partners">
            <div className="container">
              <h2 className="section-title">Our Partners</h2>
              <p className="section-subtitle">
                Atlas is backed by the biggest names in gaming and blockchain technology.
              </p>
              <div className="partners-logos">
                <div className="white-logo-container">
                  <div className="white-logo">UBISOFT</div>
                </div>
                <div className="white-logo-container">
                  <div className="white-logo">BETHESDA</div>
                </div>
                <div className="white-logo-container">
                  <div className="white-logo">ROCKSTAR</div>
                </div>
                <div className="white-logo-container">
                  <div className="white-logo">UNITY</div>
                </div>
                <div className="white-logo-container">
                  <div className="white-logo">EPIC GAMES</div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                <div className="footer-info">
                  <div className="footer-logo">
                    <img src="/images/logo.png" alt="Atlas Token" />
                    <div className="footer-logo-text">ATLAS</div>
                  </div>
                  <p className="footer-text">
                    Atlas is revolutionizing how AAA game developers and Web3 companies reward players with blockchain-based incentives.
                  </p>
                  <div className="social-links">
                    <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-discord"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-telegram"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-medium"></i></a>
                  </div>
                </div>
                <div className="footer-links-container">
                  <div className="footer-links-column">
                    <h3 className="footer-title">Quick Links</h3>
                    <ul className="footer-links">
                      <li><a href="#about">About</a></li>
                      <li><a href="#token">Token</a></li>
                      <li><a href="#airdrop">Airdrop</a></li>
                      <li><a href="#wallet">Connect Wallet</a></li>
                      <li><a href="#partners">Partners</a></li>
                    </ul>
                  </div>
                  <div className="footer-links-column">
                    <h3 className="footer-title">Resources</h3>
                    <ul className="footer-links">
                      <li><a href="#">Whitepaper</a></li>
                      <li><a href="#">Documentation</a></li>
                      <li><a href="#">FAQ</a></li>
                      <li><a href="#">Blog</a></li>
                    </ul>
                  </div>
                  <div className="footer-links-column">
                    <h3 className="footer-title">Legal</h3>
                    <ul className="footer-links">
                      <li><a href="#">Terms of Service</a></li>
                      <li><a href="#">Privacy Policy</a></li>
                      <li><a href="#">Disclaimer</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <p>&copy; 2025 Atlas Token. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
