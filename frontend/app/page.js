'use client';
import { useState } from 'react';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    try {
      const payload = { original_url: longUrl };
      if (customCode) payload.short_code = customCode;
      const res = await fetch('http://127.0.0.1:8000/shorten_url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || 'Failed to shorten URL');
      }
      const data = await res.json();
      setShortUrl(`http://127.0.0.1:8000/${data.short_code}`);
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#000000ff', // true black
        fontFamily: 'Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: 480,
          padding: 40,
          borderRadius: 24,
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.35)',
          background: '#010101ff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '0.1px solid #ffffffff', // yellow border
        }}
      >
        <h1
          style={{
            margin: 0,
            marginBottom: 28,
            fontSize: 54,
            fontWeight: 900,
            color: '#ffffffff', // yellow
            letterSpacing: '-2px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            textShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }}
        >
          URL Shortener
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          <input
            type="url"
            placeholder="Enter long URL"
            value={longUrl}
            onChange={e => setLongUrl(e.target.value)}
            required
            style={{
              padding: 10,
              borderRadius: 20,
              border: '2px solid #ffffffff', // yellow
              fontSize: 15,
              fontFamily: 'Helvetica, Arial, sans-serif',
              color: '#18181b',
              background: '#f9fafb',
              fontWeight: 500,
              outline: 'none',
              marginBottom: 2,
            }}
          />
          <input
            type="text"
            placeholder="Custom short code (6 letters, optional)"
            value={customCode}
            onChange={e => setCustomCode(e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6))}
            maxLength={6}
            style={{
              padding: 10,
              borderRadius: 20,
              border: '2px solid #facc15',
              fontSize: 15,
              fontFamily: 'Helvetica, Arial, sans-serif',
              color: '#18181b',
              background: '#f9fafb',
              fontWeight: 500,
              outline: 'none',
            }}
          />
          <small style={{ color: '#facc15', marginBottom: 4, fontSize: 16, fontWeight: 600 }}>
            (Optional) Enter a custom 6-letter code. Leave blank for random.
          </small>
          <button
            type="submit"
            style={{
              padding: '18px 0',
              borderRadius: 50,
              background: '#000000ff', // red
              color: '#fff',
              border: '1px solid white',
              fontSize: 22,
              fontWeight: 800,
              fontFamily: 'Helvetica, Arial, sans-serif',
              letterSpacing: '1px',
              marginTop: 10,
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(238, 213, 217, 0.1)',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.target.style.background = '#111111ff')}
            onMouseOut={e => (e.target.style.background = '#000000ff')}
          >
            Shorten
          </button>
        </form>

        {shortUrl && (
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: 20, color: '#18181b', fontWeight: 700 }}>Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 26, color: '#f43f5e', fontWeight: 900, textDecoration: 'underline', letterSpacing: '0.5px' }}
            >
              {shortUrl}
            </a>
          </div>
        )}
        {error && <p style={{ color: '#f43f5e', marginTop: 16, fontSize: 18, fontWeight: 700 }}>{error}</p>}
      </div>
    </main>
  );
}