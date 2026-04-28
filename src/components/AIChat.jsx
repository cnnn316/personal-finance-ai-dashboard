import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Key, Loader2 } from 'lucide-react';

export default function AIChat({ contextData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || import.meta.env.VITE_OPENAI_API_KEY || '');
  const [isKeySaved, setIsKeySaved] = useState(!!apiKey);
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: 'Hello! I have access to your dashboard data. Ask me anything about your spending, budgets, or subscriptions.'
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const saveApiKey = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey.trim());
      setIsKeySaved(true);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setIsKeySaved(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const systemPrompt = `You are an expert financial advisor AI integrated into a user's personal finance dashboard. 
You have access to the user's current financial data. Use this data to answer their questions accurately. Be concise and helpful.
Current Financial Data in JSON format:
${JSON.stringify(contextData, null, 2)}`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.href, // Recommended for OpenRouter
          'X-Title': 'Personal Finance Dashboard' // Recommended for OpenRouter
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini', // Update model to an OpenRouter compatible string
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.filter(m => m.role !== 'error').map(m => ({ role: m.role, content: m.content })),
            userMessage
          ],
          temperature: 0.7
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to communicate with OpenRouter API');
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.choices[0].message.content
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'error',
        content: `Error: ${error.message}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          width: '60px', height: '60px', borderRadius: '30px',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          color: 'white', border: 'none', cursor: 'pointer',
          boxShadow: 'var(--shadow-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <MessageSquare size={28} />
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: '2rem', right: '2rem',
      width: '380px', height: '600px', maxHeight: '80vh',
      background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-subtle)',
      display: 'flex', flexDirection: 'column', zIndex: 1000, overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem 1.5rem', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MessageSquare size={20} color="var(--accent-primary)" />
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Finance AI</h3>
        </div>
        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-primary)' }}>
        {!isKeySaved ? (
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <Key size={32} color="var(--accent-warning)" style={{ marginBottom: '1rem' }} />
            <h4 style={{ marginBottom: '0.5rem' }}>OpenRouter API Key Required</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Your key is stored locally in your browser and never sent to our servers.
            </p>
            <form onSubmit={saveApiKey} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input 
                type="password" value={apiKey} onChange={e => setApiKey(e.target.value)}
                placeholder="sk-..." required
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-focus)', background: 'var(--bg-secondary)', color: 'white' }}
              />
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>Save Key</button>
            </form>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%', padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                borderBottomRightRadius: msg.role === 'user' ? '4px' : 'var(--radius-md)',
                borderBottomLeftRadius: msg.role === 'user' ? 'var(--radius-md)' : '4px',
                background: msg.role === 'user' ? 'var(--accent-primary)' : msg.role === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'var(--bg-card)',
                color: msg.role === 'error' ? 'var(--accent-danger)' : 'white',
                border: msg.role === 'user' ? 'none' : `1px solid ${msg.role === 'error' ? 'var(--accent-danger)' : 'var(--border-subtle)'}`,
                fontSize: '0.875rem', lineHeight: 1.5,
                whiteSpace: 'pre-wrap'
              }}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', padding: '0.75rem 1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <Loader2 size={16} className="lucide-spin" style={{ animation: 'spin 1s linear infinite' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Footer */}
      {isKeySaved && (
        <div style={{ padding: '1rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)' }}>
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about your finances..."
              disabled={isLoading}
              style={{
                flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-focus)', background: 'var(--bg-primary)', color: 'white',
                outline: 'none'
              }}
            />
            <button type="submit" disabled={isLoading || !input.trim()} style={{
              padding: '0 1rem', borderRadius: 'var(--radius-sm)', border: 'none',
              background: input.trim() && !isLoading ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              color: input.trim() && !isLoading ? 'white' : 'var(--text-tertiary)',
              cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed', transition: 'background 0.2s'
            }}>
              <Send size={18} />
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <button onClick={clearApiKey} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: '0.75rem', cursor: 'pointer' }}>
              Clear API Key
            </button>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}