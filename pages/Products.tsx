
import React, { useState } from 'react';
import { Package, Search, Plus, Filter, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.includes(searchTerm) || p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">ניהול מלאי ומוצרים</h2>
          <p className="text-slate-500">עריכה, הוספה ומעקב אחר פריטי המלאי של העסק.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
          <Plus size={20} />
          מוצר חדש
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="חיפוש לפי שם מוצר או מק"ט..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <Filter size={16} />
              סינון
            </button>
            <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-colors">
              ייצוא Excel
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                    מוצר <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">מק"ט</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">קטגוריה</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">מחיר (₪)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">מלאי</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">סטטוס</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => {
                const isLowStock = product.stock <= product.minStock;
                return (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                          <Package size={20} />
                        </div>
                        <span className="font-medium text-slate-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-mono">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                      {product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold ${isLowStock ? 'text-red-600' : 'text-slate-900'}`}>
                          {product.stock}
                        </span>
                        <span className="text-[10px] text-slate-400">מינימום: {product.minStock}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        isLowStock 
                          ? 'bg-rose-100 text-rose-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {isLowStock ? 'מלאי נמוך' : 'תקין'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
