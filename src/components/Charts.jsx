import React, { useMemo } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { categoryColors } from '../data/mockData';

// Helper to get CSS variable value
const getCssVar = (name) => {
  if (typeof window === 'undefined') return '#000';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#fff';
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(26, 26, 29, 0.9)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '10px',
        borderRadius: '8px',
        color: '#fff'
      }}>
        <p style={{ margin: 0, fontWeight: 500, marginBottom: '5px' }}>{label || payload[0].name}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ margin: 0, color: entry.color || entry.fill }}>
            {entry.name}: ${entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ExpenseDonutChart({ transactions }) {
  const data = useMemo(() => {
    const currentMonth = '2026-04';
    const expenses = transactions.filter(t => t.type === 'expense' && t.date.startsWith(currentMonth));
    
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    return Object.keys(categoryTotals).map(category => ({
      name: category,
      value: categoryTotals[category],
      color: getCssVar(categoryColors[category].replace('var(', '').replace(')', ''))
    }));
  }, [transactions]);

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Expense Breakdown</span>
      </div>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function MonthlyBarChart({ transactions }) {
  const data = useMemo(() => {
    // Generate last 6 months dynamically based on mock data range
    const months = ['2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04'];
    const monthLabels = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

    return months.map((month, i) => {
      const monthTx = transactions.filter(t => t.date.startsWith(month));
      const income = monthTx.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const expenses = monthTx.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      
      return {
        name: monthLabels[i],
        Income: income,
        Expenses: expenses
      };
    });
  }, [transactions]);

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Income vs Expenses (6 Months)</span>
      </div>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#6b6b76" axisLine={false} tickLine={false} />
            <YAxis stroke="#6b6b76" axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
            <Legend iconType="circle" />
            <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function CategoryTrendLineChart({ transactions }) {
  const data = useMemo(() => {
    const months = ['2026-01', '2026-02', '2026-03', '2026-04'];
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr'];
    
    // Pick top 3 categories to track
    const categories = ['Food', 'Transport', 'Utilities'];

    return months.map((month, i) => {
      const monthTx = transactions.filter(t => t.date.startsWith(month) && t.type === 'expense');
      const entry = { name: monthLabels[i] };
      
      categories.forEach(cat => {
        entry[cat] = monthTx.filter(t => t.category === cat).reduce((sum, t) => sum + t.amount, 0);
      });
      
      return entry;
    });
  }, [transactions]);

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Spending Trends</span>
      </div>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#6b6b76" axisLine={false} tickLine={false} />
            <YAxis stroke="#6b6b76" axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" />
            <Line type="monotone" dataKey="Food" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Transport" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Utilities" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function InvestmentPerformanceChart({ data }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Investment Performance (MoM %)</span>
      </div>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" stroke="#6b6b76" axisLine={false} tickLine={false} />
            <YAxis stroke="#6b6b76" axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="performance" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPerformance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function AssetsAndSavingsChart({ data }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Assets & Total Savings</span>
      </div>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" stroke="#6b6b76" axisLine={false} tickLine={false} />
            <YAxis stroke="#6b6b76" axisLine={false} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" />
            <Area type="monotone" dataKey="totalAssets" name="Total Assets" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAssets)" />
            <Area type="monotone" dataKey="savings" name="Savings" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorSavings)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

