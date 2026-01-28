
import { Customer, Product, SaleOrder } from './types';

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'C1', name: 'א.א. שיווק בע"מ', email: 'sales@aa.co.il', phone: '03-1234567', address: 'הברזל 10, תל אביב', balance: 12500, status: 'active' },
  { id: 'C2', name: 'טכנולוגיות העתיד', email: 'info@future-tech.com', phone: '04-9876543', address: 'מת"מ חיפה', balance: -500, status: 'active' },
  { id: 'C3', name: 'בנייה ושיפוצים ירושלים', email: 'build@jerusalem.org', phone: '02-5551212', address: 'יפו 45, ירושלים', balance: 45000, status: 'active' },
  { id: 'C4', name: 'סופרמרקט הפינה', email: 'corner@shop.co.il', phone: '08-4443322', address: 'הבנים 2, אשדוד', balance: 0, status: 'inactive' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'P1', sku: 'LAP-001', name: 'מחשב נייד Pro 15', category: 'אלקטרוניקה', price: 4500, stock: 25, minStock: 5 },
  { id: 'P2', sku: 'MOU-002', name: 'עכבר אלחוטי מעוצב', category: 'ציוד היקפי', price: 150, stock: 120, minStock: 20 },
  { id: 'P3', sku: 'MON-003', name: 'מסך 27" 4K', category: 'אלקטרוניקה', price: 1200, stock: 8, minStock: 10 },
  { id: 'P4', sku: 'KEY-004', name: 'מקלדת מכנית גיימינג', category: 'ציוד היקפי', price: 450, stock: 45, minStock: 15 },
  { id: 'P5', sku: 'CHA-005', name: 'כיסא ארגונומי למשרד', category: 'ריהוט', price: 850, stock: 12, minStock: 5 },
];

export const MOCK_ORDERS: SaleOrder[] = [
  { id: 'SO-1001', customerId: 'C1', date: '2024-05-15', total: 5400, status: 'delivered', items: [] },
  { id: 'SO-1002', customerId: 'C2', date: '2024-05-16', total: 300, status: 'shipped', items: [] },
  { id: 'SO-1003', customerId: 'C3', date: '2024-05-17', total: 12500, status: 'pending', items: [] },
  { id: 'SO-1004', customerId: 'C1', date: '2024-05-18', total: 900, status: 'pending', items: [] },
];
