export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>CloudVibes Test Page</h1>
      <p>If you can see this, the Next.js server is working correctly!</p>
      <div>
        <strong>Server Info:</strong>
        <ul>
          <li>Next.js 15.5.0 with Turbopack</li>
          <li>Running on port 3000</li>
          <li>CORS enabled</li>
          <li>allowedDevOrigins configured</li>
        </ul>
      </div>
      <div>
        <strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server-side'}
      </div>
      <div>
        <strong>User Agent:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent : 'Server-side'}
      </div>
    </div>
  );
}