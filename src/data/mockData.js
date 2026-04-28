export const initialSubscriptions = [
  { id: '1', name: 'Netflix', amount: 15.99, billingCycle: 'monthly', category: 'Subscriptions', status: 'active', lastUsed: '2026-04-25', icon: 'Tv' },
  { id: '2', name: 'Spotify', amount: 10.99, billingCycle: 'monthly', category: 'Subscriptions', status: 'active', lastUsed: '2026-04-28', icon: 'Music' },
  { id: '3', name: 'Gym Membership', amount: 50.00, billingCycle: 'monthly', category: 'Subscriptions', status: 'forgotten', lastUsed: '2026-03-10', icon: 'Dumbbell' },
  { id: '4', name: 'Amazon Prime', amount: 139.00, billingCycle: 'annual', category: 'Subscriptions', status: 'active', lastUsed: '2026-04-20', icon: 'Package' },
  { id: '5', name: 'Adobe Creative Cloud', amount: 54.99, billingCycle: 'monthly', category: 'Subscriptions', status: 'active', lastUsed: '2026-04-27', icon: 'Image' },
];

export const initialTransactions = [
  // Income
  { id: 't1', type: 'income', source: 'Salary', amount: 5000, date: '2026-04-01', frequency: 'monthly' },
  { id: 't2', type: 'income', source: 'Freelance', amount: 1200, date: '2026-04-15', frequency: 'one-time' },
  { id: 't3', type: 'income', source: 'Salary', amount: 5000, date: '2026-03-01', frequency: 'monthly' },
  { id: 't4', type: 'income', source: 'Salary', amount: 5000, date: '2026-02-01', frequency: 'monthly' },
  
  // Expenses - April
  { id: 't5', type: 'expense', category: 'Food', amount: 450, date: '2026-04-28', notes: 'Groceries' },
  { id: 't6', type: 'expense', category: 'Transport', amount: 120, date: '2026-04-22', notes: 'Gas' },
  { id: 't7', type: 'expense', category: 'Utilities', amount: 200, date: '2026-04-05', notes: 'Electricity & Water' },
  { id: 't8', type: 'expense', category: 'Entertainment', amount: 300, date: '2026-04-10', notes: 'Concert tickets' },
  { id: 't9', type: 'expense', category: 'Shopping', amount: 150, date: '2026-04-18', notes: 'New shoes' },
  { id: 't5_s1', type: 'expense', category: 'Subscriptions', amount: 15.99, date: '2026-04-25', notes: 'Netflix' },
  { id: 't5_s2', type: 'expense', category: 'Subscriptions', amount: 10.99, date: '2026-04-28', notes: 'Spotify' },
  { id: 't5_s3', type: 'expense', category: 'Subscriptions', amount: 50.00, date: '2026-04-10', notes: 'Gym Membership' },
  { id: 't5_s4', type: 'expense', category: 'Subscriptions', amount: 139.00, date: '2026-04-20', notes: 'Amazon Prime' },
  { id: 't5_s5', type: 'expense', category: 'Subscriptions', amount: 54.99, date: '2026-04-27', notes: 'Adobe Creative Cloud' },
  
  // Expenses - March
  { id: 't10', type: 'expense', category: 'Food', amount: 400, date: '2026-03-25', notes: 'Groceries' },
  { id: 't11', type: 'expense', category: 'Transport', amount: 100, date: '2026-03-20', notes: 'Gas' },
  { id: 't12', type: 'expense', category: 'Utilities', amount: 180, date: '2026-03-05', notes: 'Electricity & Water' },
  { id: 't13', type: 'expense', category: 'Entertainment', amount: 150, date: '2026-03-15', notes: 'Movies' },
  { id: 't10_s1', type: 'expense', category: 'Subscriptions', amount: 15.99, date: '2026-03-25', notes: 'Netflix' },
  { id: 't10_s2', type: 'expense', category: 'Subscriptions', amount: 10.99, date: '2026-03-28', notes: 'Spotify' },
  { id: 't10_s3', type: 'expense', category: 'Subscriptions', amount: 50.00, date: '2026-03-10', notes: 'Gym Membership' },
  { id: 't10_s5', type: 'expense', category: 'Subscriptions', amount: 54.99, date: '2026-03-27', notes: 'Adobe Creative Cloud' },
  
  // Expenses - February
  { id: 't14', type: 'expense', category: 'Food', amount: 480, date: '2026-02-28', notes: 'Groceries' },
  { id: 't15', type: 'expense', category: 'Transport', amount: 130, date: '2026-02-22', notes: 'Gas' },
  { id: 't16', type: 'expense', category: 'Utilities', amount: 210, date: '2026-02-05', notes: 'Electricity' },
  { id: 't14_s1', type: 'expense', category: 'Subscriptions', amount: 15.99, date: '2026-02-25', notes: 'Netflix' },
  { id: 't14_s2', type: 'expense', category: 'Subscriptions', amount: 10.99, date: '2026-02-28', notes: 'Spotify' },
  { id: 't14_s3', type: 'expense', category: 'Subscriptions', amount: 50.00, date: '2026-02-10', notes: 'Gym Membership' },
  { id: 't14_s5', type: 'expense', category: 'Subscriptions', amount: 54.99, date: '2026-02-27', notes: 'Adobe Creative Cloud' },
];

export const initialBudgets = [
  { id: 'b1', category: 'Food', target: 500 },
  { id: 'b2', category: 'Transport', target: 150 },
  { id: 'b3', category: 'Utilities', target: 200 },
  { id: 'b4', category: 'Entertainment', target: 200 },
  { id: 'b5', category: 'Shopping', target: 200 },
  { id: 'b6', category: 'Subscriptions', target: 150 },
];

export const categoryColors = {
  Food: 'var(--cat-food)',
  Transport: 'var(--cat-transport)',
  Entertainment: 'var(--cat-entertainment)',
  Utilities: 'var(--cat-utilities)',
  Subscriptions: 'var(--cat-subscriptions)',
  Shopping: 'var(--cat-shopping)',
  Other: 'var(--cat-other)',
};

export const investmentData = [
  { month: 'Oct 2025', performance: 1.2, totalAssets: 12500, savings: 4000 },
  { month: 'Nov 2025', performance: 2.1, totalAssets: 13200, savings: 4500 },
  { month: 'Dec 2025', performance: -0.5, totalAssets: 13000, savings: 4800 },
  { month: 'Jan 2026', performance: 3.4, totalAssets: 14200, savings: 5200 },
  { month: 'Feb 2026', performance: 1.8, totalAssets: 14800, savings: 5600 },
  { month: 'Mar 2026', performance: 2.5, totalAssets: 15600, savings: 6100 },
  { month: 'Apr 2026', performance: 1.5, totalAssets: 16100, savings: 6500 },
];
