import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">🏡 <strong>СусідUA</strong></div>
          <p>Платформа для пошуку спільного житла та надійних сусідів. Більше 2400 оголошень по всій Україні.</p>
        </div>

        <div className="footer__col">
          <h4>ПЛАТФОРМА</h4>
          <Link to="/ads">Пошук житла</Link>
          <Link to="/roommates">Пошук сусіда</Link>
          <Link to="/ads/new">Додати оголошення</Link>
          <Link to="/messages">Повідомлення</Link>
        </div>

        <div className="footer__col">
          <h4>ПІДТРИМКА</h4>
          <Link to="/how-it-works">Як це працює</Link>
          <Link to="/safety">Безпека</Link>
          <Link to="/tips">Поради</Link>
          <Link to="/contact">Зв'язатись з нами</Link>
        </div>

        <div className="footer__col">
          <h4>ПРАВОВЕ</h4>
          <Link to="/terms">Умови використання</Link>
          <Link to="/privacy">Конфіденційність</Link>
          <Link to="/cookies">Cookie</Link>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <span>© 2026 СусідUA. Всі права захищені.</span>
          <span>Зроблено з ❤️ в Україні 🇺🇦</span>
        </div>
      </div>
    </footer>
  );
}