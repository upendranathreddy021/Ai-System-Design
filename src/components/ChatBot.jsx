import React, { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, Send, X } from 'lucide-react';
import { APIS } from '../constant';
import UserService from '../services/UserService';
import './ChatBot.css';

const DEFAULT_GREETING = "Hi, I'm Rena. Ask me anything and I'll do my best to help.";
const DEFAULT_SUGGESTIONS = ["What are Upendra's skills?", 'Tell me about his experience'];
const MAX_INPUT_HEIGHT = 96; // px, about 4 lines

export default function ChatBot({
  botName = 'Rena',
  greeting = DEFAULT_GREETING,
  suggestions = DEFAULT_SUGGESTIONS,
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([{ id: 'greeting', role: 'bot', text: greeting }]);

  const endRef = useRef(null);
  const inputRef = useRef(null);
  const idRef = useRef(0);
  const nextId = () => `m${++idRef.current}`;

  // Keep the newest message in view
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading, open]);

  // Focus the input on desktop only (avoids popping the keyboard on phones)
  useEffect(() => {
    if (open && window.matchMedia('(pointer: fine)').matches) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Escape closes the panel
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const sendMessage = async (text) => {
    const message = text.trim();
    if (!message || loading) return;

    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: message }]);
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    setLoading(true);

    try {
      const res = await UserService.postMethod(APIS.CHATBOT.ASK, { message });
      const reply = res?.reply ?? res?.data?.reply;
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'bot',
          text: reply || "I didn't get an answer back. Please try again.",
          error: !reply,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'bot',
          text: "I couldn't reach the server. Check your connection and try again.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, MAX_INPUT_HEIGHT)}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showSuggestions = messages.length === 1 && suggestions.length > 0;

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Chat with ${botName}`}
          className="neu-primary-btn"
          style={{
            position: 'fixed',
            right: '1rem',
            bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
            width: '3.5rem',
            height: '3.5rem',
            padding: 0,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1030,
          }}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat panel: width/height clamp to the viewport, so it fits phones and desktops without media queries */}
      {open && (
        <section
          role="dialog"
          aria-label={`Chat with ${botName}`}
          className="neu-raised-lg chatbot-panel"
          style={{
            position: 'fixed',
            right: '0.75rem',
            bottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
            width: 'min(calc(100vw - 1.5rem), 24rem)',
            height:
              'min(36rem, calc(100dvh - 1.5rem - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px)))',
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            overflow: 'hidden',
            zIndex: 1060,
          }}
        >
          {/* Header */}
          <header
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              padding: '0.875rem 1rem',
              borderBottom: '1px solid rgba(203, 213, 225, 0.6)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
              <div
                className="neu-button"
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4f46e5',
                  flexShrink: 0,
                }}
              >
                <Bot size={20} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>{botName}</p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.7rem',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                  }}
                >
                  <span
                    style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}
                  />
                  Online
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="neu-button"
              aria-label="Close chat"
              style={{ padding: '0.5rem', color: '#475569', flexShrink: 0 }}
            >
              <X size={18} />
            </button>
          </header>

          {/* Messages */}
          <div
            className="chatbot-scroll"
            role="log"
            aria-live="polite"
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div key={m.id} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
                  <div
                    className={isUser ? undefined : 'neu-inset'}
                    style={{
                      maxWidth: '85%',
                      padding: '0.625rem 0.875rem',
                      borderRadius: isUser ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                      background: isUser ? '#4f46e5' : undefined,
                      color: isUser ? '#ffffff' : m.error ? '#e11d48' : '#1e293b',
                      fontSize: '0.85rem',
                      lineHeight: 1.5,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      textAlign: 'left',
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  className="neu-inset chatbot-dots"
                  aria-label={`${botName} is typing`}
                  style={{ padding: '0.75rem 1rem', borderRadius: '1rem 1rem 1rem 0.25rem' }}
                >
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {/* Starter questions, only before the first message */}
            {showSuggestions && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.25rem' }}>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className="neu-button"
                    style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, color: '#4f46e5' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Composer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '0.5rem',
              padding: '0.75rem',
              borderTop: '1px solid rgba(203, 213, 225, 0.6)',
              flexShrink: 0,
            }}
          >
            <div className="neu-inset" style={{ flex: 1, minWidth: 0, padding: '0.5rem 0.75rem' }}>
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message"
                aria-label="Message"
                className="chatbot-input"
                disabled={loading}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  color: '#1e293b',
                  lineHeight: 1.4,
                  maxHeight: MAX_INPUT_HEIGHT,
                  display: 'block',
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="neu-primary-btn"
              style={{
                width: '2.75rem',
                height: '2.75rem',
                padding: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                opacity: loading || !input.trim() ? 0.55 : 1,
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </section>
      )}
    </>
  );
}