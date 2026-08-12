export default function Home() {
  return (
    <main>
      <div style={{ 
        backgroundColor: '#F8FAFC', 
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        padding: '40px'
      }}>
        <h1 style={{ color: '#0F172A', fontSize: '48px', fontWeight: 'bold' }}>
          TEST — IS THIS LIGHT?
        </h1>
        <p style={{ color: '#475569', fontSize: '18px' }}>
          If you see light gray, the page works.
        </p>
      </div>
    </main>
  )
}