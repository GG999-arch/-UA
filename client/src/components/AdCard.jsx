import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adsAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './AdCard.css';

const AMENITY_ICONS = {
  wifi: '📶', kitchen: '🍳', bathroom: '🚿',
  parking: '🅿️', gym: '🏋️', pets: '🐾', tv: '📺', cleaning: '🧹',
};

export default function AdCard({ ad, onSaveToggle }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [saved, setSaved] = useState(ad.savedBy?.includes(user?._id));
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const { data } = await adsAPI.save(ad._id);
      setSaved(data.saved);
      onSaveToggle?.(ad._id, data.saved);
    } finally {
      setSaving(false);
    }
  };

  const photo = ad.photos?.[0] || '/placeholder-room.jpg';
  const amenityKeys = Object.entries(ad.amenities || {})
    .filter(([, v]) => v).slice(0, 3).map(([k]) => k);

  return (
    <Link to={`/ads/${ad._id}`} className="ad-card card">
      <div className="ad-card__image-wrap">
        <img src={photo} alt={ad.title} className="ad-card__image" />
        <div className="ad-card__badges">
          {ad.isFeatured && <span className="badge badge-orange">Топ</span>}
          {ad.isUrgent && <span className="badge badge-danger">Терміново</span>}
          {ad.createdAt && new Date() - new Date(ad.createdAt) < 48 * 3600 * 1000 && (
            <span className="badge badge-green">Нове</span>
          )}
        </div>
        <button
          className={`ad-card__save ${saved ? 'saved' : ''}`}
          onClick={handleSave}
          disabled={saving}
          title="Зберегти"
        >
          {saved ? '♥' : '♡'}
        </button>
      </div>

      <div className="ad-card__body">
        <div className="ad-card__price">
          <span className="price-amount">{ad.price?.toLocaleString()}</span>
          <span className="price-currency"> грн / міс</span>
        </div>

        <h3 className="ad-card__title">{ad.title}</h3>

        <p className="ad-card__location">
          📍 {ad.district ? `${ad.district}, ` : ''}{ad.city}
        </p>

        {amenityKeys.length > 0 && (
          <div className="ad-card__amenities">
            {amenityKeys.map((k) => (
              <span key={k} className="amenity-tag">
                {AMENITY_ICONS[k]} {k === 'wifi' ? 'Wi-Fi' : k.charAt(0).toUpperCase() + k.slice(1)}
              </span>
            ))}
          </div>
        )}

        <div className="ad-card__footer">
          <div className="ad-card__author">
            <div className="author-avatar">
              {ad.author?.avatar
                ? <img src={ad.author.avatar} alt={ad.author.name} />
                : <span>{ad.author?.name?.[0]}</span>}
            </div>
            <span>{ad.author?.name}</span>
            {ad.author?.isVerified && <span title="Перевірено">✅</span>}
          </div>
          <button className="btn btn-primary btn-xs" onClick={(e) => { e.preventDefault(); navigate('/messages'); }}>
          💬 Написати
        </button>
        </div>
      </div>
    </Link>
  );
}