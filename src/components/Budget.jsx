import React, { useMemo } from 'react';
import { Target, AlertCircle } from 'lucide-react';

export default function Budget({ budgets, transactions }) {
  const currentMonth = '2026-04';

  const budgetPerformance = useMemo(() => {
    const currentMonthExpenses = transactions.filter(
      t => t.type === 'expense' && t.date.startsWith(currentMonth)
    );

    return budgets.map(budget => {
      const spent = currentMonthExpenses
        .filter(t => t.category === budget.category)
        .reduce((sum, t) => sum + t.amount, 0);
      
      const variance = budget.target - spent;
      const percentUsed = Math.min((spent / budget.target) * 100, 100);
      
      return {
        ...budget,
        spent,
        variance,
        percentUsed
      };
    });
  }, [budgets, transactions]);

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title"><Target size={18} /> Budget vs Actual</span>
      </div>
      
      <div className="list-container" style={{ marginTop: '1.5rem' }}>
        {budgetPerformance.map(item => {
          const isOverBudget = item.variance < 0;
          const progressColor = isOverBudget ? 'var(--accent-danger)' : 
                              item.percentUsed > 80 ? 'var(--accent-warning)' : 
                              'var(--accent-success)';

          return (
            <div key={item.id} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 500 }}>{item.category}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  ${item.spent.toFixed(2)} / ${item.target.toFixed(2)}
                </span>
              </div>
              
              {/* Progress Bar Container */}
              <div style={{ 
                height: '8px', 
                background: 'var(--bg-primary)', 
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)'
              }}>
                {/* Progress Fill */}
                <div style={{ 
                  height: '100%', 
                  width: `${item.percentUsed}%`, 
                  background: progressColor,
                  transition: 'width 0.3s ease'
                }} />
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: '0.5rem',
                fontSize: '0.75rem'
              }}>
                <span style={{ color: isOverBudget ? 'var(--accent-danger)' : 'var(--text-tertiary)' }}>
                  {isOverBudget ? (
                    <><AlertCircle size={12} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> Over budget by ${Math.abs(item.variance).toFixed(2)}</>
                  ) : (
                    <>${item.variance.toFixed(2)} remaining</>
                  )}
                </span>
                <span style={{ color: 'var(--text-tertiary)' }}>
                  {item.percentUsed.toFixed(0)}% used
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
