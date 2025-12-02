import React, { useState } from 'react';
import AvatarGenerator from './components/AvatarGenerator';
import { generateNickname } from './utils/nicknameGenerator';
import './App.css';

function App() {
  const [address, setAddress] = useState('');

  const handleRandom = () => {
    // Generate a random valid-looking hex string
    const randomHex = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setAddress(randomHex);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Ethereum Avatar Generator</h1>
        <p>Enter an Ethereum address to generate a unique, deterministic identity.</p>
      </header>

      <main>
        <div className="avatar-display">
          <AvatarGenerator address={address} size={240} />
          {address && address.startsWith('0x') && address.length === 42 && (
            <div className="nickname-display">
              {generateNickname(address)}
            </div>
          )}
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="0x..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="address-input"
          />
          <button onClick={handleRandom} className="random-btn">
            Random Address
          </button>
        </div>

        <div className="info">
          <p>
            {address ? (
              address.startsWith('0x') && address.length === 42 ?
                "Valid format detected" : "Invalid format (must be 0x + 40 hex chars)"
            ) : "Waiting for input..."}
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
