import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { messagesAPI } from '../utils/api';
import './ChatPage.css';

let socket;

export default function ChatPage() {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);

  // Init socket
  useEffect(() => {
    socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');
    socket.emit('join', user._id);

    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    socket.on('onlineUsers', (users) => setOnlineUsers(users));

    return () => socket.disconnect();
  }, [user._id]);

  // Load conversations
  useEffect(() => {
    messagesAPI.getConversations()
      .then(({ data }) => {
        setConversations(data);
        if (userId) {
          const found = data.find((c) => c.partner._id === userId);
          if (found) setActiveConv(found.partner);
        } else if (data.length > 0) {
          setActiveConv(data[0].partner);
        }
      })
      .finally(() => setLoading(false));
  }, [userId]);

  // Load messages for active conversation
  useEffect(() => {
    if (!activeConv) return;
    messagesAPI.getMessages(activeConv._id)
      .then(({ data }) => setMessages(data));
  }, [activeConv]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || !activeConv) return;
    const content = input.trim();
    setInput('');

    try {
      const { data: msg } = await messagesAPI.send({ receiverId: activeConv._id, content });
      setMessages((prev) => [...prev, msg]);
      socket.emit('sendMessage', { receiverId: activeConv._id, message: msg });

      // Update last message in conversations list
      setConversations((prev) =>
        prev.map((c) =>
          c.partner._id === activeConv._id ? { ...c, lastMessage: msg, unread: 0 } : c
        )
      );
    } catch (err) {
      console.error(err);
    }
  }, [input, activeConv]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return 'Щойно';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} хв тому`;
    if (diff < 86400000) return d.toLocaleTimeString('uk', { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString('uk', { day: 'numeric', month: 'short' });
  };

  if (!user) return (
    <div className="chat-auth">
      <p>Увійдіть, щоб переглянути повідомлення</p>
      <button className="btn btn-primary" onClick={() => navigate('/login')}>Увійти</button>
    </div>
  );

  return (
    <div className="chat-page">
      {/* Sidebar */}
      <aside className="chat-sidebar">
        <div className="chat-sidebar__header">
          <h2>Мої чати</h2>
          {conversations.length > 0 && (
            <span className="chat-count">{conversations.length}</span>
          )}
        </div>

        <div className="chat-sidebar__list">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="conv-item skeleton-conv">
                <div className="skeleton" style={{ width: 44, height: 44, borderRadius: '50%' }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ height: 14, width: '70%', marginBottom: 6 }} />
                  <div className="skeleton" style={{ height: 12, width: '90%' }} />
                </div>
              </div>
            ))
          ) : conversations.length === 0 ? (
            <div className="chat-empty-sidebar">
              <span>💬</span>
              <p>Поки немає розмов</p>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/ads')}>
                Знайти оголошення
              </button>
            </div>
          ) : (
            conversations.map(({ partner, lastMessage, unread }) => (
              <button
                key={partner._id}
                className={`conv-item ${activeConv?._id === partner._id ? 'active' : ''}`}
                onClick={() => setActiveConv(partner)}
              >
                <div className="conv-avatar">
                  {partner.avatar
                    ? <img src={partner.avatar} alt={partner.name} />
                    : <span>{partner.name?.[0]}</span>}
                  {onlineUsers.includes(partner._id) && (
                    <span className="online-dot" />
                  )}
                </div>
                <div className="conv-info">
                  <div className="conv-name-row">
                    <span className="conv-name">{partner.name}</span>
                    {lastMessage && (
                      <span className="conv-time">{formatTime(lastMessage.createdAt)}</span>
                    )}
                  </div>
                  <div className="conv-preview">
                    {lastMessage?.content?.slice(0, 48)}
                    {unread > 0 && <span className="unread-badge">{unread}</span>}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* Main chat window */}
      <main className="chat-main">
        {!activeConv ? (
          <div className="chat-empty-main">
            <span>🏡</span>
            <h3>Оберіть розмову</h3>
            <p>Натисніть «Написати в чат» на будь-якому оголошенні, щоб почати</p>
          </div>
        ) : (
          <>
            {/* Chat header */}
            <div className="chat-header">
              <div className="chat-header__user">
                <div className="conv-avatar">
                  {activeConv.avatar
                    ? <img src={activeConv.avatar} alt={activeConv.name} />
                    : <span>{activeConv.name?.[0]}</span>}
                  {onlineUsers.includes(activeConv._id) && <span className="online-dot" />}
                </div>
                <div>
                  <div className="chat-header__name">{activeConv.name}</div>
                  <div className="chat-header__status">
                    {onlineUsers.includes(activeConv._id) ? '🟢 Онлайн' : 'Офлайн'}
                  </div>
                </div>
              </div>
              <div className="chat-header__actions">
                <button className="icon-btn" title="Переглянути профіль"
                  onClick={() => navigate(`/users/${activeConv._id}`)}>👤</button>
                <button className="icon-btn" title="Переглянути оголошення">📋</button>
                <button className="icon-btn">⋯</button>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((msg, i) => {
                const isMine = msg.sender._id === user._id || msg.sender === user._id;
                const showAvatar = i === 0 || messages[i - 1]?.sender?._id !== msg.sender?._id;
                return (
                  <div key={msg._id || i} className={`msg-row ${isMine ? 'mine' : 'theirs'}`}>
                    {!isMine && showAvatar && (
                      <div className="msg-avatar">
                        {activeConv.avatar
                          ? <img src={activeConv.avatar} alt="" />
                          : <span>{activeConv.name?.[0]}</span>}
                      </div>
                    )}
                    {!isMine && !showAvatar && <div className="msg-avatar-spacer" />}
                    <div className="msg-bubble">
                      <span className="msg-text">{msg.content}</span>
                      <span className="msg-time">{formatTime(msg.createdAt)}</span>
                      {isMine && (
                        <span className="msg-status">{msg.read ? '✓✓' : '✓'}</span>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-row">
              <textarea
                className="chat-input"
                placeholder="Написати повідомлення..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <button
                className="send-btn"
                onClick={sendMessage}
                disabled={!input.trim()}
              >▶</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}