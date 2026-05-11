import { useNavigate } from 'react-router-dom';

const ROOMMATES = [
  { id: 1, name: 'Аня', age: 23, city: 'Київ', budget: '6 000', habits: 'Не палю, люблю чистоту', photo: 'https://i.pravatar.cc/150?img=47' },
  { id: 2, name: 'Олег', age: 25, city: 'Львів', budget: '5 500', habits: 'Працюю вдома, тихий', photo: 'https://i.pravatar.cc/150?img=11' },
  { id: 3, name: 'Марія', age: 21, city: 'Харків', budget: '4 500', habits: 'Студентка, вечорами вдома', photo: 'https://i.pravatar.cc/150?img=45' },
  { id: 4, name: 'Дмитро', age: 28, city: 'Одеса', budget: '7 000', habits: 'Спортсмен, рано встаю', photo: 'https://i.pravatar.cc/150?img=15' },
  { id: 5, name: 'Соня', age: 22, city: 'Київ', budget: '6 500', habits: 'Люблю котів, не палю', photo: 'https://i.pravatar.cc/150?img=49' },
  { id: 6, name: 'Іван', age: 26, city: 'Дніпро', budget: '5 000', habits: 'Програміст, нічний режим', photo: 'https://i.pravatar.cc/150?img=18' },
];

export default function RoommatesPage() {
const navigate = useNavigate();
  return (
    <main style={{ padding: '40px 20px', maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>Пошук сусіда 👥</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>Люди які шукають з ким жити разом</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {ROOMMATES.map((r) => (
          <div key={r.id} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}><img src={r.photo} alt={r.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12 }} /></div>
            <h3 style={{ margin: '0 0 4px' }}>{r.name}, {r.age}</h3>
            <p style={{ color: '#666', margin: '0 0 8px' }}>📍 {r.city}</p>
            <p style={{ color: '#2d6a4f', fontWeight: 600, margin: '0 0 12px' }}>💰 до {r.budget} грн/міс</p>
            <p style={{ color: '#444', fontSize: 14, margin: '0 0 16px' }}>{r.habits}</p>
            <button onClick={() => navigate('/messages')} style={{ background: '#2d6a4f', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', width: '100%' }}>
            💬 Написати
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}