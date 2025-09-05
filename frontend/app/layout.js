import './globals.css';

export const metadata = {
  title: 'URL Shortener',
  description: 'A simple FastAPI + Next.js URL shortener',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Helvetica, Arial, sans-serif', background: '#f9f9f9', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}