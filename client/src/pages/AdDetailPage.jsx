import { useParams, useNavigate } from 'react-router-dom';

const MOCK_ADS = [
  { _id: '1', title: 'Затишна кімната в центрі', price: 5500, city: 'Київ', district: 'Шевченківський', type: 'room', photos: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'], author: { name: 'Аня', isVerified: true, avatar: 'https://i.pravatar.cc/150?img=47' }, amenities: { wifi: true, kitchen: true }, description: 'Простора кімната в тихому районі. Поруч метро, магазини, парк. Шукаю охайного сусіда.' },
  { _id: '2', title: 'Простора квартира біля метро', price: 9200, city: 'Київ', district: 'Оболонь', type: 'apartment', photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'], author: { name: 'Олег', avatar: 'https://i.pravatar.cc/150?img=11' }, amenities: { wifi: true, parking: true }, description: 'Сучасна квартира з ремонтом. Є паркінг, консьєрж.' },
  { _id: '3', title: 'Кімната у Львові', price: 4500, city: 'Львів', district: 'Франківський', type: 'room', photos: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'], author: { name: 'Марія', isVerified: true, avatar: 'https://i.pravatar.cc/150?img=45' }, amenities: { wifi: true }, description: 'Затишна кімната у центрі Львова. Поруч кафе, університет.' },
  { _id: '4', title: 'Студія в новобудові', price: 7800, city: 'Одеса', district: 'Приморський', type: 'studio', photos: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'], author: { name: 'Дмитро', avatar: 'https://i.pravatar.cc/150?img=15' }, amenities: { wifi: true, gym: true }, description: 'Новобудова 2023 року. Є спортзал, охорона.' },
  { _id: '5', title: 'Кімната для студентки', price: 3800, city: 'Харків', district: 'Київський', type: 'room', photos: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800'], author: { name: 'Соня', isVerified: true, avatar: 'https://i.pravatar.cc/150?img=49' }, amenities: { kitchen: true }, description: 'Шукаю дівчину-студентку. Тихо, чисто, добре сусідство.' },
  { _id: '6', title: 'Двокімнатна квартира', price: 11000, city: 'Дніпро', district: 'Центральний', type: 'apartment', photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], author: { name: 'Іван', avatar: 'https://i.pravatar.cc/150?img=18' }, amenities: { wifi: true, parking: true, tv: true }, description: 'Велика квартира для двох. Є все необхідне.' },
  { _id: '7', title: 'Шукаю сусіда у Києві', price: 6000, city: 'Київ', district: 'Подільський', type: 'seeking', photos: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'], author: { name: 'Катя', isVerified: true, avatar: 'https://i.pravatar.cc/150?img=32' }, amenities: { wifi: true, pets: true }, description: 'Шукаю сусіда в свою квартиру. Є кіт, не палю.' },
  { _id: '8', title: 'Мебльована кімната', price: 5000, city: 'Львів', district: 'Сихів', type: 'room', photos: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'], author: { name: 'Тарас', avatar: 'https://i.pravatar.cc/150?img=20' }, amenities: { wifi: true, kitchen: true }, description: 'Повністю мебльована кімната. Все включено в ціну.' },
  { _id: '9',  title: 'Світла кімната біля парку',         price: 4200,  city: 'Київ',      district: 'Печерський',     type: 'room',      photos: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],  author: { name: 'Катя',    isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=32' }, amenities: { wifi: true },                          description: 'Світла кімната з великими вікнами біля Маріїнського парку.' },
{ _id: '10', title: 'Квартира з терасою',                price: 13500, city: 'Львів',     district: 'Личаківський',   type: 'apartment', photos: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'],  author: { name: 'Богдан',                         avatar: 'https://i.pravatar.cc/150?img=12' }, amenities: { wifi: true, parking: true },            description: 'Простора квартира з власною терасою та видом на місто.' },
{ _id: '11', title: 'Мінімалістична студія',             price: 6800,  city: 'Київ',      district: 'Подільський',    type: 'studio',    photos: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800'],  author: { name: 'Таня',    isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=44' }, amenities: { wifi: true, kitchen: true },            description: 'Стильна студія у скандинавському стилі. Все нове.' },
{ _id: '12', title: 'Кімната в тихому районі',           price: 3500,  city: 'Харків',    district: 'Салтівський',    type: 'room',      photos: ['https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800'],  author: { name: 'Максим',                         avatar: 'https://i.pravatar.cc/150?img=14' }, amenities: { kitchen: true },                       description: 'Тиха кімната для одного. Сусіди спокійні, чисто.' },
{ _id: '13', title: 'Простора кімната з балконом',       price: 5000,  city: 'Одеса',     district: 'Центральний',    type: 'room',      photos: ['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800'],  author: { name: 'Оля',     isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=48' }, amenities: { wifi: true, tv: true },                description: 'Велика кімната з балконом, вид на море.' },
{ _id: '14', title: 'Квартира біля університету',        price: 8500,  city: 'Львів',     district: 'Галицький',      type: 'apartment', photos: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800'],      author: { name: 'Роман',                          avatar: 'https://i.pravatar.cc/150?img=17' }, amenities: { wifi: true },                          description: 'Ідеально для студентів. 5 хвилин до ЛНУ.' },
{ _id: '15', title: 'Кімната для тихої людини',          price: 4000,  city: 'Вінниця',   district: 'Центр',          type: 'room',      photos: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'],      author: { name: 'Лєна',    isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=46' }, amenities: { kitchen: true, wifi: true },            description: 'Шукаю некурящого, без тварин. Дуже тихий будинок.' },
{ _id: '16', title: 'Сучасна студія в новому ЖК',        price: 9000,  city: 'Дніпро',    district: 'Амур',           type: 'studio',    photos: ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800'],      author: { name: 'Юля',                            avatar: 'https://i.pravatar.cc/150?img=43' }, amenities: { wifi: true, gym: true },               description: 'Новий ЖК зі спортзалом та дитячим майданчиком.' },
{ _id: '17', title: 'Велика кімната з меблями',          price: 4800,  city: 'Запоріжжя', district: 'Олександрівський',type: 'room',     photos: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'],   author: { name: 'Артем',   isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=13' }, amenities: { wifi: true },                          description: 'Повністю мебльована, є шафа, стіл, ліжко.' },
{ _id: '18', title: 'Затишне гніздечко для двох',        price: 7200,  city: 'Київ',      district: 'Голосіївський',  type: 'apartment', photos: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'],   author: { name: 'Надя',                           avatar: 'https://i.pravatar.cc/150?img=41' }, amenities: { wifi: true, kitchen: true, tv: true }, description: 'Квартира для пари або двох подруг. Затишно і охайно.' },
{ _id: '19', title: 'Кімната з видом на місто',          price: 5200,  city: 'Харків',    district: "Основ'янський",  type: 'room',      photos: ['https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800'],   author: { name: 'Женя',    isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=33' }, amenities: { wifi: true },                          description: 'Висотка, 12 поверх, вид на все місто.' },
{ _id: '20', title: "Простора квартира для сім'ї",       price: 14000, city: 'Київ',      district: 'Дарницький',     type: 'apartment', photos: ['https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800'],   author: { name: 'Сергій',                         avatar: 'https://i.pravatar.cc/150?img=16' }, amenities: { wifi: true, parking: true },            description: 'Три кімнати, великий балкон, паркінг.' },
{ _id: '21', title: 'Мала кімнатка біля метро',          price: 3200,  city: 'Київ',      district: 'Святошинський',  type: 'room',      photos: ['https://images.unsplash.com/photo-1489171078254-c3365d6e359f?w=800'],   author: { name: 'Віка',    isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=47' }, amenities: { kitchen: true },                       description: '2 хвилини до метро. Економ варіант.' },
{ _id: '22', title: 'Стильна квартира-студія',           price: 8200,  city: 'Одеса',     district: 'Приморський',    type: 'studio',    photos: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'],   author: { name: 'Ніколас',                        avatar: 'https://i.pravatar.cc/150?img=19' }, amenities: { wifi: true, tv: true },                description: 'Дизайнерська студія в 5 хвилинах від моря.' },
{ _id: '23', title: "Кімната в студентському р-ні",      price: 3600,  city: 'Львів',     district: 'Сихівський',     type: 'room',      photos: ['https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800'],   author: { name: 'Христя',  isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=42' }, amenities: { wifi: true },                          description: 'Бюджетний варіант поруч з університетом.' },
{ _id: '24', title: 'Квартира з ремонтом 2024',          price: 12000, city: 'Дніпро',    district: 'Соборний',       type: 'apartment', photos: ['https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800'],   author: { name: 'Кирило',                         avatar: 'https://i.pravatar.cc/150?img=21' }, amenities: { wifi: true, parking: true, gym: true },description: 'Новий ремонт, техніка, спортзал у будинку.' },
{ _id: '25', title: 'Тиха кімната в приватному будинку', price: 4100,  city: 'Вінниця',   district: 'Замостянський',  type: 'room',      photos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],   author: { name: 'Оксана',  isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=40' }, amenities: { kitchen: true, wifi: true },            description: 'Приватний будинок, своя кімната, спільна кухня.' },
{ _id: '26', title: 'Люкс студія в центрі',              price: 15000, city: 'Київ',      district: 'Печерський',     type: 'studio',    photos: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'],   author: { name: 'Влад',                           avatar: 'https://i.pravatar.cc/150?img=22' }, amenities: { wifi: true, tv: true, parking: true }, description: 'Преміум студія з дизайнерським інтер\'єром.' },
{ _id: '27', title: 'Кімната поряд із зупинкою',         price: 3900,  city: 'Запоріжжя', district: 'Хортицький',     type: 'room',      photos: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800'],   author: { name: 'Аліна',   isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=39' }, amenities: { wifi: true },                          description: 'Зупинка автобуса прямо біля будинку.' },
{ _id: '28', title: 'Кімната з ремонтом біля центру',    price: 4600,  city: 'Харків',    district: 'Нагірний',       type: 'room',      photos: ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800'],      author: { name: 'Оля',     isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=38' }, amenities: { wifi: true, kitchen: true },            description: 'Свіжий ремонт, нові меблі, затишний район.' },
{ _id: '29', title: 'Квартира з панорамним видом',       price: 16000, city: 'Київ',      district: 'Печерський',     type: 'apartment', photos: ['https://images.unsplash.com/photo-1512918728672-1a42936be168?w=800'],   author: { name: 'Денис',                          avatar: 'https://i.pravatar.cc/150?img=23' }, amenities: { wifi: true, parking: true, tv: true }, description: 'Панорамний вид на Дніпро, преміум клас.' },
{ _id: '30', title: 'Кімната в теплому будинку',         price: 3700,  city: 'Вінниця',   district: 'Вишенька',       type: 'room',      photos: ['https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800'],   author: { name: 'Діана',   isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=37' }, amenities: { kitchen: true },                       description: 'Тепло навіть взимку, добрі сусіди.' },
{ _id: '31', title: 'Простора студія поряд з метро',     price: 7500,  city: 'Харків',    district: 'Холодна Гора',   type: 'studio',    photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'],   author: { name: 'Тема',                           avatar: 'https://i.pravatar.cc/150?img=24' }, amenities: { wifi: true },                          description: '3 хвилини до метро, новий будинок.' },
{ _id: '32', title: 'Двокімнатна з євроремонтом',        price: 13000, city: 'Львів',     district: 'Залізничний',    type: 'apartment', photos: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],   author: { name: 'Вова',    isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=25' }, amenities: { wifi: true, parking: true },            description: 'Євроремонт 2023, техніка Bosch, паркінг.' },
{ _id: '33', title: 'Кімната для дівчини',               price: 4300,  city: 'Одеса',     district: 'Молдаванка',     type: 'room',      photos: ['https://images.unsplash.com/photo-1555045576-97da1e2fe611?w=800'],      author: { name: 'Ліза',    isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=36' }, amenities: { wifi: true, kitchen: true },            description: 'Тільки для дівчат. Чисто, затишно, безпечно.' },
{ _id: '34', title: 'Нова квартира в ЖК бізнес-класу',  price: 18000, city: 'Київ',      district: 'Голосіївський',  type: 'apartment', photos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],   author: { name: 'Олексій',                        avatar: 'https://i.pravatar.cc/150?img=26' }, amenities: { wifi: true, gym: true, parking: true },description: 'Бізнес-клас, консьєрж, охорона, спортзал.' },
{ _id: '35', title: 'Затишна кімната біля річки',        price: 3900,  city: 'Запоріжжя', district: 'Хортицький',     type: 'room',      photos: ['https://images.unsplash.com/photo-1618220179428-22790b461013?w=800'],   author: { name: 'Аліна',   isVerified: true,  avatar: 'https://i.pravatar.cc/150?img=35' }, amenities: { wifi: true },                          description: 'Вид на острів Хортиця, тихо і красиво.' },
];

const AMENITY_ICONS = { wifi: '📶 Wi-Fi', kitchen: '🍳 Кухня', bathroom: '🚿 Ванна', parking: '🅿️ Паркінг', gym: '🏋️ Спортзал', pets: '🐾 Тварини', tv: '📺 ТВ', cleaning: '🧹 Прибирання' };

export default function AdDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ad = MOCK_ADS.find((a) => a._id === id);

  if (!ad) return (
    <div style={{ textAlign: 'center', padding: 80 }}>
      <h2>Оголошення не знайдено</h2>
      <button onClick={() => navigate('/ads')} style={{ marginTop: 16, padding: '10px 24px', background: '#2d6a4f', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>← Назад</button>
    </div>
  );

  return (
    <main style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2d6a4f', fontSize: 16, marginBottom: 20 }}>← Назад</button>

      <img src={ad.photos[0]} alt={ad.title} style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 16, marginBottom: 24 }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32 }}>
        <div>
          <h1 style={{ marginBottom: 8 }}>{ad.title}</h1>
          <p style={{ color: '#666', marginBottom: 16 }}>📍 {ad.district}, {ad.city}</p>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#2d6a4f', marginBottom: 24 }}>{ad.price?.toLocaleString()} грн/міс</div>

          <h3>Опис</h3>
          <p style={{ color: '#444', lineHeight: 1.7, marginBottom: 24 }}>{ad.description}</p>

          <h3>Зручності</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {Object.entries(ad.amenities || {}).filter(([, v]) => v).map(([k]) => (
              <span key={k} style={{ background: '#e8f5e9', color: '#2d6a4f', padding: '6px 12px', borderRadius: 20, fontSize: 14 }}>{AMENITY_ICONS[k]}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <img src={ad.author?.avatar} alt={ad.author?.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <div style={{ fontWeight: 600 }}>{ad.author?.name} {ad.author?.isVerified && '✅'}</div>
              <div style={{ color: '#666', fontSize: 14 }}>Власник</div>
            </div>
          </div>
          <button onClick={() => navigate('/messages')} style={{ width: '100%', background: '#2d6a4f', color: '#fff', border: 'none', borderRadius: 8, padding: '14px', fontSize: 16, cursor: 'pointer' }}>
            💬 Написати
          </button>
        </div>
      </div>
    </main>
  );
}