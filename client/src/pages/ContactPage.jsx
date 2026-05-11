export default function ContactPage() {
  return (
    <main style={{ maxWidth: 600, margin: '60px auto', padding: '0 20px' }}>
      <h1>📬 Зв'язатись з нами</h1>
      <p style={{ color: '#666', marginBottom: 40 }}>Маєш питання? Ми завжди на зв'язку</p>
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        {[
          { icon: '📧', label: 'Email', value: 'hello@susidua.com' },
          { icon: '💬', label: 'Telegram', value: '@susidua' },
          { icon: '📍', label: 'Адреса', value: 'Львів, Україна 🇺🇦' },
        ].map((c) => (
          <div key={c.label} style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
            <span style={{ fontSize: 28 }}>{c.icon}</span>
            <div>
              <div style={{ color: '#999', fontSize: 13 }}>{c.label}</div>
              <div style={{ fontWeight: 600 }}>{c.value}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}