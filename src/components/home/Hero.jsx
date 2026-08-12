export default function Hero() {
  return (
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
        Learn Skills. Build Your Future.
      </h1>
      <p style={{ color: '#475569', fontSize: '18px', maxWidth: '600px', textAlign: 'center' }}>
        Learn practical skills from expert instructors, work on real projects, join live classes, earn certificates, and prepare for your career.
      </p>
      <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
        <a href="/register" style={{
          backgroundColor: '#2563EB',
          color: '#fff',
          padding: '14px 28px',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          Start Learning
        </a>
        <a href="/courses" style={{
          backgroundColor: '#fff',
          color: '#334155',
          padding: '14px 28px',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: '600',
          border: '1px solid #e2e8f0'
        }}>
          Explore Courses
        </a>
      </div>
    </div>
  )
}