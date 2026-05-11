import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../utils/api';
import './ProfilePage.css';

const CITY_OPTIONS = [
  'Київ', 'Львів', 'Харків', 'Одеса', 'Дніпро',
  'Запоріжжя', 'Вінниця', 'Полтава', 'Чернівці', 'Івано-Франківськ',
];

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    bio: '',
    age: '',
    occupation: '',
    city: '',
    preferences: {
      smoking: false,
      pets: false,
      earlyBird: false,
      nightOwl: false,
      workFromHome: false,
    },
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        bio: user.bio || '',
        age: user.age || '',
        occupation: user.occupation || '',
        city: user.city || '',
        preferences: {
          smoking: user.preferences?.smoking || false,
          pets: user.preferences?.pets || false,
          earlyBird: user.preferences?.earlyBird || false,
          nightOwl: user.preferences?.nightOwl || false,
          workFromHome: user.preferences?.workFromHome || false,
        },
      });
      if (user.avatar) setAvatarPreview(user.avatar);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrefToggle = (key) => {
    setForm((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: !prev.preferences[key] },
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('bio', form.bio);
      fd.append('age', form.age);
      fd.append('occupation', form.occupation);
      fd.append('city', form.city);
      fd.append('preferences', JSON.stringify(form.preferences));
      if (avatarFile) fd.append('avatar', avatarFile);

      const { data } = await usersAPI.updateMe(fd);
      setUser(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Помилка збереження');
    } finally {
      setSaving(false);
    }
  };

  const prefLabels = {
    smoking: { label: 'Курю', icon: '🚬' },
    pets: { label: 'Є тварини', icon: '🐾' },
    earlyBird: { label: 'Рання пташка', icon: '🌅' },
    nightOwl: { label: 'Сова', icon: '🦉' },
    workFromHome: { label: 'Працюю вдома', icon: '💻' },
  };

  const initials = user?.name?.[0]?.toUpperCase() || '?';

  return (
    <main className="profile-page">
      <div className="profile-container">

        {/* SIDEBAR */}
        <aside className="profile-sidebar">
          <div className="avatar-section">
            <div
              className="avatar-wrap"
              onClick={() => fileInputRef.current?.click()}
              title="Змінити фото"
            >
              {avatarPreview
                ? <img src={avatarPreview} alt="avatar" className="avatar-img" />
                : <span className="avatar-initials">{initials}</span>}
              <div className="avatar-overlay">
                <span>📷</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
            <p className="avatar-hint">Клікни щоб змінити фото</p>
            <h2 className="sidebar-name">{user?.name}</h2>
            <p className="sidebar-email">{user?.email}</p>
            {user?.isVerified && (
              <span className="verified-badge">✅ Верифікований</span>
            )}
          </div>

          <nav className="profile-nav">
            <button
              className={`profile-nav__item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span>👤</span> Профіль
            </button>
            <button
              className={`profile-nav__item ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <span>🏠</span> Вподобання
            </button>
            <button
              className={`profile-nav__item ${activeTab === 'saved' ? 'active' : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              <span>❤️</span> Збережені
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <section className="profile-content">
          <form onSubmit={handleSubmit}>

            {/* TAB: PROFILE */}
            {activeTab === 'profile' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>Основна інформація</h2>
                  <p>Розкажи про себе — це допоможе знайти ідеального сусіда</p>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Ім'я</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Як тебе звати?"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Вік</label>
                    <input
                      name="age"
                      type="number"
                      min="18"
                      max="100"
                      value={form.age}
                      onChange={handleChange}
                      placeholder="18+"
                    />
                  </div>

                  <div className="form-group">
                    <label>Місто</label>
                    <select name="city" value={form.city} onChange={handleChange}>
                      <option value="">Обери місто</option>
                      {CITY_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Рід діяльності</label>
                    <input
                      name="occupation"
                      value={form.occupation}
                      onChange={handleChange}
                      placeholder="Студентка, дизайнерка, розробник..."
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Про себе</label>
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      placeholder="Розкажи трохи про себе, свій спосіб життя, чого шукаєш..."
                      rows={5}
                      maxLength={500}
                    />
                    <span className="char-count">{form.bio.length}/500</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PREFERENCES */}
            {activeTab === 'preferences' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>Вподобання сусідства</h2>
                  <p>Ці дані допоможуть знайти сумісного сусіда</p>
                </div>

                <div className="prefs-grid">
                  {Object.entries(prefLabels).map(([key, { label, icon }]) => (
                    <button
                      key={key}
                      type="button"
                      className={`pref-card ${form.preferences[key] ? 'active' : ''}`}
                      onClick={() => handlePrefToggle(key)}
                    >
                      <span className="pref-icon">{icon}</span>
                      <span className="pref-label">{label}</span>
                      <span className="pref-check">{form.preferences[key] ? '✓' : ''}</span>
                    </button>
                  ))}
                </div>

                <p className="prefs-hint">
                  💡 Обери все що відповідає твоєму способу життя
                </p>
              </div>
            )}

            {/* TAB: SAVED */}
            {activeTab === 'saved' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>Збережені оголошення</h2>
                  <p>Оголошення які тобі сподобались</p>
                </div>
                <SavedAds />
              </div>
            )}

            {/* SAVE BUTTON */}
            {activeTab !== 'saved' && (
              <div className="form-footer">
                {error && <p className="form-error">❌ {error}</p>}
                {saved && <p className="form-success">✅ Збережено!</p>}
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? 'Зберігаємо...' : 'Зберегти зміни'}
                </button>
              </div>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}

function SavedAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    usersAPI.getSaved()
      .then(({ data }) => setAds(data))
      .catch(() => setAds([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading-text">Завантаження...</p>;
  if (!ads.length) return (
    <div className="empty-saved">
      <span>🏠</span>
      <p>Поки немає збережених оголошень</p>
    </div>
  );

  return (
    <div className="saved-grid">
      {ads.map((ad) => (
        <a key={ad._id} href={`/ads/${ad._id}`} className="saved-card">
          {ad.photos?.[0]
            ? <img src={ad.photos[0]} alt={ad.title} />
            : <div className="saved-card__placeholder">🏠</div>}
          <div className="saved-card__info">
            <p className="saved-card__title">{ad.title}</p>
            <p className="saved-card__price">{ad.price?.toLocaleString()} грн</p>
          </div>
        </a>
      ))}
    </div>
  );
}