import React, { useMemo } from 'react';
import { Wallet, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';

export default function KPICards({ transactions, subscriptions }) {
  const kpis = useMemo(() => {
    // Current month filter (assuming current month is April 2026 based on mock data)
    const currentMonth = '2026-04';
    
    const currentMonthIncome = transactions
      .filter(t => t.type === 'income' && t.date.startsWith(currentMonth))
      .reduce((sum, t) => sum + t.amount, 0);
      
    const currentMonthExpenses = transactions
      .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
      .reduce((sum, t) => sum + t.amount, 0);
      
    const netSavings = currentMonthIncome - currentMonthExpenses;
    
    const monthlySubscriptionSpend = subscriptions
      .filter(s => s.status === 'active')
      .reduce((sum, s) => {
        if (s.billingCycle === 'annual') return sum + s.amount / 12;
        return sum + s.amount;
      }, 0);

    return {
      income: currentMonthIncome,
      expenses: currentMonthExpenses,
      savings: netSavings,
      subscriptions: monthlySubscriptionSpend
    };
  }, [transactions, subscriptions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="kpi-grid">
      <div className="card">
        <div className="card-header">
          <span className="card-title"><Wallet size={18} /> Total Income</span>
        </div>
        <div className="kpi-value amount-positive">{formatCurrency(kpis.income)}</div>
        <div className="kpi-subtitle">This Month</div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <span className="card-title"><TrendingDown size={18} /> Total Expenses</span>
        </div>
        <div className="kpi-value amount-negative">{formatCurrency(kpis.expenses)}</div>
        <div className="kpi-subtitle">This Month</div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <span className="card-title"><TrendingUp size={18} /> Net Savings</span>
        </div>
        <div className="kpi-value">{formatCurrency(kpis.savings)}</div>
        <div className="kpi-subtitle">This Month</div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <span className="card-title"><CreditCard size={18} /> Subs Spend</span>
        </div>
        <div className="kpi-value">{formatCurrency(kpis.subscriptions)}</div>
        <div className="kpi-subtitle">Monthly Equivalent</div>
      </div>
    </div>
  );
}
