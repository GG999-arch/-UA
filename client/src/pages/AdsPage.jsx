import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdCard from '../components/AdCard';
import './AdsPage.css';

const CITIES = ['Усі міста', 'Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро', 'Запоріжжя', 'Вінниця'];
const TYPES = [
  { value: '', label: 'Всі типи' },
  { value: 'room', label: 'Кімната' },
  { value: 'apartment', label: 'Квартира' },
  { value: 'studio', label: 'Студія' },
];
const BUDGETS = [
  { value: '', label: 'Будь-який бюджет' },
  { value: '4000', label: 'до 4 000 грн' },
  { value: '6000', label: 'до 6 000 грн' },
  { value: '8000', label: 'до 8 000 грн' },
  { value: '12000', label: 'до 12 000 грн' },
];

const MOCK_ADS = [
  { _id: '1',  title: 'Затишна кімната в центрі',           price: 5500,  city: 'Київ',      district: 'Шевченківський',          type: 'room',      photos: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'],      author: { name: 'Аня',     isVerified: true  }, amenities: { wifi: true, kitchen: true } },
  { _id: '2',  title: 'Простора квартира біля метро',       price: 9200,  city: 'Київ',      district: 'Оболонь',                 type: 'apartment', photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'],      author: { name: 'Олег'                    }, amenities: { wifi: true, parking: true } },
  { _id: '3',  title: 'Кімната у Львові',                   price: 4500,  city: 'Львів',     district: 'Франківський',            type: 'room',      photos: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400'],      author: { name: 'Марія',   isVerified: true  }, amenities: { wifi: true } },
  { _id: '4',  title: 'Студія в новобудові',                price: 7800,  city: 'Одеса',     district: 'Приморський',             type: 'studio',    photos: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400'],      author: { name: 'Дмитро'                  }, amenities: { wifi: true, gym: true } },
  { _id: '5',  title: 'Кімната для студентки',              price: 3800,  city: 'Харків',    district: 'Київський',               type: 'room',      photos: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400'],      author: { name: 'Соня',    isVerified: true  }, amenities: { kitchen: true } },
  { _id: '6',  title: 'Двокімнатна квартира',               price: 11000, city: 'Дніпро',    district: 'Центральний',             type: 'apartment', photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'],          author: { name: 'Іван'                    }, amenities: { wifi: true, parking: true, tv: true } },
  { _id: '7', title: 'Кімната з дизайнерським ремонтом', price: 5800, city: 'Київ', district: 'Подільський', type: 'room', photos: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400'], author: { name: 'Катя', isVerified: true }, amenities: { wifi: true, kitchen: true } },
  { _id: '8',  title: 'Мебльована кімната',                 price: 5000,  city: 'Львів',     district: 'Сихів',                   type: 'room',      photos: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400'],      author: { name: 'Тарас'                   }, amenities: { wifi: true, kitchen: true } },
  { _id: '9',  title: 'Світла кімната біля парку',          price: 4200,  city: 'Київ',      district: 'Печерський',              type: 'room',      photos: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'],      author: { name: 'Катя',    isVerified: true  }, amenities: { wifi: true } },
  { _id: '10', title: 'Квартира з терасою',                 price: 13500, city: 'Львів',     district: 'Личаківський',            type: 'apartment', photos: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400'],      author: { name: 'Богдан'                  }, amenities: { wifi: true, parking: true } },
  { _id: '11', title: 'Мінімалістична студія',              price: 6800,  city: 'Київ',      district: 'Подільський',             type: 'studio',    photos: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400'],      author: { name: 'Таня',    isVerified: true  }, amenities: { wifi: true, kitchen: true } },
  { _id: '12', title: 'Кімната в тихому районі',            price: 3500,  city: 'Харків',    district: 'Салтівський',             type: 'room',      photos: ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400'],      author: { name: 'Максим'                  }, amenities: { kitchen: true } },
  { _id: '13', title: 'Простора кімната з балконом',        price: 5000,  city: 'Одеса',     district: 'Центральний',             type: 'room',      photos: ['https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400'],      author: { name: 'Оля',     isVerified: true  }, amenities: { wifi: true, tv: true } },
  { _id: '14', title: 'Квартира біля університету',         price: 8500,  city: 'Львів',     district: 'Галицький',               type: 'apartment', photos: ['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400'],      author: { name: 'Роман'                   }, amenities: { wifi: true } },
  { _id: '15', title: 'Кімната для тихої людини',           price: 4000,  city: 'Вінниця',   district: 'Центр',                   type: 'room',      photos: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'],          author: { name: 'Лєна',    isVerified: true  }, amenities: { kitchen: true, wifi: true } },
  { _id: '16', title: 'Сучасна студія в новому ЖК',         price: 9000,  city: 'Дніпро',    district: 'Амур-Нижньодніпровський', type: 'studio',    photos: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400'],          author: { name: 'Юля'                     }, amenities: { wifi: true, gym: true } },
  { _id: '17', title: 'Велика кімната з меблями',           price: 4800,  city: 'Запоріжжя', district: 'Олександрівський',        type: 'room',      photos: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400'],      author: { name: 'Артем',   isVerified: true  }, amenities: { wifi: true } },
  { _id: '18', title: 'Затишне гніздечко для двох',         price: 7200,  city: 'Київ',      district: 'Голосіївський',           type: 'apartment', photos: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'],      author: { name: 'Надя'                    }, amenities: { wifi: true, kitchen: true, tv: true } },
  { _id: '19', title: 'Кімната з видом на місто',           price: 5200,  city: 'Харків',    district: "Основ'янський",           type: 'room',      photos: ['https://images.unsplash.com/photo-1515263487990-61b07816b324?w=400'],      author: { name: 'Женя',    isVerified: true  }, amenities: { wifi: true } },
  { _id: '20', title: "Простора квартира для сім'ї",        price: 14000, city: 'Київ',      district: 'Дарницький',              type: 'apartment', photos: ['https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400'],      author: { name: 'Сергій'                  }, amenities: { wifi: true, parking: true } },
  { _id: '21', title: 'Мала кімнатка біля метро',           price: 3200,  city: 'Київ',      district: 'Святошинський',           type: 'room',      photos: ['https://images.unsplash.com/photo-1489171078254-c3365d6e359f?w=400'],      author: { name: 'Віка',    isVerified: true  }, amenities: { kitchen: true } },
  { _id: '22', title: 'Стильна квартира-студія',            price: 8200,  city: 'Одеса',     district: 'Приморський',             type: 'studio',    photos: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400'],      author: { name: 'Ніколас'                 }, amenities: { wifi: true, tv: true } },
  { _id: '23', title: "Кімната в студентському р-ні",       price: 3600,  city: 'Львів',     district: 'Сихівський',              type: 'room',      photos: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'],      author: { name: 'Христя',  isVerified: true  }, amenities: { wifi: true } },
  { _id: '24', title: 'Квартира з ремонтом 2024',           price: 12000, city: 'Дніпро',    district: 'Соборний',                type: 'apartment', photos: ['https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400'],      author: { name: 'Кирило'                  }, amenities: { wifi: true, parking: true, gym: true } },
  { _id: '25', title: 'Тиха кімната в приватному будинку',  price: 4100,  city: 'Вінниця',   district: 'Замостянський',           type: 'room',      photos: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400'],      author: { name: 'Оксана',  isVerified: true  }, amenities: { kitchen: true, wifi: true } },
  { _id: '26', title: 'Люкс студія в центрі',               price: 15000, city: 'Київ',      district: 'Печерський',              type: 'studio',    photos: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400'],      author: { name: 'Влад'                    }, amenities: { wifi: true, tv: true, parking: true } },
  { _id: '27', title: 'Кімната поряд із зупинкою',          price: 3900,  city: 'Запоріжжя', district: 'Хортицький',              type: 'room',      photos: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400'],      author: { name: 'Аліна',   isVerified: true  }, amenities: { wifi: true } },
  { _id: '28', title: 'Кімната з ремонтом біля центру',     price: 4600,  city: 'Харків',    district: 'Нагірний',       type: 'room',      photos: ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400'], author: { name: 'Оля',    isVerified: true }, amenities: { wifi: true, kitchen: true } },
  { _id: '29', title: 'Квартира з гарним видом',        price: 16000, city: 'Київ',      district: 'Печерський',     type: 'apartment', photos: ['https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400'], author: { name: 'Денис'                  }, amenities: { wifi: true, parking: true, tv: true } },
  { _id: '30', title: 'Кімната в теплому будинку',          price: 3700,  city: 'Вінниця',   district: 'Вишенька',       type: 'room',      photos: ['https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400'], author: { name: 'Діана',  isVerified: true }, amenities: { kitchen: true } },
  { _id: '31', title: 'Простора студія поряд з метро',      price: 7500,  city: 'Харків',    district: 'Холодна Гора',   type: 'studio',    photos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'], author: { name: 'Тема'                   }, amenities: { wifi: true } },
  { _id: '32', title: 'Двокімнатна з євроремонтом',         price: 13000, city: 'Львів',     district: 'Залізничний',    type: 'apartment', photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400'], author: { name: 'Вова',   isVerified: true }, amenities: { wifi: true, parking: true } },
  { _id: '33', title: 'Кімната для дівчини',                price: 4300,  city: 'Одеса',     district: 'Молдаванка',     type: 'room',      photos: ['https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400'], author: { name: 'Ліза',   isVerified: true }, amenities: { wifi: true, kitchen: true } },
  { _id: '34', title: 'Нова квартира в ЖК бізнес-класу',   price: 18000, city: 'Київ',      district: 'Голосіївський',  type: 'apartment', photos: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'], author: { name: 'Олексій'                }, amenities: { wifi: true, gym: true, parking: true } },
  { _id: '35', title: 'Затишна кімната',         price: 3900,  city: 'Запоріжжя', district: 'Хортицький',     type: 'room',      photos: ['https://images.unsplash.com/photo-1618220179428-22790b461013?w=400'], author: { name: 'Аліна',  isVerified: true }, amenities: { wifi: true } },
];

export default function AdsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    type: searchParams.get('type') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });

  const filtered = MOCK_ADS.filter((ad) => {
    if (filters.city && ad.city !== filters.city) return false;
    if (filters.type && ad.type !== filters.type) return false;
    if (filters.maxPrice && ad.price > parseInt(filters.maxPrice)) return false;
    return true;
  });

  const setFilter = (key, val) => {
    const next = { ...filters, [key]: val };
    setFilters(next);
    const sp = new URLSearchParams();
    if (next.city) sp.set('city', next.city);
    if (next.type) sp.set('type', next.type);
    if (next.maxPrice) sp.set('maxPrice', next.maxPrice);
    setSearchParams(sp);
  };

  return (
    <main className="ads-page">
      <div className="container">
        <div className="ads-page__header">
          <div>
            <h1>Оголошення</h1>
            <p className="text-muted">Знайдено <strong>{filtered.length}</strong> оголошень по всій Україні</p>
          </div>
        </div>

        <div className="ads-layout">
          <aside className="ads-filters">
            <h3>Фільтри</h3>
            <div className="filter-group">
              <label className="filter-label">Місто</label>
              {CITIES.map((c) => (
                <button
                  key={c}
                  className={`filter-chip ${filters.city === (c === 'Усі міста' ? '' : c) ? 'active' : ''}`}
                  onClick={() => setFilter('city', c === 'Усі міста' ? '' : c)}
                >{c}</button>
              ))}
            </div>
            <div className="filter-group">
              <label className="filter-label">Тип житла</label>
              {TYPES.map((t) => (
                <button
                  key={t.value}
                  className={`filter-chip ${filters.type === t.value ? 'active' : ''}`}
                  onClick={() => setFilter('type', t.value)}
                >{t.label}</button>
              ))}
            </div>
            <div className="filter-group">
              <label className="filter-label">Бюджет</label>
              {BUDGETS.map((b) => (
                <button
                  key={b.value}
                  className={`filter-chip ${filters.maxPrice === b.value ? 'active' : ''}`}
                  onClick={() => setFilter('maxPrice', b.value)}
                >{b.label}</button>
              ))}
            </div>
            <button
              className="btn btn-outline btn-sm"
              style={{ width: '100%', marginTop: 8 }}
              onClick={() => setFilters({ city: '', type: '', maxPrice: '' })}
            >Скинути фільтри</button>
          </aside>

          <div className="ads-content">
            {filtered.length === 0 ? (
              <div className="ads-empty">
                <span>🔍</span>
                <h3>Нічого не знайдено</h3>
                <p>Спробуйте змінити фільтри або місто пошуку</p>
              </div>
            ) : (
              <div className="ads-grid">
                {filtered.map((ad) => <AdCard key={ad._id} ad={ad} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}