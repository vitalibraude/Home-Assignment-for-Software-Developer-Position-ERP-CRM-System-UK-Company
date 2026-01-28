
import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, Users, Package, ShoppingBag, Sparkles } from 'lucide-react';
import { MOCK_ORDERS, MOCK_PRODUCTS, MOCK_CUSTOMERS } from '../constants';
import { getBusinessInsights } from '../services/geminiService';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        {trend && (
          <p className={`text-xs mt-2 font-medium ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend > 0 ? '+' : ''}{trend}% מהחודש שעבר
          </p>
        )}
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const dataContext = {
        customersCount: MOCK_CUSTOMERS.length,
        productsCount: MOCK_PRODUCTS.length,
        ordersCount: MOCK_ORDERS.length,
        inventory: MOCK_PRODUCTS.map(p => ({ name: p.name, stock: p.stock, min: p.minStock })),
        revenue: MOCK_ORDERS.reduce((acc, o) => acc + o.total, 0)
      };
      const res = await getBusinessInsights(dataContext);
      setInsights(res || "לא התקבלו תובנות.");
      setLoadingInsights(false);
    };

    fetchInsights();
  }, []);

  const chartData = [
    { name: 'ינו', sales: 4000 },
    { name: 'פבר', sales: 3000 },
    { name: 'מרץ', sales: 5000 },
    { name: 'אפר', sales: 2780 },
    { name: 'מאי', sales: 1890 },
    { name: 'יוני', sales: 2390 },
  ];

  const pieData = [
    { name: 'אלקטרוניקה', value: 400 },
    { name: 'ריהוט', value: 300 },
    { name: 'ציוד היקפי', value: 300 },
    { name: 'אחר', value: 200 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">לוח בקרה ראשי</h2>
          <p className="text-slate-500">סקירה כללית של ביצועי העסק ונתונים בזמן אמת.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 font-medium">
          היום: {new Date().toLocaleDateString('he-IL')}
        </div>
      </div>

      {/* AI Insights Banner */}
      <div className="bg-gradient-to-l from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
            <Sparkles size={32} className="text-yellow-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              תובנות AI חכמות
              <span className="text-[10px] bg-yellow-400 text-slate-900 px-2 py-0.5 rounded-full uppercase">חדש</span>
            </h3>
            {loadingInsights ? (
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
              </div>
            ) : (
              <p className="text-blue-50 text-sm leading-relaxed whitespace-pre-line">
                {insights}
              </p>
            )}
          </div>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm">
            צפה בדו"ח המלא
          </button>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="הכנסות חודשיות" value="₪18,750" icon={TrendingUp} color="bg-blue-500" trend={12} />
        <StatCard title="הזמנות חדשות" value="24" icon={ShoppingBag} color="bg-emerald-500" trend={-5} />
        <StatCard title="לקוחות פעילים" value="156" icon={Users} color="bg-amber-500" trend={8} />
        <StatCard title="מוצרים בחסר" value="4" icon={Package} color="bg-rose-500" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">מגמת מכירות שנתית</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">התפלגות מלאי</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                  <span className="text-xs text-slate-500">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
