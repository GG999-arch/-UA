import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adsAPI } from '../utils/api';
import './CreateAdPage.css';

const AMENITIES = [
  { key: 'wifi', label: 'Wi-Fi', icon: '📶' },
  { key: 'kitchen', label: 'Кухня', icon: '🍳' },
  { key: 'bathroom', label: 'Ванна', icon: '🚿' },
  { key: 'parking', label: 'Парковка', icon: '🅿️' },
  { key: 'gym', label: 'Спортзал', icon: '🏋️' },
  { key: 'pets', label: 'Тварини ок', icon: '🐾' },
  { key: 'tv', label: 'ТВ', icon: '📺' },
  { key: 'cleaning', label: 'Прибирання', icon: '🧹' },
];

export default function CreateAdPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState('rent'); // 'rent' | 'seek'
  const [form, setForm] = useState({
    title: '', city: '', district: '', price: '',
    type: 'room', description: '',
  });
  const [amenities, setAmenities] = useState({});
  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    navigate('/login');
    return null;
  }

  const toggleAmenity = (key) =>
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.city || !form.price) {
      setError('Заповніть усі обов\'язкові поля');
      return;
    }
    setSubmitting(true);
    setError('');

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append('type', mode === 'seek' ? 'seeking' : form.type);
    fd.append('amenities', JSON.stringify(amenities));
    photos.forEach((p) => fd.append('photos', p));

    try {
      const { data } = await adsAPI.create(fd);
      navigate(`/ads/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Помилка публікації');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="create-page section">
      <div className="container">
        <h1 className="section-title">Опублікувати оголошення</h1>
        <p className="section-sub">Розкажи про квартиру або себе — знайди сусіда за лічені дні</p>

        <div className="create-card card">
          {/* Mode toggle */}
          <div className="mode-toggle">
            <button
              className={`mode-btn ${mode === 'rent' ? 'active' : ''}`}
              onClick={() => setMode('rent')}
            >🏠 Здаю кімнату</button>
            <button
              className={`mode-btn ${mode === 'seek' ? 'active' : ''}`}
              onClick={() => setMode('seek')}
            >🔍 Шукаю кімнату</button>
          </div>

          <form onSubmit={handleSubmit} className="create-form">
            {error && <div className="form-error">{error}</div>}

            <div className="form-group">
              <label className="form-label">Заголовок оголошення *</label>
              <input
                className="form-input"
                placeholder="Напр.: Затишна кімната у 3-кімнатній квартирі, Оболонь"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Місто *</label>
                <input
                  className="form-input"
                  placeholder="Київ"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Район / адреса *</label>
                <input
                  className="form-input"
                  placeholder="Шевченківський р-н, вул. ..."
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Ціна (грн/міс) *</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="7 000"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              {mode === 'rent' && (
                <div className="form-group">
                  <label className="form-label">Тип приміщення</label>
                  <select
                    className="form-input"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="room">Кімната</option>
                    <option value="apartment">Квартира</option>
                    <option value="studio">Студія</option>
                  </select>
                </div>
              )}
            </div>

            {/* Photos */}
            <div className="form-group">
              <label className="form-label">Фотографії</label>
              <label className="photo-upload">
                <input type="file" accept="image/*" multiple onChange={handlePhotos} />
                {previews.length === 0 ? (
                  <div className="photo-placeholder">
                    <span>📷</span>
                    <span>Натисни або перетягни фото</span>
                    <small>PNG, JPG до 10 МБ · Мінімум 3 фото</small>
                  </div>
                ) : (
                  <div className="photo-grid">
                    {previews.map((src, i) => (
                      <img key={i} src={src} alt={`Preview ${i}`} />
                    ))}
                    <div className="photo-add">+ Додати</div>
                  </div>
                )}
              </label>
            </div>

            {/* Amenities */}
            {mode === 'rent' && (
              <div className="form-group">
                <label className="form-label">Зручності</label>
                <div className="amenities-grid">
                  {AMENITIES.map((a) => (
                    <button
                      key={a.key}
                      type="button"
                      className={`amenity-toggle ${amenities[a.key] ? 'active' : ''}`}
                      onClick={() => toggleAmenity(a.key)}
                    >
                      {a.icon} {a.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Опис квартири та вимоги до сусіда</label>
              <textarea
                className="form-input"
                rows={5}
                placeholder="Розкажи про квартиру, сусідів, умови проживання та кого шукаєш..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={submitting}
            >
              {submitting ? '⏳ Публікуємо...' : '✨ Опублікувати оголошення'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}