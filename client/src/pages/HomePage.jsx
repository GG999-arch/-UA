import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdCard from '../components/AdCard';
import { adsAPI } from '../utils/api';
import './HomePage.css';

// Placeholder image paths — replace with real assets
const HERO_IMAGES = [
  '/assets/hero-1.jpg',
  '/assets/hero-2.jpg',
  '/assets/hero-3.jpg',
  '/assets/hero-4.jpg',
];

const STATS = [
  { value: '2 400+', label: 'Активних оголошень' },
  { value: '8 700+', label: 'Зареєстрованих' },
  { value: '96%',    label: 'Задоволені пошуком' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('room'); // 'room' | 'seeking'
  const [search, setSearch] = useState({ city: '', budget: '', type: 'room' });

 const MOCK_ADS = [
  { _id: '1', title: 'Затишна кімната в центрі', price: 5500, city: 'Київ', district: 'Шевченківський', type: 'room', photos: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'], author: { name: 'Аня', isVerified: true }, amenities: { wifi: true, kitchen: true } },
  { _id: '2', title: 'Простора квартира біля метро', price: 9200, city: 'Київ', district: 'Оболонь', type: 'apartment', photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'], author: { name: 'Олег' }, amenities: { wifi: true, parking: true } },
  { _id: '3', title: 'Кімната у Львові', price: 4500, city: 'Львів', district: 'Франківський', type: 'room', photos: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400'], author: { name: 'Марія', isVerified: true }, amenities: { wifi: true } },
  { _id: '4', title: 'Студія в новобудові', price: 7800, city: 'Одеса', district: 'Приморський', type: 'studio', photos: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400'], author: { name: 'Дмитро' }, amenities: { wifi: true, gym: true } },
  { _id: '5', title: 'Кімната для студентки', price: 3800, city: 'Харків', district: 'Київський', type: 'room', photos: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400'], author: { name: 'Соня', isVerified: true }, amenities: { kitchen: true } },
  { _id: '6', title: 'Двокімнатна квартира', price: 11000, city: 'Дніпро', district: 'Центральний', type: 'apartment', photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'], author: { name: 'Іван' }, amenities: { wifi: true, parking: true, tv: true } },
];

useEffect(() => {
  const filtered = tab === 'room'
    ? MOCK_ADS.filter(a => a.type !== 'seeking')
    : MOCK_ADS.filter(a => a.type === 'seeking');
  setAds(filtered);
  setLoading(false);
}, [tab]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.city) params.set('city', search.city);
    if (search.budget) params.set('maxPrice', search.budget);
    if (search.type) params.set('type', search.type);
    navigate(`/ads?${params.toString()}`);
  };

  return (
    <main className="home">
      {/* ── Hero ── */}
      <section className="hero">
  <div className="hero__banner-wrap">
    <img src="/mainbanner.jpg" alt="banner" className="hero__banner-img" />
    <div className="hero__banner-overlay">
      <div className="container">
        <span className="hero__badge">🇺🇦 Платформа №1 для спільного проживання</span>
        <h1 className="hero__title">
          Знайди <em>кімнату</em><br />або ідеального<br />
          <span className="hero__accent">сусіда</span>
        </h1>
        <p className="hero__desc">
          СусідUA — сервіс, де люди знаходять спільне житло, публікують оголошення
          та знайомляться з майбутніми сусідами. Зручно, безпечно, по-людськи.
        </p>
        <div className="hero__cta">
          <Link to="/ads" className="btn btn-primary">🔍 Знайти житло</Link>
          <Link to="/ads/new" className="btn btn-outline">Додати оголошення</Link>
        </div>
        <div className="hero__stats">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ── Search / Listings ── */}
      <section className="listings section">
        <div className="container">
          <h2 className="section-title">Знайди житло або сусіда</h2>
          <p className="section-sub">Оголошення з усіх куточків України. Фільтруй за містом, ціною та зручностями.</p>

          <form className="search-bar" onSubmit={handleSearch}>
            <input
              className="form-input search-input"
              placeholder="📍 Місто або район"
              value={search.city}
              onChange={(e) => setSearch({ ...search, city: e.target.value })}
            />
            <select
              className="form-input"
              value={search.budget}
              onChange={(e) => setSearch({ ...search, budget: e.target.value })}
            >
              <option value="">🔥 Будь-який бюджет</option>
              <option value="5000">до 5 000 грн</option>
              <option value="8000">до 8 000 грн</option>
              <option value="12000">до 12 000 грн</option>
            </select>
            <select
              className="form-input"
              value={search.type}
              onChange={(e) => setSearch({ ...search, type: e.target.value })}
            >
              <option value="">🏠 Тип житла</option>
              <option value="room">Кімната</option>
              <option value="apartment">Квартира</option>
              <option value="studio">Студія</option>
            </select>
            <button type="submit" className="btn btn-primary">Знайти →</button>
          </form>

          <div className="listings__tabs">
            <button
              className={`tab-btn ${tab === 'room' ? 'active' : ''}`}
              onClick={() => setTab('room')}
            >🏠 Житло (15)</button>
            <button
              className={`tab-btn ${tab === 'seeking' ? 'active' : ''}`}
              onClick={() => setTab('seeking')}
            >🔍 Шукають сусіда (12)</button>
          </div>

          {loading ? (
            <div className="listings__grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card skeleton-card">
                  <div className="skeleton" style={{ height: 200 }} />
                  <div style={{ padding: 16 }}>
                    <div className="skeleton" style={{ height: 20, marginBottom: 8 }} />
                    <div className="skeleton" style={{ height: 14, width: '60%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="listings__grid">
              {ads.map((ad) => <AdCard key={ad._id} ad={ad} />)}
            </div>
          )}

          <div className="text-center mt-3">
            <Link to="/ads" className="btn btn-outline">Завантажити більше →</Link>
          </div>
        </div>
      </section>

      {/* ── How it works teaser ── */}
      <section className="how-teaser">
        <div className="container">
          <h2 className="section-title text-center">Як це працює?</h2>
          <p className="section-sub text-center">Чотири кроки до нового дому або сусіда</p>
          <div className="steps-grid">
            {[
              { n: '01', icon: '🔍', title: 'Шукай оголошення', desc: 'Фільтруй за містом, ціною та зручностями. Більше 2600 оголошень по всій Україні.' },
              { n: '02', icon: '👤', title: 'Вивчи профіль', desc: 'Читай про звички, розклад та вимоги потенційного сусіда перед тим, як писати.' },
              { n: '03', icon: '💬', title: 'Напиши в чат', desc: 'Безпечний вбудований чат для спілкування. Без зайвих контактів до моменту довіри.' },
              { n: '04', icon: '🏡', title: 'Домовляйся та вселяйся', desc: 'Обговорюй умови, домовтесь про зустріч і підписуйте договір. Ласкаво просимо додому!' },
            ].map((s) => (
              <div key={s.n} className="step-card">
                <span className="step-num">{s.n}</span>
                <span className="step-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <Link to="/how-it-works" className="btn btn-outline">Детальніше →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}