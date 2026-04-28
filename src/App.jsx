import React, { useState } from 'react';
import KPICards from './components/KPICards';
import { ExpenseDonutChart, MonthlyBarChart, CategoryTrendLineChart, InvestmentPerformanceChart, AssetsAndSavingsChart } from './components/Charts';
import Subscriptions from './components/Subscriptions';
import Transactions from './components/Transactions';
import Budget from './components/Budget';
import SubscriptionDropdown from './components/SubscriptionDropdown';
import AIChat from './components/AIChat';

import { initialSubscriptions, initialTransactions, initialBudgets, investmentData } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [transactions, setTransactions] = useState(initialTransactions);
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [budgets, setBudgets] = useState(initialBudgets);

  const handleAddTransaction = (newTx) => {
    setTransactions(prev => [...prev, newTx]);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="header-title">Personal Finance</h1>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'subscriptions' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscriptions')}
          >
            Subscriptions
          </button>
          <button 
            className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button 
            className={`tab ${activeTab === 'budgets' ? 'active' : ''}`}
            onClick={() => setActiveTab('budgets')}
          >
            Budgets
          </button>
        </div>
      </header>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <KPICards transactions={transactions} subscriptions={subscriptions} />
          
          <div className="charts-grid">
            <InvestmentPerformanceChart data={investmentData} />
            <AssetsAndSavingsChart data={investmentData} />
          </div>

          <SubscriptionDropdown subscriptions={subscriptions} />

          <div className="charts-grid">
            <MonthlyBarChart transactions={transactions} />
            <ExpenseDonutChart transactions={transactions} />
          </div>
          <div className="charts-grid">
            <CategoryTrendLineChart transactions={transactions} />
            <Budget budgets={budgets} transactions={transactions} />
          </div>
        </div>
      )}

      {/* Subscriptions Tab */}
      {activeTab === 'subscriptions' && (
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <Subscriptions subscriptions={subscriptions} />
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <Transactions transactions={transactions} onAddTransaction={handleAddTransaction} />
        </div>
      )}

      {/* Budgets Tab */}
      {activeTab === 'budgets' && (
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <Budget budgets={budgets} transactions={transactions} />
        </div>
      )}

      {/* AI Chat Widget */}
      <AIChat contextData={{ transactions, subscriptions, budgets, investmentData }} />
    </div>
  );
}

export default App;
