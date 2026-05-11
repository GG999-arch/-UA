export default function TipsPage() {
  return (
    <main style={{ maxWidth: 800, margin: '60px auto', padding: '0 20px' }}>
      <h1>💡 Поради</h1>
      <p style={{ color: '#666', marginBottom: 40 }}>Лайфхаки для орендарів та власників</p>
      {[
        { icon: '📸', title: 'Додавай якісні фото', text: 'Оголошення з гарними фото отримують в 3 рази більше переглядів. Фотографуй при денному світлі.' },
        { icon: '💬', title: 'Описуй свої звички', text: 'Чим детальніше ти описуєш свій розпорядок дня — тим легше знайти сумісного сусіда.' },
        { icon: '💰', title: 'Вказуй реальну ціну', text: 'Вказуй всі додаткові витрати — комуналка, інтернет, паркінг. Це зекономить час обом сторонам.' },
        { icon: '🏠', title: 'Опиши район', text: 'Вкажи що поруч — метро, магазини, парки, університети. Це важливо для потенційних орендарів.' },
        { icon: '⚡', title: 'Відповідай швидко', text: 'Чим швидше ти відповідаєш на повідомлення — тим вищий рейтинг твого профілю.' },
        { icon: '🔄', title: 'Оновлюй оголошення', text: 'Регулярно оновлюй оголошення щоб воно залишалось у топі пошуку.' },
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