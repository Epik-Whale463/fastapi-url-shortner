'use client';
import { useState } from 'react';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    try {
      const res = await fetch('http://127.0.0.1:8000/shorten_url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ original_url: longUrl }),
      });
      if (!res.ok) throw new Error('Failed to shorten URL');
      const data = await res.json();
      setShortUrl(`http://127.0.0.1:8000/${data.short_code}`);
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div style={{ width: 420, padding: 24, borderRadius: 10, boxShadow: '0 6px 18px rgba(0,0,0,0.08)', background: '#fff' }}>
        <h1 style={{ margin: 0, marginBottom: 12, fontSize: 20 }}>URL Shortener</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="url"
            placeholder="Enter long URL"
            value={longUrl}
            onChange={e => setLongUrl(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #e5e7eb' }}
          />
          <button type="submit" style={{ padding: 10, borderRadius: 6, background: '#111827', color: '#fff', border: 'none' }}>Shorten</button>
        </form>

        {shortUrl && (
          <div style={{ marginTop: 16 }}>
            <p style={{ margin: 0 }}>Short URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          </div>
        )}
        {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
      </div>
    </main>
  );
}