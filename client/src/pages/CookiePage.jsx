export default function CookiePage() {
  return (
    <main style={{ maxWidth: 800, margin: '60px auto', padding: '0 20px' }}>
      <h1>🍪 Політика Cookie</h1>
      <p style={{ color: '#666', marginBottom: 40 }}>Ми використовуємо cookies щоб покращити ваш досвід</p>
      {[
        { type: 'Необхідні', desc: 'Потрібні для роботи сайту. Зберігають сесію та авторизацію.' },
        { type: 'Аналітичні', desc: 'Допомагають нам розуміти як користувачі взаємодіють з сайтом.' },
        { type: 'Функціональні', desc: 'Запам\'ятовують ваші налаштування та вподобання.' },
      ].map((c) => (
        <div key={c.type} style={{ background: '#fff', padding: 24, borderRadius: 16, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h3 style={{ margin: '0 0 8px' }}>{c.type} cookies</h3>
          <p style={{ color: '#555', margin: 0 }}>{c.desc}</p>
        </div>
      ))}
    </main>
  );
}