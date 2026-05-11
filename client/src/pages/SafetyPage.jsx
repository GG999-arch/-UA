export default function SafetyPage() {
  return (
    <main style={{ maxWidth: 800, margin: '60px auto', padding: '0 20px' }}>
      <h1>🔒 Безпека</h1>
      <p style={{ color: '#666', marginBottom: 40 }}>Поради як безпечно знайти житло та сусіда</p>
      {[
        { icon: '👁️', title: 'Перевіряй профіль', text: 'Завжди переглядай профіль людини перед зустріччю. Звертай увагу на верифікацію та відгуки.' },
        { icon: '🤝', title: 'Зустрічайся в публічних місцях', text: 'Перша зустріч має бути в кафе або людному місці, не одразу в квартирі.' },
        { icon: '📝', title: 'Підписуй договір', text: 'Завжди укладай письмовий договір оренди. Це захистить обидві сторони.' },
        { icon: '💳', title: 'Не передавай гроші наперед', text: 'Не відправляй передоплату людям яких не зустрічав особисто.' },
        { icon: '📞', title: 'Повідом близьких', text: 'Розкажи друзям або родичам куди йдеш на перегляд житла.' },
        { icon: '🚨', title: 'Повідом про підозрілі оголошення', text: 'Якщо щось здається підозрілим — натисни кнопку "Поскаржитись" на оголошенні.' },
      ].map((item) => (
        <div key={item.title} style={{ display: 'flex', gap: 20, marginBottom: 32, background: '#fff', padding: 24, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <span style={{ fontSize: 36 }}>{item.icon}</span>
          <div>
            <h3 style={{ margin: '0 0 8px' }}>{item.title}</h3>
            <p style={{ color: '#555', margin: 0 }}>{item.text}</p>
          </div>
        </div>
      ))}
    </main>
  );
}