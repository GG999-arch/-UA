import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="logo-icon">🏡</span>
          <span className="logo-text"><strong>Сусід</strong> UA</span>
        </Link>

        <div className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          <Link to="/ads" className={`nav-link ${isActive('/ads')}`}>Оголошення</Link>
          <Link to="/roommates" className={`nav-link ${isActive('/roommates')}`}>Сусіди</Link>
          <Link to="/how-it-works" className={`nav-link ${isActive('/how-it-works')}`}>Як це працює</Link>
          <Link to="/ads/new" className={`nav-link ${isActive('/ads/new')}`}>Додати оголошення</Link>
          {user && (
            <Link to="/messages" className={`nav-link ${isActive('/messages')}`}>Повідомлення</Link>
          )}
        </div>

        <div className="navbar__actions">
          {user ? (
            <div className="navbar__user">
              <Link to="/profile" className="navbar__avatar">
                {user.avatar
                  ? <img src={user.avatar} alt={user.name} />
                  : <span>{user.name?.[0]?.toUpperCase()}</span>}
              </Link>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">Вийти</button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">Увійти</Link>
          )}
        </div>

        <button className="navbar__burger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}