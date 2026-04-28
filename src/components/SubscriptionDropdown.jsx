import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Tv, Music, Dumbbell, Package, Image, AlertCircle } from 'lucide-react';

const iconMap = {
  Tv: <Tv size={20} color="var(--accent-primary)" />,
  Music: <Music size={20} color="var(--accent-success)" />,
  Dumbbell: <Dumbbell size={20} color="var(--accent-warning)" />,
  Package: <Package size={20} color="var(--accent-info)" />,
  Image: <Image size={20} color="var(--accent-secondary)" />
};

export default function SubscriptionDropdown({ subscriptions }) {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate monthly total
  const monthlyTotal = subscriptions.reduce((sum, sub) => {
    if (sub.status !== 'active') return sum;
    return sum + (sub.billingCycle === 'annual' ? sub.amount / 12 : sub.amount);
  }, 0);

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-primary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="card-title" style={{ margin: 0 }}>Active Subscriptions</span>
          <span className="badge badge-active">{subscriptions.filter(s => s.status === 'active').length} Active</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>${monthlyTotal.toFixed(2)}/mo</span>
          {isOpen ? <ChevronUp size={20} color="var(--text-secondary)" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
        </div>
      </button>

      {isOpen && (
        <div style={{ 
          borderTop: '1px solid var(--border-subtle)',
          padding: '0 1.5rem 1.5rem 1.5rem',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div className="list-container" style={{ marginTop: '1rem' }}>
            {subscriptions.filter(s => s.status === 'active').map(sub => (
              <div key={sub.id} className="list-item" style={{ background: 'var(--bg-primary)' }}>
                <div className="item-main">
                  <div className="item-icon" style={{ background: 'var(--bg-secondary)' }}>
                    {iconMap[sub.icon] || <AlertCircle size={20} />}
                  </div>
                  <div className="item-details">
                    <h4 style={{ margin: 0 }}>{sub.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.75rem' }}>Billed {sub.billingCycle}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="item-amount" style={{ color: 'var(--text-primary)' }}>
                    ${sub.amount.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
