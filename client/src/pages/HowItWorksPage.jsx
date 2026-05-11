import { Link } from 'react-router-dom';
import './HowItWorksPage.css';

const STEPS = [
  {
    n: '01',
    icon: '🔍',
    title: 'Шукай оголошення',
    desc: 'Переходь на сторінку оголошень і фільтруй за містом, ціною, типом приміщення та зручностями. Доступно понад 2 600 актуальних варіантів по всій Україні.',
    photo: '/step1.jpg',
    tips: ['Використовуй фільтри для точного пошуку', 'Зберігай сподобані оголошення в закладки', 'Переглядай нові оголошення щодня'],
  },
  {
    n: '02',
    icon: '👤',
    title: 'Вивчи профіль',
    desc: 'Перед тим як писати, уважно прочитай профіль та оголошення. Дізнайся про звички, розклад, вимоги та очікування потенційного сусіда.',
    photo: '/step2.jpg',
    tips: ['Читай відгуки від попередніх сусідів', 'Перевіряй верифікованих користувачів', 'Зверни увагу на сумісність стилю життя'],
  },
  {
    n: '03',
    icon: '💬',
    title: 'Напиши в чат',
    desc: 'Використовуй вбудований безпечний чат для першого контакту. Не передавай особисті контакти до того, як переконаєшся в серйозності намірів.',
    photo: '/step3.jpg',
    tips: ['Будь конкретним у першому повідомленні', 'Запитай про все, що важливо для тебе', 'Безпека — не ділись адресою одразу'],
  },
  {
    n: '04',
    icon: '🤝',
    title: 'Домовляйся та вселяйся',
    desc: 'Організуй особисту зустріч для перегляду житла. Обговоріть усі умови, підпишіть договір і познайомтесь із новим сусідом.',
    photo: '/step4.jpg',
    tips: ['Завжди зустрічайся в безпечному місці спочатку', 'Оформлюй договір у письмовій формі', 'Узгодь правила спільного проживання'],
  },
  {
    n: '05',
    icon: '🏡',
    title: 'Живи та залишай відгук',
    desc: 'Після заселення поділись своїм досвідом. Відгуки допомагають іншим знайти надійних сусідів та роблять платформу безпечнішою для всіх.',
    photo: '/step5.jpg',
    tips: ['Залишай чесні та конструктивні відгуки', 'Рекомендуй платформу друзям', 'Оновлюй оголошення за потреби'],
  },
];

const SAFETY_TIPS = [
  { icon: '🛡️', title: 'Верифікація профілів', desc: 'Перевіряємо документи та номери телефонів.' },
  { icon: '🔒', title: 'Зашифрований чат', desc: 'Всі повідомлення захищені шифруванням.' },
  { icon: '🚩', title: 'Система скарг', desc: 'Легко поскаржитися на підозрілих користувачів.' },
  { icon: '💼', title: 'Безпечна угода', desc: 'Шаблони договорів оренди від юристів.' },
];

export default function HowItWorksPage() {
  return (
    <main className="hiw">
      {/* Header */}
      <section className="hiw__hero">
        <div className="container">
          <span className="hiw__badge">📖 Інструкція</span>
          <h1>Як це працює?</h1>
          <p>Від першого пошуку до нового дому — просто та безпечно</p>
        </div>
      </section>

      {/* Steps */}
      <section className="hiw__steps section">
        <div className="container">
          {STEPS.map((step, i) => (
            <div key={step.n} className={`hiw__step ${i % 2 === 1 ? 'reverse' : ''}`}>
              <div className="hiw__step-photo">
                <div className="step-num-overlay">{step.n}</div>
                <img
                  src={step.photo}
                  alt={step.title}
                  onError={(e) => { e.target.parentElement.querySelector('.step-photo-placeholder').style.display = 'none'; }}
                />
                <div className="step-photo-placeholder">
                  <span>{step.icon}</span>
                  <small>Фото: {step.photo}</small>
                </div>
              </div>

              <div className="hiw__step-content">
                <div className="step-label">
                  <span className="step-number">{step.n}</span>
                  <span className="step-icon-lg">{step.icon}</span>
                </div>
                <h2>{step.title}</h2>
                <p className="step-desc">{step.desc}</p>
                <ul className="step-tips">
                  {step.tips.map((tip) => (
                    <li key={tip}><span>✓</span> {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section className="hiw__safety">
        <div className="container">
          <h2 className="text-center">Твоя безпека — наш пріоритет</h2>
          <p className="section-sub text-center">Ми дбаємо про кожного користувача платформи</p>
          <div className="safety-grid">
            {SAFETY_TIPS.map((s) => (
              <div key={s.title} className="safety-card">
                <span className="safety-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hiw__cta text-center">
        <div className="container">
          <h2>Готовий знайти свій дім?</h2>
          <p>Тисячі людей вже знайшли ідеального сусіда через СусідUA</p>
          <div className="flex-center gap-2 mt-2">
            <Link to="/ads" className="btn btn-primary">🔍 Знайти кімнату</Link>
            <Link to="/ads/new" className="btn btn-outline">Здати кімнату</Link>
          </div>
        </div>
      </section>
    </main>
  );
}