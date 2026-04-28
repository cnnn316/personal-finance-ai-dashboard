import React, { useMemo } from 'react';
import { Flame, Calendar, Activity, AlertTriangle } from 'lucide-react';

export default function Subscriptions({ subscriptions }) {
  const threshold = 100; // Monthly threshold
  const currentDate = new Date('2026-04-28');

  const { monthlyTotal, annualTotal } = useMemo(() => {
    return subscriptions.reduce((totals, sub) => {
      if (sub.status !== 'active') return totals;
      
      if (sub.billingCycle === 'monthly') {
        totals.monthlyTotal += sub.amount;
        totals.annualTotal += sub.amount * 12;
      } else {
        totals.monthlyTotal += sub.amount / 12;
        totals.annualTotal += sub.amount;
      }
      return totals;
    }, { monthlyTotal: 0, annualTotal: 0 });
  }, [subscriptions]);

  const isOverThreshold = monthlyTotal > threshold;

  const isUnused = (lastUsedDate) => {
    const diffTime = Math.abs(currentDate - new Date(lastUsedDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 30;
  };

  return (
    <div className="list-container">
      {/* Burn Card */}
      <div className="card" style={{ borderColor: isOverThreshold ? 'var(--accent-danger)' : 'var(--border-subtle)' }}>
        <div className="card-header">
          <span className="card-title" style={{ color: isOverThreshold ? 'var(--accent-danger)' : 'var(--text-secondary)' }}>
            <Flame size={18} /> Subscription Burn Rate
          </span>
          {isOverThreshold && <span className="badge badge-danger">High Spend</span>}
        </div>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
          <div>
            <div className={`kpi-value ${isOverThreshold ? 'amount-negative' : ''}`}>
              ${monthlyTotal.toFixed(2)}
            </div>
            <div className="kpi-subtitle">Per Month</div>
          </div>
          <div>
            <div className={`kpi-value ${isOverThreshold ? 'amount-negative' : ''}`}>
              ${annualTotal.toFixed(2)}
            </div>
            <div className="kpi-subtitle">Per Year</div>
          </div>
        </div>
        {isOverThreshold && (
          <p style={{ marginTop: '1rem', color: 'var(--accent-danger)', fontSize: '0.875rem' }}>
            <AlertTriangle size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
            You are spending more than your monthly target of ${threshold}. Consider reviewing active subscriptions.
          </p>
        )}
      </div>

      {/* Subscription List */}
      <div className="card">
        <div className="card-header">
          <span className="card-title"><Activity size={18} /> All Subscriptions</span>
        </div>
        <div className="list-container" style={{ marginTop: '1rem' }}>
          {subscriptions.map(sub => {
            const unused = isUnused(sub.lastUsed);
            return (
              <div key={sub.id} className="list-item" style={{ opacity: sub.status === 'forgotten' ? 0.6 : 1 }}>
                <div className="item-main">
                  <div className="item-icon" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <Calendar size={20} color="var(--accent-primary)" />
                  </div>
                  <div className="item-details">
                    <h4>{sub.name}</h4>
                    <p>{sub.category} • {sub.billingCycle.charAt(0).toUpperCase() + sub.billingCycle.slice(1)}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div className="item-amount">${sub.amount.toFixed(2)}</div>
                    <div className="kpi-subtitle" style={{ marginTop: 0 }}>
                      Last used: {sub.lastUsed}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end', minWidth: '100px' }}>
                    <span className={`badge badge-${sub.status === 'active' ? 'active' : 'forgotten'}`}>
                      {sub.status.toUpperCase()}
                    </span>
                    {unused && sub.status === 'active' && (
                      <span className="badge badge-danger">Unused 30+ Days</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
