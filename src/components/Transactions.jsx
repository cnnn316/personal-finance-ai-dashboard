import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Plus, X } from 'lucide-react';

export default function Transactions({ transactions, onAddTransaction }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: 'Food',
    source: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTx = {
      id: `t${Date.now()}`,
      type: formData.type,
      amount: parseFloat(formData.amount),
      date: formData.date,
      notes: formData.notes
    };
    
    if (formData.type === 'expense') {
      newTx.category = formData.category;
    } else {
      newTx.source = formData.source || 'Other';
      newTx.frequency = 'one-time';
    }

    onAddTransaction(newTx);
    setIsModalOpen(false);
    setFormData({ ...formData, amount: '', notes: '', source: '' });
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Recent Transactions</span>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Add Entry
        </button>
      </div>
      
      <div className="list-container" style={{ marginTop: '1.5rem' }}>
        {sortedTransactions.map(tx => (
          <div key={tx.id} className="list-item">
            <div className="item-main">
              <div className="item-icon" style={{ 
                background: tx.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)' 
              }}>
                {tx.type === 'income' ? (
                  <ArrowUpRight size={20} color="var(--accent-success)" />
                ) : (
                  <ArrowDownRight size={20} color="var(--accent-danger)" />
                )}
              </div>
              <div className="item-details">
                <h4>{tx.type === 'expense' ? tx.category : tx.source}</h4>
                <p>{tx.date} • {tx.notes || (tx.type === 'income' ? tx.frequency : 'Expense')}</p>
              </div>
            </div>
            <div className={`item-amount ${tx.type === 'income' ? 'amount-positive' : 'amount-negative'}`}>
              {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="card-header" style={{ marginBottom: '1.5rem' }}>
              <span className="card-title">Add Transaction</span>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Type</label>
                <select 
                  value={formData.type} 
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Amount</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: e.target.value})}
                  placeholder="0.00"
                />
              </div>

              {formData.type === 'expense' ? (
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Subscriptions">Subscriptions</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              ) : (
                <div className="form-group">
                  <label>Source</label>
                  <input 
                    type="text" 
                    required
                    value={formData.source}
                    onChange={e => setFormData({...formData, source: e.target.value})}
                    placeholder="e.g. Salary, Freelance"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Notes (Optional)</label>
                <input 
                  type="text" 
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  placeholder="Additional details..."
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
